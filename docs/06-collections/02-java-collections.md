---
sidebar_position: 2
title: "Java Collections"
---

# Java Collections

BBj runs on the JVM and gives you direct access to the entire Java Collections Framework. For key-value storage, use `java.util.HashMap`. For a Java-native dynamic list alternative to BBjVector, use `java.util.ArrayList`. The usage patterns are identical to Java itself -- `use` the class, instantiate it with `new`, and call methods normally.

## java.util.HashMap

HashMap is the standard choice for key-value storage in BBj. Create one, populate it with `put()`, and retrieve values with `get()`:

```bbj
use java.util.HashMap

map! = new HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
map!.put("team", "Platform")

print "Name: ", map!.get("name")
print "Role: ", map!.get("role")
```

`get()` returns `null()` if the key does not exist. Use `containsKey()` to check before accessing, or handle the null return.

## Iterating a HashMap

HashMap does not guarantee iteration order. To walk all entries, use the `keySet().iterator()` pattern:

```bbj
use java.util.HashMap
use java.util.Iterator

map! = new HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
map!.put("team", "Platform")

rem Iterate using keySet().iterator()
iter! = map!.keySet().iterator()
while iter!.hasNext()
    key! = iter!.next()
    print key!, " = ", map!.get(key!)
wend
```

This is the standard Java iterator pattern. `keySet()` returns a Set of all keys, and `iterator()` gives you a one-pass traversal. Call `hasNext()` to check for remaining items, and `next()` to advance.

## java.util.ArrayList

ArrayList is Java's resizable list. It works similarly to BBjVector, and is useful when interacting with Java libraries that expect standard Java collection types:

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

The API mirrors BBjVector: `add()` appends, `get()` retrieves by index, `size()` returns the count.

## When to Use Which

| Scenario | Use |
|----------|-----|
| Dynamic list for BBjAPI methods | BBjVector |
| Dynamic list for Java library interop | ArrayList |
| Key-value pairs (any scenario) | HashMap |
| Fixed-size typed data | DIM array |

BBjVector is the default choice for lists in BBj code -- it integrates with BBjAPI methods that expect BBjVector parameters. Use ArrayList when you need to pass a list to a Java library that does not accept BBjVector, or when working in a purely Java-oriented context.

## Why Not BBjHashMap?

Older BBj code may use `BBjHashMap` for key-value storage. In BBj 20.10, `BBjHashMap` was renamed to `BBjspHashMap` and restricted to the BBJSP (server pages) subsystem. It is deprecated for general use.

Use `java.util.HashMap` instead. It provides the same functionality, is well-documented, and is the standard across the Java ecosystem.

For broader context on using Java classes from BBj, see [Using Java Classes from BBj](/object-oriented/using-java).

<details>
<summary>Reading Legacy Code: BBjHashMap</summary>

Code written before BBj 20.10 may use `BBjHashMap` for key-value storage. This class was renamed to `BBjspHashMap` and is now restricted to the BBJSP subsystem. If you encounter `BBjHashMap` in legacy code:

- It functions similarly to `java.util.HashMap`
- Consider migrating to `java.util.HashMap` during maintenance
- The API differences are minimal -- `put()`, `get()`, and `remove()` work the same way

</details>

:::tip Further Reading
- [Calling Java from BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/calling_java_from_bbj.htm) -- general Java interop guide
- [Types in BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/types_in_bbj.htm) -- how BBj handles Java types and casting
:::
