---
sidebar_position: 1
title: "Console Debugging"
---

# Console Debugging

The BBj console is your primary debugging tool. When you break into a running program, you get an interactive prompt where you can step through code, inspect variables, and evaluate expressions -- all while the program is paused.

## Breaking into the Console

There are three ways to pause a running BBj program and drop to the console prompt (`>`):

**Ctrl-C / Ctrl-Break:** Keyboard interrupt while the program is running. The exact key depends on your terminal environment -- in a terminal emulator it is typically Ctrl-C (determined by the `stty intr` setting), and in a GUI window it is Ctrl-Break. The program pauses at the current line.

**ESCAPE verb:** Add `ESCAPE` to your code to create a programmatic breakpoint. When execution reaches this line, the program pauses and drops to the console:

```bbj
print "Before breakpoint"
escape
print "After breakpoint"
```

When the interpreter hits `ESCAPE`, it prints `ESCAPE` and `READY`, then shows the `>` prompt. You can inspect state, then type `RUN` to continue execution from where it stopped.

:::caution
Remove all `ESCAPE` statements before deploying to production. If console access is disabled in the deployment environment, hitting an ESCAPE will terminate the session.
:::

**Unhandled error:** When an error occurs and no `SETERR` or `ERR=` trap catches it, BBj drops to the console at the error line. This is often how you first discover a bug -- the program stops and you can immediately investigate.

## Dot-Stepping

Dot-stepping is the core debugging workflow. After breaking to the console, you step through your program one line at a time by typing a dot (`.`) followed by Enter. After each step, BBj shows the next line to be executed.

| Command | Action |
|---------|--------|
| `.` + Enter | Execute one line (single step into) |
| `..` + Enter | Execute one line, stepping over subroutine/method calls |
| `. n` | Execute next n lines |
| `.. n` | Step over n lines |

The single dot (`.`) steps **into** method calls -- you see each line inside the method as it executes. The double dot (`..`) steps **over** them -- the method runs to completion and you see the result on return.

Here is a typical dot-stepping session. Given this program:

```bbj
print "Hello"
for i = 1 to 5
    print i
    escape
next i
print "Done."
```

After the first `ESCAPE` fires, stepping looks like this:

```
READY
>.
NEXT I
>.
FOR I=1 TO 5
>.
PRINT I
>.
2
        ESCAPE
>
```

Each `.` advances one statement. The interpreter shows you the statement before executing it, so you can follow the exact flow through your program. You can also step multiple lines at once:

```
>. 20
```

This executes the next 20 lines (or fewer if an `ESCAPE` or error is hit first).

## Variable Inspection and Modification

At the console prompt, you have full access to program state. This is a live REPL -- you can test fixes before modifying your source code.

- `? variableName` or `PRINT variableName` -- display a variable's value
- `? obj!.method()` -- call a method and display the result
- `variableName = newValue` -- change a variable's value at runtime
- `? expression` -- evaluate any BBj expression

```
> ? name$
Alice
> ? count
42
> ? items!.size()
3
> count = 100
> ? count
100
```

You can also call methods on objects to inspect them further:

```
> ? myHashMap!.keySet().size()
5
> ? myVector!.getItem(0)
first item
```

Changing a variable at the console affects the running program. For example, if you set a loop counter past its limit, the loop exits on the next iteration:

```
> ? i
2
> i = 10
> run
Done.
```

## Searching Program Text

`\searchstring` searches the loaded program for the given text. This is useful when you break into the console and need to find a specific label, variable reference, or method call:

```
> \PRINT
[1] PRINT "Hello"
```

The search wraps around from the current position. Repeated searches with the same string find the next occurrence.

## Navigating Methods

`methodret` at the console exits the current method and returns to the caller. This is useful when you have stepped into a method with `.` and realize you do not need to debug its internals -- `methodret` takes you back to the calling code immediately.

## Diagnosing BEM Errors

When BBj reports an error, it shows three pieces of information:

- **Error number:** The BBj error code (e.g., 11 = end of file, 17 = file does not exist, 252 = Java exception)
- **Line number:** Where in your program the error occurred
- **Error message:** A human-readable description

For example:

```
!ERROR=11 Line 45
```

This means error 11 (end of file) at line 45. To diagnose:

1. Check line 45 of your program to see what operation was attempted
2. Look up the error code in the [Error Handling](/error-handling/seterr-and-err#common-error-codes) chapter, which has the common error codes table
3. Inspect variables at the console (`? channelVar`, `? fileName$`) to understand the state that caused the error

The error handling chapter covers error code lookup, common error numbers, and the `ERR=`/`SETERR` trapping patterns in detail. This chapter focuses on using the console to investigate *why* the error occurred.

## Console Access Control

In production deployments, console access may be restricted. The "Disallow Console" setting in Enterprise Manager's BBj Thin Client configuration terminates the session whenever it would drop to the console. You can also require a password with `STBL("!CONPASS")`. During development, ensure these restrictions are disabled so you can use the full console debugging toolkit.

<details>
<summary>Reading Legacy Code: STOP and ENTER Verbs</summary>

In older BBj and Business BASIC code, you may encounter the `STOP` verb, which pauses program execution similar to `ESCAPE`. The `ENTER` verb re-enters a program at a specific line number, functioning like a `goto` at the console.

Both verbs still work in BBj. `ESCAPE` is the modern equivalent for setting breakpoints in code. You may see `STOP` in older programs used as debug checkpoints.

</details>

:::tip Further Reading
- [ESCAPE Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/escape_verb.htm) -- Full reference for the ESCAPE verb
- [Dot Commands](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/Dot_Commands.htm) -- Complete dot-stepping command reference
- [SCAN Command](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/scan_command_scan_for_text_in_program.htm) -- Searching for text in loaded programs
- [Error Handling Chapter](/error-handling) -- Error codes, ERR=, and SETERR patterns
:::
