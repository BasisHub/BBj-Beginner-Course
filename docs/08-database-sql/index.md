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
