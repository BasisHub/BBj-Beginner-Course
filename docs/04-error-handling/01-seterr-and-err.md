---
sidebar_position: 1
title: "SETERR and Error Trapping"
---

# SETERR and Error Trapping

`SETERR` is BBj's global error trap -- when an error occurs anywhere in the program, execution branches to the specified label. `ERR=` provides statement-level trapping on individual operations. Together they form the foundation of BBj error handling.

## SETERR with Labels

`SETERR` registers a label as the global error handler. When any unhandled error occurs, execution jumps to that label:

```bbj
seterr handler

rem Code that might error
x = num("not a number")
print "This line is never reached"
release

handler:
    print "Error #", err, " - ", errmes(-1)
    release
```

**Output:**
```
Error # 41  -  Invalid assignment
```

Key behavior: **SETERR resets to 0 after branching.** Once the handler runs, the global trap is cleared. If you need ongoing error trapping, re-establish `SETERR` inside the handler before doing any work that might error.

```bbj
seterr handler

rem ... main program logic ...
release

handler:
    seterr handler; rem Re-establish the trap
    print "Error: ", errmes(-1)
    retry
```

## ERR= on Statements

`ERR=` attaches an error handler to a single statement. If that statement errors, execution branches to the specified label (or `*NEXT` to continue on the next line):

```bbj
rem ERR= clause catches errors on specific statements
x = num("not a number", err=*next)
print "Continued after error, x is: ", x

rem ERR= on file open
open(1, err=fileErr)"nonexistent.dat"
print "File opened"
release

fileErr:
    print "Could not open file: ", errmes(-1)
    release
```

**Output:**
```
Continued after error, x is: 0
Could not open file: File does not exist
```

`ERR=` takes precedence over `SETERR` for the statement it is attached to. This lets you handle expected errors locally while keeping a global safety net.

## Inspecting Errors: ERR and ERRMES

After an error occurs, two functions give you information about it:

| Function | Returns | Example |
|----------|---------|---------|
| `err` | Last error number (integer) | `if err = 11 then ...` |
| `errmes(-1)` | Last error message (string) | `print errmes(-1)` |
| `errmes(code)` | Message for a specific error code | `print errmes(17)` |

Error numbers fall into two ranges:

- **0--255**: System errors defined by BBj (file not found, invalid assignment, etc.)
- **256--1024**: Developer-defined errors raised with `THROW`

## Error Trapping Priority

When multiple traps are active, BBj follows a strict priority hierarchy. The highest-priority trap that applies to the current statement wins:

| Priority | Trap | Scope |
|----------|------|-------|
| 1 (highest) | `END=` | End-of-file on the specific statement |
| 2 | `DOM=` | Missing key/record on the specific statement |
| 3 | `ERR=` (function) | Error inside a function call |
| 4 | `ERR=` (statement) | Error on the specific statement |
| 5 (lowest) | `SETERR` | Global fallback for any unhandled error |

This means a statement-level `ERR=` always overrides the global `SETERR`, and specialized traps like `END=` and `DOM=` take priority over the general `ERR=`.

## Common Error Codes

These are the error codes you will encounter most often:

| Code | Name | Typical Cause |
|------|------|---------------|
| 0 | ERR_FPTR | File pointer error |
| 11 | Record not found | Key lookup miss |
| 12 | File not open | Operating on unopened channel |
| 14 | End of file | READ past last record |
| 17 | File does not exist | OPEN on missing file |
| 41 | Invalid assignment | Type mismatch or bad conversion |
| 42 | Structure of statement | Syntax error at runtime |
| 43 | Undefined variable | Use of uninitialized string variable |
| 252 | Java exception | Java method threw an exception |

For the complete list, see the [List of Errors](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Errors/Errors.htm) in the official documentation.

:::tip[Reading Legacy Code]
See [Reading Legacy Code](./legacy-code) for line-number error trapping, `ON ERR GOTO`, and other historical patterns.
:::

:::tip Further Reading
- [SETERR Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/seterr_verb.htm) -- Full reference for SETERR syntax and behavior
- [Error Trapping Rules](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/error_trapping_rules.htm) -- Complete priority hierarchy and edge cases
- [List of Errors](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Errors/Errors.htm) -- All BBj error codes with descriptions
:::
