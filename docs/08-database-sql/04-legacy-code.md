---
sidebar_position: 99
title: "Reading Legacy Code"
description: "Recognize and understand legacy database and SQL patterns in older BBj codebases"
---

# Reading Legacy Code: Database and SQL

You will encounter these patterns in older BBj codebases. Each section shows the legacy approach and its modern equivalent.

### SQL.INI Configuration

You may see this in 3rd Gen (Early BBj) code:

```bbj
rem Legacy: SQL.INI file referenced in startup scripts
rem The SQL.INI file mapped database names to connection parameters:
rem   [ChileCompany]
rem   dictionary=/path/to/chiledd
rem   data=/path/to/data
rem Programs relied on SQL.INI being in the correct location
SQLOPEN(1)"ChileCompany"
```

The modern equivalent:

```bbj
rem Modern: database registered in Enterprise Manager
rem Data Dictionary and connection settings managed via EM GUI
rem No external config file needed -- SQLOPEN works by registered name
SQLOPEN(1)"ChileCompany"
```

The `SQLOPEN` call looks the same, but the configuration behind it changed. `SQL.INI` was a text file that had to be deployed alongside the application and manually maintained. Enterprise Manager now stores these settings centrally and provides a GUI for managing data dictionaries, connection paths, and JDBC driver configurations.

### String-Concatenated SQL

You may see this in 3rd Gen code:

```bbj
rem Legacy: building SQL by concatenating user input
name$ = "Smith"
sql$ = "SELECT * FROM CUSTOMER WHERE LAST_NAME = '" + name$ + "'"
SQLPREP(1)sql$
DIM rec$:SQLTMPL(1)
SQLEXEC(1)
```

The modern equivalent:

```bbj
rem Modern: parameterized query with ? placeholders
SQLPREP(1)"SELECT * FROM CUSTOMER WHERE LAST_NAME = ?"
DIM rec$:SQLTMPL(1)
SQLEXEC(1)"Smith"
```

String concatenation embeds user input directly in the SQL string, creating SQL injection vulnerabilities and quoting issues. Parameterized queries (`?` placeholders) let the database engine handle escaping and also allow query plan reuse. Always use `SQLPREP` with `?` parameters and pass values via `SQLEXEC`.

### MID() Extraction from Result Strings

You may see this in 2nd Gen and 3rd Gen code:

```bbj
rem Legacy: extracting fields by byte position from SQLFETCH result
SQLPREP(1)"SELECT * FROM CUSTOMER"
SQLEXEC(1)
row$ = SQLFETCH(1, END=done)
rem Manual extraction using byte offsets
custNum$ = row$(1, 6)
firstName$ = cvs(row$(7, 20), 3)
lastName$ = cvs(row$(27, 30), 3)
```

The modern equivalent:

```bbj
rem Modern: SQLTMPL + DIM for named field access
SQLPREP(1)"SELECT CUST_NUM, FIRST_NAME, LAST_NAME FROM CUSTOMER"
DIM rec$:SQLTMPL(1)
SQLEXEC(1)
rec$ = SQLFETCH(1, END=done)
print rec.CUST_NUM$
print rec.FIRST_NAME$
print rec.LAST_NAME$
```

Before `SQLTMPL` was widely adopted, programmers extracted fields from raw result strings using byte-position slicing (`MID()` or substring notation). This broke whenever column widths changed or columns were reordered. `SQLTMPL` generates a template matching the query's column layout, and `DIM rec$:SQLTMPL(1)` enables dot-notation access by column name.

### BBjRecordSet Direct Navigation

You may see this in 3rd Gen code:

```bbj
rem Legacy: BBjRecordSet navigation for data access
use com.basiscomponents.db.ResultSet
use BBjRecordSet

rs! = BBjAPI().createRecordSet("ChileCompany", "SELECT * FROM CUSTOMER")
rs!.first()
while !rs!.isAfterLast()
    rec! = rs!.getCurrentRecord()
    print rec!.getFieldAsString("FIRST_NAME")
    rs!.next()
wend
```

The modern equivalent:

```bbj
rem Modern: SQLFETCH loop with END= for end-of-data
SQLOPEN(1)"ChileCompany"
SQLPREP(1)"SELECT FIRST_NAME, LAST_NAME FROM CUSTOMER"
DIM rec$:SQLTMPL(1)
SQLEXEC(1)
WHILE 1
    rec$ = SQLFETCH(1, END=done)
    print rec.FIRST_NAME$, " ", rec.LAST_NAME$
WEND

done:
SQLCLOSE(1)
```

`BBjRecordSet` provides cursor-style navigation (`first()`, `next()`, `previous()`, `isAfterLast()`) that mirrors JDBC's `ResultSet`. It is designed for data-bound GUI controls like `BBjGrid`. For programmatic data access, the `SQLFETCH` loop with `END=` is simpler, more idiomatic, and avoids the overhead of object-wrapper allocation per row.
