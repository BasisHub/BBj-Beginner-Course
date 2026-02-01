---
sidebar_position: 1
title: "Database and SQL"
---

# Database and SQL

BBj accesses databases through a family of SQL verbs: `SQLOPEN` opens a connection, `SQLPREP` prepares a statement, `SQLEXEC` executes it, and `SQLFETCH` retrieves results row by row. This chapter uses the **ChileCompany** sample database that ships with every BBj installation -- no setup required.

## At a Glance

| Verb/Function | Syntax | Purpose |
|---------------|--------|---------|
| SQLOPEN | `SQLOPEN(chan)"dbname"` | Open database connection |
| SQLPREP | `SQLPREP(chan)"sql$"` | Prepare SQL statement |
| SQLTMPL | `DIM rec$:SQLTMPL(chan)` | Get result template for field access |
| SQLEXEC | `SQLEXEC(chan)args` | Execute prepared statement |
| SQLFETCH | `rec$=SQLFETCH(chan,END=done)` | Fetch next result row |
| SQLCLOSE | `SQLCLOSE(chan)` | Close connection |
| SQLERR | `SQLERR(chan)` | Get last SQL error text |

## For Java, Python, and C# Developers

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Open connection | `DriverManager.getConnection()` | `sqlite3.connect()` | `SqlConnection.Open()` | `SQLOPEN(chan) "DbName"` |
| Prepare query | `conn.prepareStatement(sql)` | `cursor.execute(sql, params)` | `new SqlCommand(sql)` | `SQLPREP(chan) sql$` |
| Execute query | `stmt.executeQuery()` | `cursor.execute(sql)` | `cmd.ExecuteReader()` | `SQLEXEC(chan) args` |
| Fetch row | `rs.next(); rs.getString()` | `cursor.fetchone()` | `reader.Read()` | `rec$ = SQLFETCH(chan, END=done)` |
| Close connection | `conn.close()` | `conn.close()` | `conn.Close()` | `SQLCLOSE(chan)` |
| Get error | `e.getMessage()` | `e.args[0]` | `e.Message` | `SQLERR(chan)` |

BBj SQL uses verbs (`SQLOPEN`, `SQLPREP`, `SQLEXEC`, `SQLFETCH`) rather than objects. Parameters use `?` placeholders and are passed as arguments to `SQLEXEC`. For the complete cross-language reference, see [BBj for Java, Python, and C# Developers](/introduction/translation-tables).
