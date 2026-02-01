---
sidebar_position: 2
title: "Using Java Classes from BBj"
---

# Using Java Classes from BBj

One of BBj's core strengths is direct access to any Java class. BBj runs on the JVM, and Java interop is a daily-use capability, not an edge case. You can instantiate Java objects, call their methods, and pass them around exactly as you would BBj objects.

## Importing Java Classes

There are two ways to reference Java classes in BBj.

**With `use` (recommended):**

```bbj
use java.util.HashMap
use java.util.ArrayList

map! = new HashMap()
list! = new ArrayList()
```

The `use` statement imports the class so you can reference it by short name throughout the program.

**Fully qualified (inline):**

```bbj
map! = new java.util.HashMap()
```

This works without a `use` statement but becomes verbose when the same class appears multiple times.

## HashMap and Iterator

Java's `HashMap` is one of the most commonly used Java classes in BBj code. It provides key-value storage with fast lookups:

```bbj
use java.util.HashMap
use java.util.Iterator

map! = new HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
map!.put("team", "Platform")

rem Iterate over all entries
iter! = map!.keySet().iterator()
while iter!.hasNext()
    key! = iter!.next()
    print key!, " = ", map!.get(key!)
wend
```

The pattern is: create the map, populate it with `put()`, then iterate using `keySet().iterator()`. This is standard Java collection usage -- the same API you would use in Java itself.

## Other Common Java Classes

**ArrayList** -- a resizable list (alternative to BBjVector):

```bbj
use java.util.ArrayList

list! = new ArrayList()
list!.add("first")
list!.add("second")
list!.add("third")

for i = 0 to list!.size() - 1
    print list!.get(i)
next i
```

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
print fmt!.format(new Date())
```

Any class available on the JVM classpath is accessible from BBj using these patterns.

## BBj Classes Implementing Java Interfaces

BBj classes can implement Java interfaces, which is how BBj integrates with Java frameworks that expect interface implementations. This is the bridge between BBj code and Java APIs that use callback patterns or strategy objects:

```bbj
use java.util.Comparator

class public NameComparator implements Comparator
    method public int compare(Object o1!, Object o2!)
        methodret str(o1!).compareTo(str(o2!))
    methodend
classend
```

This `NameComparator` can be passed to any Java method that accepts a `Comparator`, such as `Collections.sort()`. The Java framework calls back into your BBj code through the interface.

## Limitations to Know

**No generics syntax.** You write `HashMap`, not `HashMap<String, String>`. Types are resolved at runtime. This means no compile-time type safety across the Java boundary -- you are responsible for putting and getting consistent types.

**Runtime interpretation.** BBj interprets Java objects at runtime. There is no compile-time type checking when you call methods on Java objects. If you call a method that does not exist, you get a runtime error, not a compile error.

**Java exceptions become BBj errors.** When a Java method throws an exception, BBj converts it to a BBj error. Handle these with `SETERR` or `ERR=` branching (covered in the Error Handling chapter), or with `try`/`catch` blocks:

```bbj
use java.util.HashMap

map! = new HashMap()
try
    value! = map!.get("missing_key")
    rem get() returns null for missing keys, no exception
    rem but other operations may throw
catch (Exception e!)
    print "Java exception: ", e!.getMessage()
endtry
```

**Object identity.** BBj objects and Java objects are distinct types at the runtime level. When passing BBj objects to Java methods, they are wrapped automatically, but comparing object identity across the boundary can produce unexpected results.

## Further Reading

- [Types in BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/types_in_bbj.htm) -- how BBj handles Java types, casting, and type resolution
- [Custom Objects Tutorial](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_01intro.htm) -- includes Java interop examples in later chapters
