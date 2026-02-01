---
sidebar_position: 3
title: "Common Error Handling Patterns"
---

# Common Error Handling Patterns

These are the patterns you will use daily: skipping expected errors, handling Java exceptions, structuring cleanup code, and choosing the right trap for the situation.

## ERR=*NEXT: Skip on Error

`ERR=*NEXT` tells BBj to silently continue to the next statement if an error occurs. Use it when the error is expected and you have a sensible default:

```bbj
rem Parse user input -- default to 0 if not a number
x = num(input$, err=*next)
print "Value: ", x
```

This is the most common single-statement error pattern in BBj code. The variable retains its previous value (or 0 if uninitialized) when the error is skipped.

:::warning
Do not use `ERR=*NEXT` as a blanket error suppressor. It is appropriate for statements where you expect and accept failure. On statements where errors indicate real problems (file operations, database writes), use a labeled handler instead.
:::

## Handling Java Exceptions (Error 252)

When a Java method throws an exception, BBj traps it as **error 252**. You handle it with `ERR=` or `SETERR` and then inspect the Java exception object:

```bbj
use java.util.HashMap

seterr javaErr

map! = new HashMap()
value! = map!.get("missing_key")

rem If the key exists, value! is set
print "Got value: ", value!
release

javaErr:
    print "Java error: ", errmes(-1)
    lastEx! = BBjAPI().getLastJavaException()
    if lastEx! <> null() then
        print "Java exception: ", lastEx!.getMessage()
    fi
    release
```

You can also use `ERR=` directly on the method call:

```bbj
use java.util.HashMap

map! = new HashMap()
x$ = map!.get("missing_key", err=oops)
print "Got value: ", x$
release

oops:
    print "Error: ", err, " - ", errmes(-1)
    release
```

`BBjAPI().getLastJavaException()` returns the actual Java exception object, so you can call `.getMessage()`, `.getClass().getName()`, or any other Java exception method on it.

For more on working with Java classes from BBj, see the [Java Interop chapter](/java-interop).

## Cleanup Patterns

BBj does not have a `finally` block, so cleanup requires explicit structure. The standard pattern uses `SETERR` to branch to a cleanup label on error, and falls through to the same label on success:

```bbj
seterr cleanup

ch = unt
open(ch)"data.dat"

rem ... process file ...

cleanup:
    close(ch, err=*next); rem Close channel, ignore error if not open
    if err <> 0 then
        print "Processing failed: ", errmes(-1)
    fi
    release
```

Key points:
- The `cleanup:` label is reached both on error (via `SETERR`) and on normal completion (fall-through)
- `close(ch, err=*next)` ensures the close does not itself throw if the channel was never opened
- Check `err` to determine whether you arrived via error or normal flow

**Remember:** `SETERR` resets after branching. If your cleanup handler does work that might error, re-establish `SETERR` or use `ERR=` on individual statements within the handler.

## Choosing Between SETERR and ERR=

| Use Case | Recommended | Why |
|----------|-------------|-----|
| Safety net for unexpected errors | `SETERR` | Catches anything you did not anticipate |
| Expected failure on one statement | `ERR=` | Handles the specific case without global impact |
| File open that might fail | `ERR=` on `OPEN` | You know exactly which operation might fail |
| Input parsing from user | `ERR=*NEXT` on `NUM()` | Expected invalid input, sensible default |
| Class method validation | `THROW` + caller `SETERR` | Clean separation of detection and handling |
| Long procedure with many operations | `SETERR` + per-statement `ERR=` | Global safety net with local overrides |

A common pattern in production code is to set a global `SETERR` handler at program start for unexpected errors, then use `ERR=` on specific statements where you expect and handle known failure modes.

<details>
<summary>Reading Legacy Code: Error Handling with ON ERR</summary>

`ON ERR GOTO` was an alternative to `SETERR` that some codebases preferred:

```bbj
on err goto handler
```

This is functionally identical to `seterr handler` in modern BBj. You may also encounter the `ON ERR GOSUB` variant:

```bbj
on err gosub handler

rem ... code ...
release

handler:
    print "Error: ", errmes(-1)
    return; rem Returns to the statement after the one that errored
```

`ON ERR GOSUB` uses `RETURN` (instead of `RETRY`) to continue execution after the handler. Both `ON ERR` forms still work in BBj but `SETERR` with labels is the modern convention.

</details>

:::tip Further Reading
- [BBj Object Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/error_handling.htm) -- Error handling patterns in BBj object programs
- [BBjAPI::getLastJavaException](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/bbjapi/BBjAPI_getLastBBjException.htm) -- Retrieving Java exception details from BBj
- [ERR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/variables/err_function_variable.htm) -- Full reference for the ERR function variable
:::
