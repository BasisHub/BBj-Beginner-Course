---
sidebar_position: 1
title: "Connecting to Databases"
---

# Connecting to Databases

Every SQL operation in BBj starts with `SQLOPEN`, which opens a channel to a database. BBj databases like ChileCompany are referenced by name. External databases (MySQL, PostgreSQL, etc.) connect through JDBC drivers configured in Enterprise Manager.

## The ChileCompany Sample Database

ChileCompany ships with every BBj installation and requires no setup. It contains sample business data across several tables. The two main tables used in this chapter's examples:

| Table | Key Columns | Description |
|-------|-------------|-------------|
| CUSTOMER | CUST_NUM:C(6), FIRST_NAME:C(20), LAST_NAME:C(30), COMPANY:C(30) | Customer records |
| ITEM | DESCRIPTION, COST, PROD_CAT | Product catalog |

## SQLOPEN

`SQLOPEN` opens a SQL channel to a named database. The channel number is how you reference this connection in all subsequent SQL verbs:

```bbj
SQLOPEN(1)"ChileCompany"
PRINT "Connected to ChileCompany on channel 1"
```

Add `ERR=` to handle connection failures gracefully:

```bbj
SQLOPEN(1,ERR=connErr)"ChileCompany"
PRINT "Connected"
GOTO done

connErr:
    PRINT "Connection failed: ", SQLERR(1,ERR=*NEXT)
    RELEASE

done:
```

SQL channels are separate from file I/O channels -- opening a file on channel 1 and a SQL connection on channel 1 are independent operations. For details on how `ERR=` works, see the [Error Handling](/error-handling) chapter.

## SQLCLOSE

Always close SQL connections when you are finished. SQL channels are a limited resource:

```bbj
SQLCLOSE(1)
```

If you open a connection and forget to close it, the channel remains occupied until the program ends. In long-running programs or loops that open multiple connections, this can exhaust available channels.

## Error Handling with SQLERR

When a SQL operation fails, `SQLERR(chan)` returns the database error text. This is the SQL-level error message (from the database engine), not the BBj error number:

```bbj
SQLOPEN(1,ERR=sqlFailed)"ChileCompany"

rem Try a bad query
SQLPREP(1,ERR=sqlFailed)"SELECT * FROM NONEXISTENT_TABLE"
GOTO done

sqlFailed:
    PRINT "SQL Error: ", SQLERR(1,ERR=*NEXT)
    SQLCLOSE(1,ERR=*NEXT)
    RELEASE

done:
    SQLCLOSE(1)
```

Use `ERR=*NEXT` on the `SQLERR` call itself in case the channel is not valid (for example, if `SQLOPEN` was the statement that failed).

## Data Dictionary

The Data Dictionary maps logical table names to physical file paths. When you write `SQLOPEN(1)"ChileCompany"`, BBj looks up the ChileCompany dictionary to find where the CUSTOMER data file lives on disk. The default dictionary location is `<bbj install dir>/demos/chiledd/data/`.

This is configuration-level knowledge managed through Enterprise Manager -- not something you deal with in daily programming. For new BBj databases, Enterprise Manager creates and manages dictionaries automatically.

:::tip[Reading Legacy Code]
See [Reading Legacy Code](./legacy-code) for legacy database patterns including SQL.INI configuration, string-concatenated SQL, and manual field extraction.
:::

:::tip Further Reading
- [SQLOPEN Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/sqlopen_verb_open_sql_channel_bbj.htm) -- Full reference for SQLOPEN syntax and options
- [SQLERR Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/sqlerr_function.htm) -- SQL error text retrieval
- [Data Dictionary Overview](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/dbms/bbj-only_data_dictionary_overview.htm) -- How BBj maps database names to physical files
:::
