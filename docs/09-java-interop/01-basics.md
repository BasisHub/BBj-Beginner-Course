---
sidebar_position: 1
title: "Java Basics from BBj"
---

# Java Basics from BBj

BBj's Java interop starts with the `use` statement for imports and the `new` keyword for object creation. If you have used Java, the syntax will feel familiar -- with a few BBj-specific differences around type handling and error reporting.

## Importing Java Classes

There are two ways to reference Java classes in BBj.

**With `use` (recommended):**

```bbj
use java.util.HashMap
use java.util.ArrayList

map! = new HashMap()
list! = new ArrayList()
```

The `use` statement imports the class so you can reference it by short name throughout the program. Place `use` statements at the top of your file, before any executable code.

**Fully qualified (inline):**

```bbj
map! = new java.util.HashMap()
```

This works without a `use` statement but becomes verbose when the same class appears multiple times.

## Creating Objects and Calling Methods

Java's `HashMap` is one of the most commonly used Java classes in BBj code. It provides key-value storage with fast lookups:

```bbj
use java.util.HashMap
use java.util.Iterator

map! = new HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
map!.put("team", "Platform")

rem Retrieve a value by key
print "Name: ", map!.get("name")
print "Size: ", map!.size()

rem Iterate over all entries
iter! = map!.keySet().iterator()
while iter!.hasNext()
    key! = iter!.next()
    print key!, " = ", map!.get(key!)
wend
```

The pattern is: create the map, populate it with `put()`, retrieve with `get()`, and iterate using `keySet().iterator()`. This is standard Java collection usage -- the same API you would use in Java itself.

**ArrayList** -- a resizable list:

```bbj
use java.util.ArrayList

list! = new ArrayList()
list!.add("first")
list!.add("second")
list!.add("third")

rem Access by index
print "First item: ", list!.get(0)
print "Size: ", list!.size()

rem Iterate with a for loop
for i = 0 to list!.size() - 1
    print list!.get(i)
next i
```

## Other Common Java Classes

**File** -- file path manipulation and existence checks:

```bbj
use java.io.File

f! = new File("/path/to/file.txt")
if f!.exists() then print "File exists, size: ", str(f!.length()), " bytes"
```

**SimpleDateFormat** -- date formatting:

```bbj
use java.text.SimpleDateFormat
use java.util.Date

fmt! = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
print "Current time: ", fmt!.format(new Date())
```

**Date** -- working with dates:

```bbj
use java.util.Date

now! = new Date()
print "Milliseconds since epoch: ", str(now!.getTime())
```

Any class available on the JVM classpath is accessible from BBj using these patterns.

## Type Mapping Between BBj and Java

BBj handles type conversion automatically across the BBj-Java boundary for most common types:

| BBj Type | Java Type | Notes |
|----------|-----------|-------|
| BBj string (`$` suffix) | `java.lang.String` | Automatic conversion both ways |
| BBj number (no suffix) | Java numeric types (`int`, `double`, etc.) | Automatic for most cases |
| `null()` | `null` | BBj's null literal maps to Java null |
| Object reference (`!` suffix) | Java object | BBj object variables hold Java objects directly |

When automatic conversion is not sufficient, use the `cast()` function for explicit type casting:

```bbj
use java.net.HttpURLConnection
use java.net.URL

url! = new URL("https://example.com")
conn! = cast(HttpURLConnection, url!.openConnection())
```

The `cast()` function tells BBj to treat the return value as a specific type. This is necessary when a Java method returns a supertype (like `URLConnection`) but you need to call methods defined on a subtype (like `HttpURLConnection`).

## The `!` Suffix Convention

BBj variables that hold object references use the `!` suffix. This is not optional for Java objects -- it is enforced by the interpreter:

```bbj
use java.util.HashMap

map! = new HashMap()       : rem correct -- object reference
rem map = new HashMap()    : rem WRONG -- would cause an error
```

The `!` suffix tells BBj that this variable holds an object reference (either a BBj custom object or a Java object). Variables without `!` hold primitive values (strings with `$`, numbers with no suffix).

For more on BBj's class syntax, constructors, and methods, see the [Object-Oriented Programming chapter](/object-oriented).

<details>
<summary>Reading Legacy Code: Java Interop Before Custom Objects</summary>

Before BBj Custom Objects were introduced, Java interop was limited to creating Java objects and calling methods procedurally. There was no `class` keyword and no `use` statement in early BBj versions:

```bbj
rem Legacy style -- fully qualified class names everywhere
map! = new java.util.HashMap()
map!.put("key", "value")

rem All code was procedural with labels and GOSUBs
rem No class definitions, no methods, no encapsulation
gosub process_data
release

process_data:
    print map!.get("key")
return
```

You may encounter this style in older codebases. The Java API calls are the same -- only the program structure around them differs.

</details>

:::tip Further Reading
- [Types in BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/types_in_bbj.htm) -- how BBj handles Java types, casting, and type resolution
- [Calling Java from BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/calling_java_from_bbj.htm) -- official reference for Java interop
- [Custom Objects Tutorial](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_01intro.htm) -- includes Java interop examples in later chapters
:::
