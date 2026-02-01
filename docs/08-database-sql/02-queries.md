---
sidebar_position: 2
title: "Queries and Results"
---

# Queries and Results

Once connected, you prepare SQL statements with `SQLPREP`, execute them with `SQLEXEC`, and fetch results with `SQLFETCH`. The key insight is `SQLTMPL` -- it returns a template string that lets you access result columns by name using BBj's dot notation on dimensioned strings.

## The Query Lifecycle

Here is the complete sequence for querying the CUSTOMER table with a parameter:

```bbj
rem Open connection
SQLOPEN(1)"ChileCompany"

rem Prepare a parameterized SELECT
SQLPREP(1)"SELECT CUST_NUM, FIRST_NAME, LAST_NAME, COMPANY FROM CUSTOMER WHERE LAST_NAME LIKE ?"

rem Get result template and dimension record variable
DIM rec$:SQLTMPL(1)

rem Execute with parameter (% is the SQL wildcard)
SQLEXEC(1)"S%"

rem Fetch and display results row by row
WHILE 1
    rec$ = SQLFETCH(1, END=done)
    PRINT rec.CUST_NUM$, " ", rec.FIRST_NAME$, " ", rec.LAST_NAME$
WEND

done:
SQLCLOSE(1)
```

Step by step:

1. **SQLOPEN** -- opens channel 1 to the ChileCompany database
2. **SQLPREP** -- prepares the SQL statement with a `?` placeholder for the parameter
3. **SQLTMPL + DIM** -- gets the result column template and dimensions `rec$` with it, enabling dot-notation field access
4. **SQLEXEC** -- executes the prepared statement, passing `"S%"` as the parameter value
5. **SQLFETCH** -- retrieves one row at a time into `rec$`; when no more rows remain, branches to the `done:` label via `END=`
6. **SQLCLOSE** -- releases the connection

The order matters: `DIM rec$:SQLTMPL(1)` must come **after** `SQLPREP` (which defines the columns) and **before** `SQLFETCH` (which populates the record).

## Field Access with SQLTMPL

`SQLTMPL(chan)` returns a template string describing the result columns. For the query above, it returns something like:

```
CUST_NUM:C(6),FIRST_NAME:C(20),LAST_NAME:C(30),COMPANY:C(30)
```

After `DIM rec$:SQLTMPL(1)`, you access fields using dot notation with a type suffix:

- **Character fields** use the `$` suffix: `rec.FIRST_NAME$`, `rec.CUST_NUM$`
- **Numeric fields** have no suffix: `rec.COST`, `rec.QUANTITY`

The suffix matches the field's type code in the template (`C` for character, `N` for numeric).

:::warning
Forgetting the `$` suffix on character fields is a common mistake. If the template says `FIRST_NAME:C(20)` and you write `rec.FIRST_NAME` (no `$`), you will get a type mismatch error. Always use `rec.FIRST_NAME$` for character fields.
:::

## Parameterized Queries (SQLPREP + SQLEXEC)

`SQLPREP` accepts `?` placeholders in the SQL string. `SQLEXEC` passes values positionally, separated by commas.

**Single parameter:**

```bbj
SQLPREP(1)"SELECT * FROM CUSTOMER WHERE CUST_NUM = ?"
DIM rec$:SQLTMPL(1)
SQLEXEC(1)"000001"
rec$ = SQLFETCH(1, END=notFound)
PRINT rec.FIRST_NAME$, " ", rec.LAST_NAME$

notFound:
```

**Multiple parameters:**

```bbj
SQLPREP(1)"SELECT * FROM CUSTOMER WHERE LAST_NAME LIKE ? AND COMPANY LIKE ?"
DIM rec$:SQLTMPL(1)
SQLEXEC(1)"S%", "A%"
WHILE 1
    rec$ = SQLFETCH(1, END=done)
    PRINT rec.FIRST_NAME$, " ", rec.LAST_NAME$, " - ", rec.COMPANY$
WEND

done:
```

Each `?` maps to the corresponding argument in `SQLEXEC`, left to right. The first `?` gets `"S%"`, the second gets `"A%"`.

## Why Prepared Statements

Prepared statements provide two benefits:

**1. SQL injection prevention.** User input is never concatenated into the SQL string. The database treats parameter values as data, not as SQL syntax.

```bbj
rem BAD -- vulnerable to SQL injection
userInput$ = "'; DROP TABLE CUSTOMER; --"
SQLPREP(1)"SELECT * FROM CUSTOMER WHERE LAST_NAME = '" + userInput$ + "'"

rem GOOD -- parameterized, safe from injection
SQLPREP(1)"SELECT * FROM CUSTOMER WHERE LAST_NAME = ?"
SQLEXEC(1)userInput$
```

**2. Performance.** The database can reuse the query execution plan when only the parameter values change. If you execute the same prepared statement multiple times with different parameters, the database parses and optimizes the query only once.

```bbj
rem Prepare once, execute many times
SQLPREP(1)"SELECT * FROM ITEM WHERE PROD_CAT = ?"
DIM rec$:SQLTMPL(1)

rem First execution
SQLEXEC(1)"FOOD"
WHILE 1
    rec$ = SQLFETCH(1, END=nextCat)
    PRINT rec.DESCRIPTION$
WEND

nextCat:
rem Re-execute with different parameter -- reuses query plan
SQLEXEC(1)"DRINK"
WHILE 1
    rec$ = SQLFETCH(1, END=done)
    PRINT rec.DESCRIPTION$
WEND

done:
```

## INSERT, UPDATE, DELETE

Write operations follow the same `SQLPREP`/`SQLEXEC` pattern but do not return results, so `SQLFETCH` is not needed.

**INSERT:**

```bbj
SQLOPEN(1)"ChileCompany"
SQLPREP(1)"INSERT INTO CUSTOMER (CUST_NUM, FIRST_NAME, LAST_NAME, COMPANY) VALUES (?, ?, ?, ?)"
SQLEXEC(1)"999999", "Test", "User", "Example Corp"
SQLCLOSE(1)
PRINT "Record inserted"
```

**UPDATE:**

```bbj
SQLOPEN(1)"ChileCompany"
SQLPREP(1)"UPDATE CUSTOMER SET COMPANY = ? WHERE CUST_NUM = ?"
SQLEXEC(1)"New Company Name", "999999"
SQLCLOSE(1)
PRINT "Record updated"
```

**DELETE:**

```bbj
SQLOPEN(1)"ChileCompany"
SQLPREP(1)"DELETE FROM CUSTOMER WHERE CUST_NUM = ?"
SQLEXEC(1)"999999"
SQLCLOSE(1)
PRINT "Record deleted"
```

## Handling End of Results

`END=lineref` on `SQLFETCH` handles the normal end-of-results condition. Internally, reaching the end of results generates ERROR 2 (end of file), but `END=` intercepts this cleanly:

```bbj
rem Preferred pattern: END= for end-of-data
WHILE 1
    rec$ = SQLFETCH(1, END=done)
    PRINT rec.FIRST_NAME$
WEND

done:
PRINT "All rows processed"
```

Reserve `ERR=` on `SQLFETCH` for catching actual SQL errors. You can specify both on the same call:

```bbj
rem END= handles normal completion, ERR= handles actual errors
WHILE 1
    rec$ = SQLFETCH(1, END=done, ERR=sqlErr)
    PRINT rec.FIRST_NAME$
WEND

done:
    PRINT "Finished"
    GOTO cleanup

sqlErr:
    PRINT "SQL error during fetch: ", SQLERR(1,ERR=*NEXT)

cleanup:
    SQLCLOSE(1)
```

<details>
<summary>Reading Legacy Code: String-Based SQL Without Templates</summary>

Early BBj code may build SQL strings dynamically using string concatenation rather than `SQLPREP` with parameter placeholders. This approach is vulnerable to SQL injection and harder to maintain:

```bbj
rem Legacy pattern -- avoid in new code
sql$ = "SELECT * FROM CUSTOMER WHERE LAST_NAME = '" + name$ + "'"
SQLPREP(1)sql$
```

You may also encounter result parsing using `MID()` to extract fixed-width fields from `SQLFETCH` results instead of using `SQLTMPL` dot notation. The template-based approach is always preferred in modern BBj code.

</details>

:::tip Further Reading
- [SQLPREP Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/sqlprep_verb.htm) -- Prepare SQL statements with parameter placeholders
- [SQLTMPL Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/sqltmpl_function.htm) -- Result template for typed field access
- [SQLFETCH Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/sqlfetch_function.htm) -- Fetch result rows with END= and ERR= options
- [SQL Command Execution](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/SQL/sql_command_execution.htm) -- Complete reference for SQLEXEC and parameter binding
:::
