---
sidebar_position: 2
title: "Tracing and Logging"
---

# Tracing and Logging

When interactive debugging is not practical -- the bug is intermittent, happens in production, or involves complex timing -- you need to record what the program does. BBj provides DUMP for snapshots and SETTRACE for execution logging, plus several options for adding your own log output.

## DUMP: Variable Snapshot

The DUMP verb writes all current variables to a destination. Two forms:

- `DUMP` -- prints all variables to the console (useful when already at the console prompt)
- `DUMP(chan)` -- writes all variables to an open file channel

The file-based form is most useful for capturing a snapshot you can inspect after the fact:

```bbj
name$ = "Alice"
count = 42
items! = BBjAPI().makeVector()
items!.addItem("one")
items!.addItem("two")
open(7, mode="O_CREATE,O_TRUNC")"/tmp/debug_dump.txt"
dump(7)
close(7)
print "Variables dumped to /tmp/debug_dump.txt"
```

DUMP writes every variable in scope -- strings, numbers, and object references. For large programs this can be verbose, but it is invaluable for post-mortem debugging when you cannot reproduce the issue interactively.

**Filtered DUMP:** By default, DUMP outputs all variables including globals. To see only variables at the current scope level (useful inside methods to avoid noise from global variables):

```bbj
dump(0, mode="vars,level="+str(tcb(13)))
```

This uses `tcb(13)` to get the current CALL stack level and filters the output accordingly.

## SETTRACE / ENDTRACE: Execution Trace

SETTRACE records every line executed to a file channel. ENDTRACE stops recording. Together they produce a complete execution trace showing the exact path through your program.

```bbj
open(8, mode="O_CREATE,O_TRUNC")"/tmp/debug_trace.txt"
settrace(8)
for i = 1 to 3
    print "Loop iteration: ", i
next i
endtrace
close(8)
print "Trace written to /tmp/debug_trace.txt"
```

The trace file shows each line number and statement as it executes. For loops, you see each iteration. For method calls, you see entry and exit. This is especially useful for understanding flow through complex conditional logic or tracking down which branch of an `if/else` chain was taken.

:::caution
SETTRACE generates large output files quickly. Trace only the section of code you are investigating, and use ENDTRACE to stop as soon as possible. A trace of even a simple loop produces one line per iteration -- a loop of 10,000 iterations creates 10,000 lines of trace output.
:::

## Logging Techniques

When you need persistent debug output without the full weight of SETTRACE, add targeted logging to your code. Four approaches, each suited to a different situation:

| Method | Output Destination | When to Use |
|--------|-------------------|-------------|
| `System.out.println(var$)` | BBj debug log (server-side) | Server-side logging, viewable in Enterprise Manager |
| `sysGui!.executeScript("console.log('msg')")` | Browser console | BUI/DWC debugging only |
| `MSGBOX(var$)` | Dialog popup | Quick visual check (blocks execution) |
| `PRINT var$` | Console / terminal | Simple output during development |

**System.out.println** writes to the BBj debug log in the `<bbj>/log` directory. This is the closest BBj equivalent to a logging framework -- the output persists, can be viewed in Enterprise Manager's log viewer, and works even when console access is disabled:

```bbj
use java.lang.System

System.out.println("Debug: entering processOrder, id=" + str(orderId))
rem ... processing logic ...
System.out.println("Debug: order processed, total=" + str(total))
```

For quick-and-dirty checks during development, `PRINT` works but the output goes to the console or terminal and is lost when the program ends. `MSGBOX` pops up a dialog that blocks execution until dismissed -- useful for a quick check but be sure to remove it before deploying.

## IDE Debugger

The BBj IDE tools -- BDT (BBj Development Tools for Eclipse) and the newer VS Code extension -- include a visual debugger with breakpoints, variable watches, and step controls. These wrap the same underlying console debugging capabilities in a graphical interface. For teams using an IDE workflow, the visual debugger is a convenient option. This chapter focuses on console debugging because it works in every environment and does not require IDE setup.

<details>
<summary>Reading Legacy Code: SETTRACE Without File Channel</summary>

`SETTRACE` without a channel number prints the trace directly to the console. Older code may use `SETTRACE` alone for interactive tracing while watching the console output scroll by:

```bbj
settrace
run
```

The file-based form `SETTRACE(chan)` is more practical for capturing output you can inspect later, search through, or share with colleagues. The console form is mainly useful for very short debugging sessions where you want to watch execution in real time.

</details>

:::tip Further Reading
- [DUMP Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/dump_verb_bbj.htm) -- Full reference for DUMP syntax and filtering options
- [SETTRACE Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/settrace_verb.htm) -- Full reference for SETTRACE
- [ENDTRACE Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/endtrace_verb.htm) -- Stopping an active trace
- [Error Handling Chapter](/error-handling) -- Error codes and SETERR patterns used alongside tracing
:::
