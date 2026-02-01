---
sidebar_position: 99
title: "Reading Legacy Code"
description: "Recognize and understand legacy error handling patterns in older BBj codebases"
---

# Reading Legacy Code: Error Handling

You will encounter these patterns in older BBj codebases. Each section shows the legacy approach and its modern equivalent.

### Line-Number Error Trapping

You may see this in 1st Gen (BBx) code:

```bbj
rem Legacy: SETERR with line numbers
0010 seterr 9500
0020 x = num("not a number")
0030 print "This line is never reached"
0040 release
9500 rem Error handler
9510 print "Error #", err, " - ", errmes(-1)
9520 release
```

The modern equivalent:

```bbj
rem Modern: SETERR with labels
seterr handler
x = num("not a number")
print "This line is never reached"
release

handler:
    print "Error #", err, " - ", errmes(-1)
    release
```

Line numbers were required in BBx and early PRO/5. Modern BBj uses named labels instead, which are easier to read and do not require renumbering when inserting code.

### ON ERR GOTO / ON ERR GOSUB

You may see this in 1st Gen and 2nd Gen code:

```bbj
rem Legacy: ON ERR GOTO
on err goto 9500
x = num("bad data")
release
9500 print "Error: ", errmes(-1)
9510 release
```

The modern equivalent:

```bbj
rem Modern: SETERR with label
seterr handler
x = num("bad data")
release

handler:
    print "Error: ", errmes(-1)
    release
```

`ON ERR GOTO linenum` is functionally identical to `seterr handler` in modern BBj. You may also encounter `ON ERR GOSUB`, which uses `RETURN` instead of `RETRY` to resume execution after the handler. Both forms still compile and run, but `seterr` with a label is the modern convention.

### !THROWERROR STBL Pattern

You may see this in 3rd Gen (Early BBj) code:

```bbj
rem Legacy: enable error throwing via system table
stbl("!THROWERROR","TRUE")
rem Then use ESCAPE to trigger errors
escape
```

The modern equivalent:

```bbj
rem Modern: THROW verb with message and code
throw "Something went wrong", 300
```

Before the `THROW` verb existed as a language keyword, programs enabled error-throwing behavior by setting a system table variable. The `!ERROR_HANDLER` STBL was another mechanism for registering global handlers by name. Both still work but are superseded by `THROW` and `SETERR` label patterns.

### Error Handling Without THROW

You may see this in 2nd Gen and 3rd Gen code:

```bbj
rem Legacy: escape/release based error recovery
seterr recovery
rem ... risky operation ...
release

recovery:
    print "Operation failed: ", errmes(-1)
    rem No way to raise a custom error
    release
```

The modern equivalent:

```bbj
rem Modern: methods THROW custom errors, callers handle them
class public Validator
    method public void check(BBjString input$)
        if len(input$) = 0 then
            throw "Input cannot be empty", 256
        fi
    methodend
classend

seterr handler
declare Validator v!
v! = new Validator()
v!.check("")
release

handler:
    print "Error #", err, ": ", errmes(-1)
    release
```

Before `THROW`, programs could not raise custom errors. Recovery logic relied on `ESCAPE` and `RELEASE` to signal failure states. Modern BBj uses `THROW` with developer-defined error codes (256--1024), giving callers structured error information they can inspect with `err` and `errmes(-1)`.
