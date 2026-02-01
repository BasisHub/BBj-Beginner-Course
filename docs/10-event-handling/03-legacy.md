---
sidebar_position: 3
title: "Legacy Event Patterns"
---

# Legacy Event Patterns

Before setCallback, BBj and its predecessors used different event handling approaches. Understanding these patterns helps you read and maintain existing codebases. You should not write new code using these patterns -- they are here for reference only.

## CALLBACK Verb (Procedural BBj)

The CALLBACK verb is a procedural alternative to setCallback that predates Custom Objects. Its syntax is `CALLBACK(eventType, subroutineName, contextID {, controlID})`. The handler is a label that receives control via GOSUB and must end with RETURN.

```bbj
rem CALLBACK verb example (procedural style)
sysgui = unt
open(sysgui)"X0"
print(sysgui)'window'(10, 10, 400, 200, "CALLBACK Example", $00100083$)
print(sysgui)'button'(201, 50, 50, 100, 30, "Click")
callback(ON_BUTTON_PUSH, onPush, sysgui, 201)
callback(ON_CLOSE, onClose, sysgui)
process_events

onPush:
    a = msgbox("Clicked via CALLBACK verb", 0, "Event")
return

onClose:
    release
return
```

Key differences from setCallback:

- **Verb syntax, not a method call** -- `CALLBACK(...)` is a standalone verb, not a method on a control object.
- **Uses the SYSGUI channel number** instead of control object references.
- **Requires numeric event type constants** (ON_BUTTON_PUSH) and integer control IDs (201).
- **No typed event parameter** -- you must use `getLastEvent()` or parse the event manually.

## READ RECORD Loop (Visual PRO/5 Era)

The oldest event pattern predates both CALLBACK and setCallback. The program polls for events in a loop using READ RECORD on the SYSGUI channel, receiving raw event data as a string that must be parsed manually.

```bbj
rem READ RECORD polling loop (Visual PRO/5 style)
rem This is the oldest event pattern -- do NOT use in new code
rem Shown here so you can recognize it in legacy codebases
rem
rem loop:
rem     read record(sysgui, siz=6)event$
rem     rem parse event$ to determine what happened
rem     rem dispatch to handler based on event type
rem     goto loop
```

READ RECORD blocks until an event arrives, then returns raw event data as a fixed-length string that the program must parse byte by byte. This was the only option in Visual PRO/5 and early BBj. If you encounter this pattern, it is a strong candidate for modernization to setCallback.

## Migration Path

The progression is: READ RECORD, then CALLBACK verb, then setCallback. Each generation coexists -- you can mix them in the same program if needed during gradual migration. However, new code should always use setCallback with Custom Objects. When modernizing, start by replacing the event registration (CALLBACK verb to setCallback) and moving handlers into class methods.

:::caution
Do not mix READ RECORD and PROCESS_EVENTS in the same program. READ RECORD consumes events from the queue, which empties it before PROCESS_EVENTS can dispatch them. Choose one approach per program.
:::

<details>
<summary>Reading Legacy Code: Recognizing Event Generations</summary>

- **READ RECORD on SYSGUI channel:** Oldest pattern. Look for `read record(sysgui` or `read(sysgui`. Always a polling loop with `goto`.
- **CALLBACK verb:** Middle generation. Look for `CALLBACK(ON_` at the verb level (not a method call on a control object).
- **setCallback method:** Modern. Look for `ctrl!.setCallback(` as a method call on a control object reference.

</details>

:::tip Further Reading
- [CALLBACK Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/callback_verb.htm) -- Complete syntax and parameter reference
- [READ RECORD Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/read_record_verb.htm) -- Low-level record reading for SYSGUI events
:::
