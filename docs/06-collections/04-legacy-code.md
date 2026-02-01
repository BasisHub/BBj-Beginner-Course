---
sidebar_position: 99
title: "Reading Legacy Code"
description: "Recognize and understand legacy collection patterns in older BBj codebases"
---

# Reading Legacy Code: Collections

You will encounter these patterns in older BBj codebases. Each section shows the legacy approach and its modern equivalent.

### DIM Arrays as Collections

You may see this in 1st Gen (BBx) code:

```bbj
rem Legacy: oversized DIM array as dynamic list
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

The modern equivalent:

```bbj
rem Modern: BBjVector
vect! = BBjAPI().makeVector()
vect!.addItem("first")
vect!.addItem("second")

for i = 0 to vect!.size() - 1
    print vect!.getItem(i)
next i
```

Before BBj, `DIM` arrays were the only data structure available. Programs allocated oversized arrays (often `dim a$[999]` or larger) and tracked the actual count in a separate variable. BBjVector was introduced with BBj and eliminates this workaround -- it grows automatically, tracks its own size, and implements `java.util.List`.

### BBjHashMap (Deprecated)

You may see this in 3rd Gen (Early BBj) code:

```bbj
rem Legacy: BBjHashMap
map! = BBjAPI().makeHashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
print map!.get("name")
```

The modern equivalent:

```bbj
rem Modern: java.util.HashMap
use java.util.HashMap

map! = new HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
print map!.get("name")
```

`BBjHashMap` was renamed to `BBjspHashMap` in BBj 20.10 and restricted to the BBJSP (server pages) subsystem. It is deprecated for general use. The API differences are minimal -- `put()`, `get()`, and `remove()` work the same way in both. Use `java.util.HashMap` for all new code.

### REDIM for Array Resizing

You may see this in 1st Gen and 2nd Gen code:

```bbj
rem Legacy: REDIM to grow an array
dim names$[9]
names$[0] = "Alice"
names$[1] = "Bob"

rem Need more space -- REDIM preserves existing data
redim names$[19]
names$[10] = "Charlie"
```

The modern equivalent:

```bbj
rem Modern: BBjVector grows automatically
vect! = BBjAPI().makeVector()
vect!.addItem("Alice")
vect!.addItem("Bob")
vect!.addItem("Charlie")
rem No resizing needed -- vector grows on demand
```

`REDIM` resizes an existing `DIM` array while preserving its contents. This was the only way to grow a data structure before BBjVector existed. The pattern is error-prone because the programmer must decide when and by how much to resize. BBjVector handles growth automatically.

### Parallel Arrays

You may see this in 1st Gen (BBx) code:

```bbj
rem Legacy: parallel DIM arrays for key-value pairs
dim keys$[99]
dim vals$[99]
count = 0

keys$[count] = "name"; vals$[count] = "Alice"; count = count + 1
keys$[count] = "role"; vals$[count] = "Developer"; count = count + 1

rem Lookup by key
for i = 0 to count - 1
    if keys$[i] = "name" then print "Found: ", vals$[i]; break
next i
```

The modern equivalent:

```bbj
rem Modern: java.util.HashMap
use java.util.HashMap

map! = new HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")

print "Found: ", map!.get("name")
```

Without a map data structure, BBx programs used two synchronized `DIM` arrays -- one for keys, one for values -- to simulate key-value storage. Lookups required a linear scan through the keys array. `java.util.HashMap` provides constant-time lookup and eliminates the risk of the two arrays getting out of sync.
