---
sidebar_position: 99
title: "Reading Legacy Code"
description: "Recognize and understand legacy Java interop patterns in older BBj codebases"
---

# Reading Legacy Code: Java Interop

You will encounter these patterns in older BBj codebases. Each section shows the legacy approach and its modern equivalent.

### Pre-`use` Fully-Qualified Class Names

You may see this in 3rd Gen (Early BBj) code:

```bbj
rem Legacy: fully-qualified class names on every reference
map! = new java.util.HashMap()
list! = new java.util.ArrayList()
map!.put("key", "value")
iter! = map!.keySet().iterator()
while iter!.hasNext()
    k! = iter!.next()
    print k!, " = ", map!.get(k!)
wend
```

The modern equivalent:

```bbj
rem Modern: use statements for clean short names
use java.util.HashMap
use java.util.ArrayList

map! = new HashMap()
list! = new ArrayList()
map!.put("key", "value")
iter! = map!.keySet().iterator()
while iter!.hasNext()
    k! = iter!.next()
    print k!, " = ", map!.get(k!)
wend
```

The `use` statement was added in later BBj versions to allow short class names. Before `use`, every reference to a Java class required the full package path. In large programs with dozens of Java class references, this made code significantly harder to read. Modern BBj places `use` statements at the top of the file, similar to `import` in Java.

### ADDR() and CALL for Callbacks

You may see this in 2nd Gen (PRO/5) and 3rd Gen code:

```bbj
rem Legacy: ADDR() for function pointer, CALL for invocation
rem ADDR() returns a "pointer" to a label or external program
addr_handler = addr("handler_routine")
rem CALL invokes a program/subroutine by name or address
call "MYHANDLER.bbj"
```

The modern equivalent:

```bbj
rem Modern: setCallback with method reference in a Custom Object
use java.util.HashMap

class public MyApp
    method public void run()
        sysgui = unt
        open(sysgui)"X0"
        window! = BBjAPI().getSysGui().addWindow(10, 10, 300, 200, "App")
        button! = window!.addButton(1, 50, 50, 100, 30, "Click")
        button!.setCallback(BBjAPI.ON_BUTTON_PUSH, #this!, "onButtonPush")
        process_events
    methodend

    method public void onButtonPush(BBjButtonPushEvent ev!)
        a = msgbox("Button clicked!", 0, "Event")
    methodend
classend

new MyApp().run()
```

`ADDR()` returned a numeric address for a label or subroutine, and `CALL` invoked programs by filename. This was the mechanism for inter-module communication before Custom Objects. Modern BBj uses `setCallback` with a method name string on an object reference, which provides type safety and keeps event handling within the class structure.

### String-Based Data Exchange

You may see this in 2nd Gen and 3rd Gen code:

```bbj
rem Legacy: pipe-delimited string as inter-module data transport
data$ = "Alice|Developer|Platform|2024"
rem Receiver parses with POS() and substring extraction
p1 = pos("|" = data$)
name$ = data$(1, p1 - 1)
rest$ = data$(p1 + 1)
p2 = pos("|" = rest$)
role$ = rest$(1, p2 - 1)
```

The modern equivalent:

```bbj
rem Modern: pass a Java object between modules
use java.util.HashMap

map! = new HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
map!.put("team", "Platform")
map!.put("year", "2024")

rem Receiver accesses fields by name
print map!.get("name")
print map!.get("role")
```

Before Java interop, programs exchanged data between modules using delimited strings (pipe `|`, comma, or `SEP` character CHR(254)) or fixed-width fields. The receiver had to know the exact format and parse it manually. Passing a `HashMap` or custom object provides named field access, eliminates parsing bugs, and makes the data contract explicit.

### Procedural Java Interop

You may see this in 3rd Gen code:

```bbj
rem Legacy: Java calls scattered throughout procedural code
rem No class structure, no encapsulation
map! = new java.util.HashMap()
map!.put("name", "Alice")
gosub process_data
release

process_data:
    print "Name: ", map!.get("name")
    rem More Java calls mixed with GOSUB logic
    fmt! = new java.text.SimpleDateFormat("yyyy-MM-dd")
    print "Date: ", fmt!.format(new java.util.Date())
return
```

The modern equivalent:

```bbj
rem Modern: Java calls encapsulated in Custom Object methods
use java.util.HashMap
use java.text.SimpleDateFormat
use java.util.Date

class public DataProcessor
    field private HashMap data!

    method public DataProcessor(HashMap data!)
        #data! = data!
    methodend

    method public void process()
        print "Name: ", #data!.get("name")
        fmt! = new SimpleDateFormat("yyyy-MM-dd")
        print "Date: ", fmt!.format(new Date())
    methodend
classend

map! = new HashMap()
map!.put("name", "Alice")
processor! = new DataProcessor(map!)
processor!.process()
```

Early BBj programs used Java objects but structured the code procedurally with labels and `GOSUB`. Java calls were scattered throughout the program without encapsulation. Modern BBj wraps Java interop in Custom Object methods, providing clear interfaces, reusable components, and the ability to extend Java classes or implement Java interfaces.
