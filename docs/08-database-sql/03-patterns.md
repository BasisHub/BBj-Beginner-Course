---
sidebar_position: 3
title: "SQL Patterns and Alternatives"
---

# SQL Patterns and Alternatives

Beyond basic queries, BBj offers alternative SQL access methods and patterns for robust error handling. This section covers practical patterns you will encounter in production code and when to use alternatives to the SQL verb approach.

## Error Handling in SQL Operations

A production-quality SQL block uses `SETERR` to ensure cleanup runs whether the operation succeeds or fails. This is the BBj equivalent of a try/finally pattern:

```bbj
seterr sqlHandler

SQLOPEN(1)"ChileCompany"
SQLPREP(1)"SELECT FIRST_NAME, LAST_NAME FROM CUSTOMER WHERE LAST_NAME LIKE ?"
DIM rec$:SQLTMPL(1)
SQLEXEC(1)"S%"

WHILE 1
    rec$ = SQLFETCH(1, END=fetchDone)
    PRINT rec.FIRST_NAME$, " ", rec.LAST_NAME$
WEND

fetchDone:
    PRINT "Query complete"
    SQLCLOSE(1)
    RELEASE

sqlHandler:
    seterr sqlHandler; rem Re-establish trap for cleanup
    PRINT "SQL error: ", SQLERR(1,ERR=*NEXT)
    SQLCLOSE(1,ERR=*NEXT); rem Close channel, ignore error if not open
    RELEASE
```

Key points:

- `SETERR` provides a safety net for any unexpected SQL error
- `ERR=*NEXT` on `SQLCLOSE` in the handler prevents a secondary error if the channel was never opened
- Re-establish `SETERR` inside the handler before doing any work that might error (since `SETERR` resets after branching)

For more on `SETERR` behavior and error trapping priority, see the [Error Handling](/error-handling) chapter.

## BBjRecordSet

`BBjRecordSet` is an object-oriented wrapper around SQL results with navigation methods (`first()`, `next()`, `previous()`, `last()`). It is primarily designed for **data-bound GUI controls** like `BBjGrid` and `BBjNavigator`, which can bind directly to a recordset for automatic display and navigation.

For programmatic data access -- which is what most code does -- the `SQLFETCH` pattern from the [previous page](./02-queries.md) is simpler and more common. Use `BBjRecordSet` when you are building GUI applications that need data-bound controls, not for general-purpose database queries.

## JDBC Access

`BBjAPI().getJDBCConnection()` (BBj 9.0+) provides a standard Java JDBC `Connection` object. This is useful if you need to use Java JDBC APIs directly, connect to external databases via JDBC drivers, or work with Java libraries that expect a JDBC connection. For most BBj database work, the SQL verb pattern is simpler and idiomatic:

```bbj
rem JDBC access (when you need a standard Java Connection object)
conn! = BBjAPI().getJDBCConnection("ChileCompany")
stmt! = conn!.createStatement()
rs! = stmt!.executeQuery("SELECT FIRST_NAME FROM CUSTOMER")
```

JDBC connections to external databases (MySQL, PostgreSQL, Oracle, etc.) are configured through Enterprise Manager's JDBC driver settings.

## File I/O Bridge

If you have read the [File I/O chapter](/file-io), you know that BBj can access data files directly using `OPEN`, `READ RECORD`, and `WRITE RECORD` with DIM templates for record layout. Legacy BBj programs often access the same data this way rather than through SQL.

The ChileCompany database can be accessed both ways -- the CUSTOMER table is backed by a physical data file that can be opened with either `SQLOPEN` or the file I/O `OPEN` verb. SQL is the recommended approach for new code because it provides:

- Parameterized queries (SQL injection prevention)
- Standard query syntax (WHERE, JOIN, ORDER BY)
- Column-level field access via SQLTMPL (no manual offset math)

:::tip[Reading Legacy Code]
See [Reading Legacy Code](./legacy-code) for legacy database patterns including direct file access and BBjRecordSet navigation.
:::

:::tip Further Reading
- [BBjRecordSet](https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm) -- Search "BBjRecordSet" in the BBj documentation index; RecordSet API for data-bound GUI controls
- [Connecting to a BBj Database](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/SQL/connecting_to_a_bbj_database.htm) -- Connection methods including JDBC
:::
