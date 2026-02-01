---
sidebar_position: 1
title: "BBjVector"
---

# BBjVector

BBjVector is the BBj-native dynamic list. You create one through `BBjAPI().makeVector()`, and it grows automatically as you add items. It also implements `java.util.List`, so you can pass it to Java methods that expect a List.

## Creating and Populating

```bbj
vect! = BBjAPI().makeVector()
vect!.addItem("alpha")
vect!.addItem("beta")
vect!.addItem("gamma")
print "Size: ", vect!.size()
```

`makeVector()` returns an empty BBjVector. Use `addItem()` to append, `getItem()` to read by index, and `size()` to get the count. All indexes are 0-based.

## Core Methods

| Method | Syntax | Description |
|--------|--------|-------------|
| addItem | `vect!.addItem(value)` | Append to end |
| insertItem | `vect!.insertItem(index, value)` | Insert at position |
| getItem | `vect!.getItem(index)` | Get by index |
| setItem | `vect!.setItem(index, value)` | Replace at index |
| removeItem | `vect!.removeItem(index)` | Remove by index |
| size | `vect!.size()` | Item count |
| clear | `vect!.clear()` | Remove all items |

## Iterating a BBjVector

The standard pattern is a `for` loop from 0 to `size() - 1`:

```bbj
vect! = BBjAPI().makeVector()
vect!.addItem("alpha")
vect!.addItem("beta")
vect!.addItem("gamma")

for i = 0 to vect!.size() - 1
    print vect!.getItem(i)
next i
```

This prints each item in order. You can also use the Java `Iterator` interface, but the `for` loop is the most common pattern in BBj code.

## BBjVector as java.util.List

BBjVector implements `java.util.Collection` and `java.util.List`. This means you can use standard Java list methods alongside BBjVector's own methods:

```bbj
vect! = BBjAPI().makeVector()
vect!.addItem("alpha")
vect!.addItem("beta")

rem Java List methods also work
vect!.add("gamma")
print "Contains alpha: ", vect!.contains("alpha")
print "Index of beta: ", vect!.indexOf("beta")
```

This dual interface is useful when passing BBjVectors to Java library methods that accept a `List` parameter.

## contains() Type Sensitivity

BBjVector's `contains()` method uses Java's `.equals()` under the hood, which is type-sensitive. A common gotcha occurs when mixing numeric types:

```bbj
vect! = BBjAPI().makeVector()
vect!.addItem(42)

rem This may not find the item if the type does not match exactly
rem Use str() to normalize when searching for user-provided values
print "Contains 42: ", vect!.contains(42)
```

If you are building a vector from user input or mixed sources, be consistent about the types you store. When in doubt, store and search as strings using `str()`.

:::tip[Reading Legacy Code]
See [Reading Legacy Code](./legacy-code) for DIM-as-collection, `REDIM`, parallel arrays, and other historical collection patterns.
:::

:::tip Further Reading
- [BBjVector Methods](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/API/bbjvector/bbjvector.htm) -- full method reference
- [VECTOR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/VECTOR()_Function_Convert_Array_to_Vector.htm) -- convert DIM arrays to BBjVector
:::
