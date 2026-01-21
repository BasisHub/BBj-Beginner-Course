# Getting Started - First Steps in the New Tool

In this section, you start your journey in BBj. We cover installation, how to write your first program and how to work with the documentation. After this lesson, you should be able to write first simple graphical programs.

## Setup Java, BBj and Eclipse

Visit [https://www.basis.com/eclipseplug-ins](https://www.basis.com/eclipseplug-ins) for detailed instructions on how to set up your environment.

This video shows the steps.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ovk8kznQfGs" title="Setup for BBj Development" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Follow these steps to set up your environment. When you're done, you should have BBj and Eclipse running on your computer.

## A first "Hello World"

"Hello World" is for many languages the first step you may do. Our Hello World will use the BBj Message Box (MSGBOX) to greet the user.

Here is a video to get you inspired:

<iframe width="560" height="315" src="https://www.youtube.com/embed/fF9LaVXJGuA" title="A First Hello World" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The Sample uses the following verbs, here are their links to the documentation:
- [MSGBOX](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/msgbox_function.htm)
- [RELEASE](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/release_verb.htm) or [BYE](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bye_verb.htm)

Read the documentation about these verbs to get familiar with the documentation.

### Sample Program

```bbj
A=MSGBOX("Hello World")
RELEASE
```

## Basics about Syntax and Variables in BBj

There are a few rules of thumb in the BBj language that you might find useful in the beginning:

- No or squiggles or similar - BBj is structured by its keywords (`CLASS - CLASSEND`, `METHOD - METHODEND` etc)
- No semicolons at the end of lines
- BBj is a dynamic language. Variables can be used without formal declaration, but you can declare variables that are Object-Types
- BBj knows a few "built-in" Variables: Numbers, Whole Numbers and Strings. Plus Objects.
- Comments are in lines that start with `REM` (for "Remark")
- Variable names and keywords are Case-Insensitive
- But references to (Java) Classes retain their case-sensitivity

Watch this video about Variables in BBj:

<iframe width="560" height="315" src="https://www.youtube.com/embed/DRjpwGLKzQA" title="Variables in BBj" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

## A Better Version of "Hello World"

Now it's time to write a better version of your "Hello World", with a true Window and a Button. When the user pushes the button, we want to show our MessageBox:

<iframe width="560" height="315" src="https://www.youtube.com/embed/oG1Q5wVf3u4" title="A Better Hello World" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Write the program in your IDE. I suggest you develop it step by step, like in the video, and play with the syntax, and the KeywordHelp that links you to the documentation.

You can find a copy of the program in the Files-Section of this Section.

## Loops and IF-Statements

Now it's time to learn how you do Loops in BBj, and how you can create IF-statements.

Again, let's start with a short video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/jxSfPOuj_nk" title="Loops and IF-Statements" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Summary

IF-Statements are either multi-line:
```bbj
IF something THEN
    dosomething
ELSE
    dosomethingelse
ENDIF
```

or a single line:
```bbj
IF something THEN dosomething
```

- BBj knows `FOR...NEXT`, `WHILE...WEND` and `REPEAT...UNTIL`
- The keyword to exit a loop is `BREAK`
- The keyword to skip to the next iteration inside a loop is `CONTINUE`

Now visit this [documentation page](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/index.htm) and locate the keywords. Have a look around - what else could be used for the flow structure of a program?

## Types of Input Fields

In our better version of "Hello World" we have learned how to implement a callback for a Button-Push. This is already "user input". Taking user input from fields is pretty similar.

### Types of Input Fields

BBj knows a few different types of Input Fields, where users can directly enter data:

- **BBjEditBox** - a simple, single line edit (which also has options to act as a password input)
- **BBjCEdit** - a simple Multi-Line edit
- **BBjInputN** - a control especially to enter numbers
- **BBjInputD** - an input for dates
- **BBjInputE** - an input control for Strings
- **BBjHTMLEdit** - a built-in HTML Editor

Take some time to visit the documentation pages for each of these controls. Have a look at the method signatures, the events they offer, and the sample code that is listed in some of the chapters. You can copy and paste the sample code into your IDE, run it there and examine it further. Do so for some of the examples from the docs to become more familiar with the documentation, BBj source code and the IDE.

### Masks

BBjInputE and BBjInputN use Masks to format user input. Read the documentation page about masks. Read about String Output Masking and Numeric Masks in the Documentation.

:::note
Please recognize that some topics (like these two) are BBj-specific and come with links to the original, legacy topics that also apply for BBj.
:::

BBjInputD takes a Date Mask which is documented with the DATE function; also read about the input taking itself for this control.

## Next Sample: A multiplying Calculator

This sample shows a simple calculator that multiplies two numbers. It updates with every keystroke due to the EDIT_MODIFY event that is registered for the two BBjInputN.

Create a new program in your IDE and copy this program into your editor. Examine and run it, and play with it. Try to understand how the events work.

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

Can you enhance it? Add a button to clear the input in both fields.

:::tip
The `setValue()` method for BBjInputN can be used to set their value to "0". Find it in the documentation!
:::

## Some more hints

A few more things are noteworthy about BBj that can be explained at the hand of the calculator sample:

### Control IDs

You see that the original sample uses fixed IDs for each control. In many cases, the control ID may not play a role to your control logic. In these cases, you can use the Method `getAvailableControlID` of BBjWindow to simply get a unique one that has not been used.

If you have the pleasure of working on legacy code though, you might need to recognize fixed control IDs that had been used in the past. Since they need to be unique, you will need to avoid conflicts when you add new controls to existing programs, so this particular method may not be useful in such scenarios.

### Keyboard Navigation

Did you notice that (in GUI) you couldn't use the Tab-Key to navigate the form? This is because we didn't set any flags on the BBjWindow. Have a look at the documentation page of `addWindow` and find the flag for keyboard navigation (`$00010000$`).

Have a look at the other flags (they're combined by adding). Play with them. Can you make the Window also allow navigating the fields with the Enter-key?
