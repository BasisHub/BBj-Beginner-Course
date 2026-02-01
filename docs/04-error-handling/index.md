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

## For Java, Python, and C# Developers

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Set error handler | `try {` | `try:` | `try {` | `seterr handler` |
| Catch specific error | `catch (IOException e)` | `except IOError as e:` | `catch (IOException e)` | `if err = 17 then ...` |
| Catch all errors | `catch (Exception e)` | `except Exception as e:` | `catch (Exception e)` | `seterr handler` (global) |
| Get error message | `e.getMessage()` | `str(e)` | `e.Message` | `errmes(-1)` |
| Raise/throw | `throw new Exception("msg")` | `raise Exception("msg")` | `throw new Exception("msg")` | `throw "msg", 256` |
| Skip on error | `catch (E e) { }` | `except: pass` | `catch { }` | `err=*next` |
| Cleanup | `finally { }` | `finally:` | `finally { }` | Fall-through to cleanup label |

BBj does not have try/catch blocks. All error handling uses `seterr` to set a handler label, `err=` on individual statements for inline trapping, and `throw` to raise custom errors. For the complete cross-language reference, see [BBj for Java, Python, and C# Developers](/introduction/translation-tables).

:::tip[Complete Runnable Examples]
This chapter's code snippets illustrate individual concepts. For complete, runnable programs you can open directly in the BBj IDE, see the sample files in [`samples/04-error-handling/`](https://github.com/BasisHub/BBj-Beginner-Course/tree/master/samples/04-error-handling):

- `seterr_basic.bbj` -- Basic SETERR error trapping
- `err_clause.bbj` -- ERR= clause on individual statements
- `throw_validation.bbj` -- THROW from a class method
- `java_error_handling.bbj` -- Handling Java exceptions in BBj

See [Running Samples](/samples) for setup instructions.
:::
