---
sidebar_position: 1
title: "setCallback and process_events"
---

# setCallback and process_events

The `setCallback` method registers a callback on a control for a specific event type. When that event fires, BBj calls your handler. Combined with `process_events`, this is how all modern BBj GUI programs work.

## SYSGUI and Window Basics

GUI programs open a SYSGUI device with `BBjAPI().openSysGui("X0")`, then create windows and controls through it. `addWindow` creates a BBjWindow, and window methods like `addButton` and `addInputE` create controls. This is setup plumbing -- the interesting part is how you respond to events on those controls.

```bbj
sysgui! = BBjAPI().openSysGui("X0")
window! = sysgui!.addWindow(10, 10, 400, 200, "My App", $00100083$)
button! = window!.addButton(201, 50, 50, 100, 30, "Click Me")
```

## Label-Based Callbacks

The simpler form of `setCallback` registers a label as the callback target. When the event fires, BBj GOSUBs to that label, so you **must** end the handler with `return`. To access the event object from inside a label-based callback, call `BBjAPI().getSysGui().getLastEvent()`.

```bbj
sysgui! = BBjAPI().openSysGui("X0")
window! = sysgui!.addWindow(10, 10, 400, 200, "Simple App", $00100083$)
button! = window!.addButton(201, 50, 50, 100, 30, "Click Me")
button!.setCallback(button!.ON_BUTTON_PUSH, "onButtonPush")
window!.setCallback(window!.ON_CLOSE, "onClose")
process_events

onButtonPush:
    event! = BBjAPI().getSysGui().getLastEvent()
    a = msgbox("Button clicked!", 0, "Event")
return

onClose:
    release
return
```

Here is what each part does:

- **`setCallback(button!.ON_BUTTON_PUSH, "onButtonPush")`** registers the label `onButtonPush` to run when the button is clicked.
- **`process_events`** starts the event loop -- execution blocks here until an event fires.
- The **label handler** (`onButtonPush:`) executes and `return`s control back to the event loop.
- **`getLastEvent()`** retrieves the event object so you can inspect what happened.

## Method-Based Callbacks (Recommended)

The OO form of `setCallback` targets a method on a Custom Object: `ctrl!.setCallback(event, obj!, "methodName")`. The callback method receives the event object as a parameter -- no need for `getLastEvent()`. The method parameter type **must** match the event type (e.g., `BBjButtonPushEvent` for ON_BUTTON_PUSH).

```bbj
class public MyApp
    field private BBjWindow window!
    field private BBjButton button!
    field private BBjInputE input!

    method public void run()
        sysgui! = BBjAPI().openSysGui("X0")
        #window! = sysgui!.addWindow(10, 10, 400, 200, "My App", $00100083$)
        #button! = #window!.addButton(201, 50, 50, 100, 30, "Click Me")
        #input! = #window!.addInputE(202, 50, 100, 200, 30, "")
        #button!.setCallback(#button!.ON_BUTTON_PUSH, #this!, "onButtonPush")
        #input!.setCallback(#input!.ON_EDIT_MODIFY, #this!, "onTextChange")
        #window!.setCallback(#window!.ON_CLOSE, #this!, "onClose")
        process_events
    methodend

    method public void onButtonPush(BBjButtonPushEvent event!)
        a = msgbox("Button pushed! Text: " + #input!.getText(), 0, "Event")
    methodend

    method public void onTextChange(BBjEditModifyEvent event!)
        print "Text changed to: " + event!.getText()
    methodend

    method public void onClose(BBjCloseEvent event!)
        release
    methodend
classend

app! = new MyApp()
app!.run()
```

Method-based callbacks are preferred because they provide typed event parameters (the compiler catches type mismatches), encapsulate state in fields instead of global variables, and keep handler logic close to the data it operates on. Use label-based callbacks only for quick scripts where a full class is unnecessary.

## process_events

`process_events` blocks execution until an event occurs, dispatches it to the registered callback, then blocks again waiting for the next event. It is effectively an infinite loop that only ends when the program calls `release` or encounters an unhandled error.

:::caution
`process_events` must be the **last** thing in your setup code. If you place it before adding controls or registering callbacks, the window appears briefly and the program may hang or behave unexpectedly. Always follow this pattern: create window, add controls, register callbacks, then `process_events`.
:::

The optional `process_events,TIM=int` form sets a timeout in seconds. If no event occurs within the timeout, execution continues past `process_events`. This is useful for polling patterns, but most programs use the standard blocking form.

## release

`release` terminates the program and closes all windows. This is the standard way to exit a BBj GUI program. Always register an ON_CLOSE handler that calls `release` so the user can close the window cleanly.

Cross-reference: The class syntax used in method-based callbacks is covered in the [Object-Oriented Programming](/object-oriented) chapter.

<details>
<summary>Reading Legacy Code: Label-Based vs Method-Based</summary>

Label-based callbacks (`setCallback(event, "label")`) are still valid but older-style. You will see them in procedural BBj programs that predate Custom Objects. Method-based callbacks are preferred in modern code for encapsulation and typed event parameters. Both forms work identically at runtime -- the difference is code organization.

</details>

:::tip Further Reading
- [setCallback Method](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/Window/BBjControl/BBjControl_setCallback.htm) -- Full reference for setCallback syntax
- [process_events Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/process_events_verb.htm) -- Event loop behavior and options
- [BBjWindow](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/Window/bbjwindow/BBjWindow.htm) -- Window creation and control methods
:::
