---
sidebar_position: 2
title: "Generations of BBj"
description: "A decoder ring for identifying and understanding the four generations of BBj code"
---

# Generations of BBj

BBj code you encounter will come from one of four generations. Each generation has distinctive syntax patterns that tell you when it was written and what conventions it follows. This page helps you identify which era code belongs to and understand its modern equivalent.

## Overview

| Generation | Era | Product | Signature Syntax | Modern Equivalent |
|------------|-----|---------|-----------------|-------------------|
| 1st Gen | 1985--1995 | BBx (Business BASIC) | Line numbers, `GOTO`, `DIM` arrays, character-mode I/O | Labels, `BBjVector`, GUI controls |
| 2nd Gen | 1995--2002 | PRO/5 / Visual PRO/5 | `CALLBACK` verb, `SYSGUI` channel, `READ RECORD` event loops | `setCallback`, `process_events` |
| 3rd Gen | 2002--2006 | Early BBj (1.x--5.x) | Java `new` with fully-qualified class names, `SQLOPEN`/SQL verbs | `use` imports, Custom Objects |
| 4th Gen | 2006--present | BBj 6.0+ (Custom Objects) | `class`/`classend`, `method`/`field`, `setCallback` methods | Current recommended style |

## 1st Generation: BBx (1985--1995)

BBx (Business BASIC eXtended) was a character-mode language built for business data processing. Every line required a line number, and control flow used `GOTO` and `GOSUB` to jump between them. Collections did not exist -- `DIM` arrays with manual size counters served as the only data structure.

```bbj
0010 dim items$[99]
0020 seterr 9000
0030 print "Enter name (blank to stop):"
0040 input name$
0050 if name$ = "" then goto 0080
0060 items$[count] = name$
0070 count = count + 1; goto 0030
0080 print "Done. ", count, " items entered."
0090 release
9000 print "Error: ", errmes(-1)
9010 release
```

**See also:** [Error handling legacy patterns](../error-handling/04-legacy-code) | [Collections legacy patterns](../collections/04-legacy-code)

## 2nd Generation: PRO/5 and Visual PRO/5 (1995--2002)

PRO/5 brought multi-platform support and, with Visual PRO/5, the first GUI capability through Windows-native widgets. Programs created GUI controls by printing mnemonics to a `SYSGUI` channel and used the `CALLBACK` verb (procedural form) along with `READ RECORD` polling loops for event handling.

```bbj
open(1)"X0"
print(1)'window'(100, 100, 300, 200, "My App", $$)
print(1)'button'(101, 10, 10, 80, 30, "Click Me", $$)
callback(1, 5000, 101, 1)
read record(1,siz=1)x$
release
5000 print "Button clicked!"
return
```

**See also:** [Event handling legacy patterns](../event-handling/03-legacy)

## 3rd Generation: Early BBj (2002--2006)

BBj introduced the Java runtime, giving programs access to Java classes with the `new` operator. However, without `use` imports or Custom Objects, code required fully-qualified class names everywhere. SQL access arrived via `SQLOPEN`, `SQLPREP`, and `SQLFETCH` verbs, and `MASK()` added regex support.

```bbj
map! = new java.util.HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
print "Name: ", map!.get("name")
```

**See also:** [Java interop legacy patterns](../java-interop/04-legacy-code) | [Database legacy patterns](../database-sql/04-legacy-code) | [String/number legacy patterns](../strings-and-numbers/04-legacy-code)

## 4th Generation: Modern BBj (2006--present)

BBj 6.0 introduced Custom Objects -- full class definitions with `class`/`classend`, `method`/`methodend`, `field` declarations, and the `use` keyword for imports. This is the current recommended style. Classes can extend Java classes and implement Java interfaces, and `setCallback` with method references replaced the procedural `CALLBACK` verb.

```bbj
use java.util.HashMap

class public Greeter
    field private HashMap config!

    method public Greeter(HashMap config!)
        #config! = config!
    methodend

    method public void greet(BBjString name$)
        print "Hello, ", name$, " from ", #config!.get("team")
    methodend
classend
```

**See also:** [File I/O legacy patterns](../file-io/04-legacy-code) | [Debugging legacy patterns](../debugging/04-legacy-code)

## Mixed-Generation Codebases

Most codebases you encounter will mix generations. A program might use 4th Gen class syntax but still contain 1st Gen `DIM` arrays or 2nd Gen `CALLBACK` verbs. The per-chapter legacy guides linked above show you exactly what each pattern looks like and its modern replacement.

When reading unfamiliar code, use this page as a decoder ring: identify the generation of the pattern you are looking at, then consult the relevant chapter guide for the modern equivalent.
