---
sidebar_position: 3
title: "Arrays and Conversion"
---

# Arrays and Conversion

DIM arrays are BBj's fixed-size, typed arrays -- they have been part of the language since the original Business BASIC. BBj provides the `VECTOR()` function to convert arrays into BBjVectors, bridging legacy array code with modern collection APIs.

## DIM Arrays

BBj arrays are declared with `DIM` and have a fixed size set at creation. String arrays use the `$` suffix, numeric arrays do not:

```bbj
rem String array (3 elements: index 0, 1, 2)
dim names$[2]

rem Numeric array (6 elements: index 0 through 5)
dim values[5]
```

Arrays are 0-based. The dimension number is the highest valid index, so `dim a$[2]` creates 3 elements (indexes 0, 1, 2).

## Populating and Accessing

Set values by index and read them with a `for` loop:

```bbj
dim names$[2]
names$[0] = "Alice"
names$[1] = "Bob"
names$[2] = "Charlie"

for i = 0 to 2
    print names$[i]
next i
```

Accessing an index outside the declared range causes a runtime error. Unlike BBjVector, DIM arrays cannot grow after creation.

## Converting Arrays to BBjVector

The `VECTOR()` function converts a DIM array into a BBjVector. This is useful when you have array data that needs to be passed to methods expecting a BBjVector or java.util.List:

```bbj
dim names$[2]
names$[0] = "Alice"
names$[1] = "Bob"
names$[2] = "Charlie"

rem Convert to BBjVector (BBj 16.0+)
vect! = vector(names$[])
print "Vector size: ", vect!.size()

for i = 0 to vect!.size() - 1
    print vect!.getItem(i)
next i
```

The `VECTOR()` function was added in BBj 16.0. The syntax is `vector(array[])` -- note the empty brackets after the array name. The resulting BBjVector is a copy; changes to the vector do not affect the original array.

## Comparison Table

| Collection | Size | Types | Best For |
|------------|------|-------|----------|
| DIM array | Fixed | Single type | Known-size data, performance-critical loops |
| BBjVector | Dynamic | Mixed | General-purpose, BBjAPI integration |
| java.util.ArrayList | Dynamic | Mixed | Java library interop |
| java.util.HashMap | Dynamic | Key-value | Lookup tables, configuration |

DIM arrays are fastest for simple indexed access. BBjVector is the default for most BBj work. Use Java collections when working with Java libraries or when you need key-value storage.

## A Note on String Templates

BBj also supports string templates -- structured record definitions that overlay a string variable. They are used extensively in file I/O to define record layouts:

```bbj
dim a$:tmpl$
```

String templates are covered in detail in the [File I/O and Record Access](/file-io) chapter.

<details>
<summary>Reading Legacy Code: DIM Arrays as Collections</summary>

Before BBjVector existed, all dynamic data had to be stored in oversized DIM arrays with a manual size counter:

```bbj
rem Legacy pattern: oversized array as "collection"
dim items$[999]
count = 0

rem Add items
items$[count] = "first"
count = count + 1
items$[count] = "second"
count = count + 1

rem Iterate
for i = 0 to count - 1
    print items$[i]
next i
```

Other legacy patterns you may encounter:

- **REDIM** to resize arrays (available in some BBx dialects)
- **String templates** (`dim a$:tmpl$`) used as pseudo-records for structured data
- **VECTOR() function** (BBj 16.0+) bridges this gap -- convert legacy arrays to BBjVector without rewriting the population logic

</details>

:::tip Further Reading
- [VECTOR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/VECTOR()_Function_Convert_Array_to_Vector.htm) -- official reference
- [Working with Java Arrays](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/Working_with_Java_Arrays.htm) -- passing arrays between BBj and Java
:::
