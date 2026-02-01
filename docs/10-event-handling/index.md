---
sidebar_position: 1
title: "Event Handling"
---

# Event Handling

BBj programs respond to user actions -- button clicks, text changes, window closes -- through event callbacks. You register a callback method or label on a control, then call `process_events` to start the event loop. BBj dispatches events to your callbacks as they occur.

## At a Glance

| Feature | Syntax | Purpose |
|---------|--------|---------|
| setCallback (method) | `ctrl!.setCallback(event, obj!, "method")` | Register OO callback with event parameter |
| setCallback (label) | `ctrl!.setCallback(event, "label")` | Register label-based callback |
| process_events | `process_events` | Start the event loop (blocks until event) |
| getLastEvent() | `BBjAPI().getSysGui().getLastEvent()` | Get event object in label-based callbacks |
| ON_BUTTON_PUSH | `ctrl!.ON_BUTTON_PUSH` | Button click event constant |
| ON_CLOSE | `window!.ON_CLOSE` | Window close event constant |
| ON_EDIT_MODIFY | `ctrl!.ON_EDIT_MODIFY` | Text change event constant |

BBj event handling evolved through three generations. **READ RECORD** polling loops (Visual PRO/5 era) gave way to the **CALLBACK verb** (procedural BBj), and finally to **setCallback** (modern OO BBj). This chapter teaches setCallback first as the recommended approach, with legacy patterns in a separate reference page for reading existing code.
