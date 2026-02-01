---
sidebar_position: 1
title: "Debugging"
---

# Debugging

BBj provides a powerful console-based debugging environment that lets you break into a running program, step through code line by line, inspect and modify variables, and trace execution to a file. These tools work directly in the BBj interpreter -- no IDE plugin required.

## At a Glance

| Technique | Command/Verb | Purpose |
|-----------|-------------|---------|
| Break to console | Ctrl-C or Ctrl-Break | Pause running program |
| Single step | `.` + Enter | Execute one line |
| Step over | `..` + Enter | Execute one line, skip subroutine internals |
| Step N lines | `. n` | Execute next n lines |
| Print variable | `? var` or `PRINT var` | Display variable value |
| Change variable | `var = newvalue` | Modify variable at runtime |
| Search code | `\searchstring` | Find text in program |
| DUMP | `DUMP(chan)` | Write all variables to file |
| SETTRACE | `SETTRACE(chan)` | Log each executed line to file |
| ENDTRACE | `ENDTRACE` | Stop tracing |

BBj debugging is interactive. You are inside the running interpreter with full access to program state. You can evaluate expressions, call methods, and even change code flow -- the console is a live REPL in the context of your paused program.
