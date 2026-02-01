---
sidebar_position: 2
title: "Event Types and Objects"
---

# Event Types and Objects

Every BBj event has a constant (like ON_BUTTON_PUSH) and a corresponding event object (like BBjButtonPushEvent) that carries information about what happened. Knowing which events are available on which controls -- and what data the event object provides -- is key to building interactive applications.

## Core Event Types

These are the events you will use most often:

| Event Constant | Event Object | Fires On | When |
|----------------|-------------|----------|------|
| ON_BUTTON_PUSH | BBjButtonPushEvent | BBjButton | Button clicked |
| ON_CLOSE | BBjCloseEvent | BBjWindow | Window close requested |
| ON_EDIT_MODIFY | BBjEditModifyEvent | BBjInputE, BBjEditBox | Text content changes |
| ON_GAINED_FOCUS | BBjGainedFocusEvent | Most controls | Control receives focus |
| ON_LOST_FOCUS | BBjLostFocusEvent | Most controls | Control loses focus |
| ON_LIST_SELECT | BBjListSelectEvent | BBjListButton, BBjListBox | Item selected from list |
| ON_CHECK_ON | BBjCheckOnEvent | BBjCheckBox | Checkbox checked |
| ON_CHECK_OFF | BBjCheckOffEvent | BBjCheckBox | Checkbox unchecked |

Each control type has a specific set of events it supports. The event constants are accessed as properties on the control object (e.g., `button!.ON_BUTTON_PUSH`).

## Event Objects

Event objects carry context about the event that fired. All event objects extend BBjEvent and provide `getControl()` to get the source control. Specific event types add their own methods:

- **BBjEditModifyEvent**: `getText()` returns the current text content
- **BBjListSelectEvent**: `getSelectedItem()` returns the selected item text
- **BBjButtonPushEvent**: Minimal -- the event firing is the information (use `getControl()` to identify which button)

Here is an example using `getControl()` to identify which control fired an event:

```bbj
method public void onFocus(BBjGainedFocusEvent event!)
    ctrl! = event!.getControl()
    print "Focus gained by control: " + str(ctrl!.getID())
methodend
```

## Common Patterns

### Multiple Buttons, One Handler

Register several buttons to the same callback, then use `event!.getControl().getID()` to distinguish which button was pressed:

```bbj
#saveBtn!.setCallback(#saveBtn!.ON_BUTTON_PUSH, #this!, "onButton")
#cancelBtn!.setCallback(#cancelBtn!.ON_BUTTON_PUSH, #this!, "onButton")

method public void onButton(BBjButtonPushEvent event!)
    id = event!.getControl().getID()
    if id = SAVE_ID then gosub doSave
    if id = CANCEL_ID then gosub doCancel
methodend
```

This pattern keeps your callback count manageable when you have many buttons that share similar logic.

### Live Validation on Text Change

Use ON_EDIT_MODIFY for real-time input validation as the user types:

```bbj
method public void onTextChange(BBjEditModifyEvent event!)
    text$ = event!.getText()
    if len(text$) < 3 then #statusLabel!.setText("Too short")
    if len(text$) >= 3 then #statusLabel!.setText("OK")
methodend
```

:::caution
Event handler method parameter type must match the event type. If you register ON_BUTTON_PUSH but your method signature takes `BBjEditModifyEvent`, you will get Error 208 at runtime. Always match: ON_BUTTON_PUSH requires BBjButtonPushEvent, ON_CLOSE requires BBjCloseEvent, ON_EDIT_MODIFY requires BBjEditModifyEvent, and so on. See the [Error Handling](/error-handling) chapter for how to diagnose runtime errors like this using `ERR=` and error codes.
:::

<details>
<summary>Reading Legacy Code: Numeric Event Constants</summary>

Older code may use numeric constants instead of named properties: `CALLBACK(1, ...)` instead of `ON_BUTTON_PUSH`. The named constants (like `ctrl!.ON_BUTTON_PUSH`) are preferred for readability. Both refer to the same underlying event type numbers.

</details>

:::tip Further Reading
- [BBj Events Reference](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/Window/BBjControl/BBjControl_Events.htm) -- Complete list of events per control type
- [BBjButtonPushEvent](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/Window/bbjbuttonpushevent/BBjButtonPushEvent.htm) -- Button push event details
- [BBjEditModifyEvent](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/Window/bbjeditmodifyevent/BBjEditModifyEvent.htm) -- Text modification event details
:::
