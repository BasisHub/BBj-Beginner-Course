---
sidebar_position: 2
title: "THROW and Custom Errors"
---

# THROW and Custom Errors

`THROW` lets you raise your own errors with custom messages and codes. Combined with `SETERR` trapping, this gives you structured error propagation through the call stack -- methods can signal failures, and callers can handle them.

## THROW Syntax

```bbj
throw "message", code
```

The error code must be in the **developer range: 256--1024**. Codes 0--255 are reserved for BBj system errors.

```bbj
seterr handler

throw "Something went wrong", 300
release

handler:
    print "Error #", err, ": ", errmes(-1)
    release
```

**Output:**
```
Error # 300 : Something went wrong
```

## THROW from Class Methods

`THROW` is most useful inside class methods for validation and error signaling. When a method throws and has no local `SETERR`, the error propagates up to the caller:

```bbj
class public Validator
    method public void validate(BBjString input$)
        if len(input$) = 0 then
            throw "Input cannot be empty", 256
        fi
        if len(input$) > 100 then
            throw "Input too long (max 100 characters)", 257
        fi
    methodend
classend

seterr handler
declare Validator v!
v! = new Validator()
v!.validate("")
release

handler:
    print "Validation error #", err, ": ", errmes(-1)
    release
```

**Output:**
```
Validation error # 256 : Input cannot be empty
```

This is the standard pattern for defensive programming in BBj: classes validate their inputs with `THROW`, and calling code sets up `SETERR` or `ERR=` to handle failures.

## Custom Error Messages with ERRMES

You can pre-register custom error messages for your error codes using `ERRMES()` as a statement:

```bbj
errmes(256, "Validation: empty input")
errmes(257, "Validation: input too long")

rem Now errmes(256) returns your custom message
print errmes(256)
```

This is useful when you want consistent error messages across your application. Once registered, `errmes(code)` returns your custom message instead of the default.

## RETRY

`RETRY` re-executes the statement that caused the error. This is useful for interactive prompts and transient-failure recovery:

```bbj
seterr askAgain

print "Enter a number:"
input n$
x = num(n$)
print "You entered: ", x
release

askAgain:
    seterr askAgain; rem Re-establish trap (SETERR resets after branching)
    print "That was not a valid number. Please enter a number:"
    retry
```

Key behavior: **RETRY also restores the saved SETERR value** from before the error occurred. However, since `SETERR` resets on branch, re-establishing it explicitly (as shown above) is the safer pattern.

## Error Propagation Through the Call Stack

When `THROW` is called inside a method:

1. BBj checks if the method has its own `SETERR` handler
2. If not, the error propagates to the caller
3. The caller's `SETERR` or `ERR=` handles it
4. If no handler exists anywhere in the call chain, the program terminates with an error

This propagation is automatic -- you do not need to re-throw errors. A `THROW` in a deeply nested method will bubble up through the call stack until it reaches a handler.

```bbj
class public Service
    method public void process()
        declare Validator v!
        v! = new Validator()
        v!.validate(""); rem Throws error 256 -- propagates to caller of process()
    methodend
classend
```

:::tip[Reading Legacy Code]
See [Reading Legacy Code](./legacy-code) for `!THROWERROR` STBL patterns and other pre-`THROW` error handling mechanisms.
:::

:::tip Further Reading
- [Custom Objects Tutorial: Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_10program4.htm) -- THROW patterns in class-based code
- [ERRMES() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/errmes_function.htm) -- Full reference for error message functions
- [STBL Formats](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/stbl_formats_bbj.htm) -- THROWERROR and ERROR_HANDLER system table entries
:::
