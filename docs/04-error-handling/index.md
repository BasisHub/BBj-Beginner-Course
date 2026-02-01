---
sidebar_position: 1
title: "Error Handling"
---

# Error Handling

BBj uses a **trap-and-branch** model for error handling: you set error traps (`SETERR`, `ERR=`) that redirect execution when errors occur, and raise errors with `THROW`. This pattern is used throughout all BBj code -- understanding it is essential before writing anything non-trivial.

## At a Glance

| Feature | Syntax | Purpose |
|---------|--------|---------|
| SETERR | `seterr label` | Set global error trap |
| ERR= | `open(1,err=handler)"file"` | Statement-level error trap |
| THROW | `throw "message", 256` | Raise custom error |
| ERR | `err` | Last error number |
| ERRMES | `errmes(-1)` | Last error message |
| RETRY | `retry` | Re-execute the statement that errored |
