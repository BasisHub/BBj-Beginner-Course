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
