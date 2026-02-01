---
sidebar_position: 1
title: "Getting Started"
---

# Getting Started

This section covers environment setup, your first BBj programs, variables, control flow, input fields, and event handling. By the end, you will be able to write simple graphical BBj applications.

## Setting Up Your Environment

Visit [https://www.basis.com/eclipseplug-ins](https://www.basis.com/eclipseplug-ins) for detailed instructions on setting up your development environment.

BBj development tooling has expanded since the video below was recorded. In addition to the Eclipse plug-in shown, [BDTStudio](https://www.basis.com/eclipseplug-ins) (a preconfigured Eclipse distribution) and a VSCode extension are now available options.

<details>
<summary>Watch the video: Setting Up Your Environment</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ovk8kznQfGs" title="Setup for BBj Development" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

## A First "Hello World"

BBj's `MSGBOX` function displays a modal dialog. The simplest BBj program:

```bbj
A=MSGBOX("Hello World")
RELEASE
```

`MSGBOX` shows the dialog and returns the user's button selection. `RELEASE` terminates the program. See the documentation for [MSGBOX](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/msgbox_function.htm) and [RELEASE](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/release_verb.htm) (or its synonym [BYE](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bye_verb.htm)).

<details>
<summary>Watch the video: A First Hello World</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/fF9LaVXJGuA" title="A First Hello World" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

## Syntax and Variables

BBj syntax differs from C-family languages in several ways:

- No braces or squiggles -- BBj uses keyword pairs for structure (`CLASS - CLASSEND`, `METHOD - METHODEND`, etc.)
- No semicolons at the end of lines
- BBj is a dynamic language. Variables can be used without formal declaration, though object-type variables can be explicitly declared
- Built-in variable types: Numbers, Integers, and Strings, plus Objects
- Comments start with `REM` (for "Remark")
- Variable names and keywords are case-insensitive
- References to Java classes retain their case-sensitivity

<details>
<summary>Watch the video: Variables in BBj</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/DRjpwGLKzQA" title="Variables in BBj" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

### BBj Variables Cheat Sheet

#### Generic Variable Types

**Strings** end with "$":
```bbj
MyString$ = "Hello World"
```

**Numbers** have no Suffix:
```bbj
SomeNumber = 3.14
```

**Whole Numbers** = Integers end with "%":
```bbj
SomeIntegerNumber% = 3
```

#### Object Types

Object Types end with "!":
```bbj
myMap! = new java.util.HashMap()
api! = BBjAPI()
```

Declare Object Types with "declare":
```bbj
declare java.util.HashMap myMap!
myMap! = new java.util.HashMap()
```

Import Java Types with "use":
```bbj
use java.util.HashMap
declare HashMap myMap!
myMap! = new HashMap()
```

## A Better Hello World

This example creates a window with a button that displays a message box when clicked. It introduces `BBjAPI().openSysGui()` for GUI access, `addWindow` for creating windows, and `setCallback` for event handling.

Create this program in your IDE, building it incrementally to understand each step.

<details>
<summary>Watch the video: A Better Hello World</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/oG1Q5wVf3u4" title="A Better Hello World" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

## Loops and IF Statements

BBj provides standard control flow structures for conditionals and iteration.

IF statements are either multi-line:
```bbj
IF something THEN
    dosomething
ELSE
    dosomethingelse
ENDIF
```

or single-line:
```bbj
IF something THEN dosomething
```

BBj supports `FOR...NEXT`, `WHILE...WEND`, and `REPEAT...UNTIL` loops. Use `BREAK` to exit a loop and `CONTINUE` to skip to the next iteration.

Explore the [BBj verbs reference](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/index.htm) for additional control flow options.

<details>
<summary>Watch the video: Loops and IF Statements</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/jxSfPOuj_nk" title="Loops and IF-Statements" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

## Types of Input Fields

The Better Hello World example demonstrated button callbacks. Text input fields follow the same event-driven pattern.

### Available Input Controls

BBj provides several input field types for different data entry needs:

- **BBjEditBox** -- a single-line text input (also supports password mode)
- **BBjCEdit** -- a multi-line text editor
- **BBjInputN** -- numeric input with formatting
- **BBjInputD** -- date input
- **BBjInputE** -- string input with mask support
- **BBjHTMLEdit** -- a rich text (HTML) editor

Review the documentation for each control type. The method signatures, available events, and sample code demonstrate typical usage patterns.

### Masks

BBjInputE and BBjInputN use masks to format user input. See the documentation on String Output Masking and Numeric Masks.

:::note
Some BBj topics link to original legacy documentation pages that remain applicable to BBj. The mask documentation is one such case -- the underlying formatting rules carry over from earlier versions.
:::

BBjInputD uses a date mask documented with the DATE function. See the BBjInputD documentation for details on its input behavior.

## A Multiplying Calculator

This calculator multiplies two numbers and updates in real time via the `ON_EDIT_MODIFY` event registered on each `BBjInputN` control.

Copy this program into your IDE and run it. The calculator recalculates on every keystroke:

```bbj
wnd! = BBjAPI().openSysGui("X0").addWindow(50,50,400,200,"Multiply")

label1! = wnd!.addStaticText(100,10,12,20,25,"X:")
field_x! = wnd!.addInputN(101,30,10,50,25,"")

label2! = wnd!.addStaticText(103,10,42,20,25,"Y:")
field_y! = wnd!.addInputN(104,30,40,50,25,"")

result! = wnd!.addStaticText(105,10,72,200,25,"")

rem register the callback to close the program
wnd!.setCallback(BBjAPI.ON_CLOSE,"byebye")

rem register the callbacks for ON_EDIT_MODIFY
field_x!.setCallback(BBjAPI.ON_EDIT_MODIFY,"updateResult")
field_y!.setCallback(BBjAPI.ON_EDIT_MODIFY,"updateResult")

rem set the focus in the X-Input
field_x!.focus()

process_events

byebye:
bye

updateResult:
    x = field_x!.getValue()
    y = field_y!.getValue()
    r = x*y
    result!.setText("X * Y = "+str(r))
return
```

### Exercise

Add a "Clear" button that resets both input fields to zero. Use `setValue()` on each `BBjInputN` control.

:::tip
The `setValue()` method on `BBjInputN` accepts a numeric value -- pass `0` to reset the field.
:::

## Additional Notes

The calculator example illustrates two additional concepts worth understanding.

### Control IDs

The calculator uses fixed numeric IDs for each control (100, 101, 103, etc.). These IDs must be unique within a window. When the specific ID value does not matter, use `BBjWindow.getAvailableControlID()` to generate a unique one automatically.

In legacy code, fixed control IDs are often meaningful and referenced elsewhere. When modifying existing programs, avoid ID conflicts by checking which IDs are already in use before adding new controls.

### Keyboard Navigation

By default, BBj GUI windows do not support Tab key navigation between controls. Enable keyboard navigation by setting the `$00010000$` flag in the `addWindow` call. See the [addWindow documentation](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/SysGui/bbjsysgui/BBjSysGui_addWindow.htm) for all available window flags.

Flags are combined by addition. For example, to enable both Tab and Enter key navigation, add the respective flag values together.

### Exercise

Combine the keyboard navigation flag with the Enter-key navigation flag to enable both Tab and Enter navigation in the calculator window.
