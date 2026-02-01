---
sidebar_position: 1
title: "Collections"
---

# Collections

BBj gives you two families of collections: its own BBjVector (a dynamic list created through BBjAPI) and direct access to the entire Java Collections Framework. For dynamic lists, BBjVector is the BBj-native choice. For key-value storage, use `java.util.HashMap` directly -- BBjHashMap is deprecated.

## At a Glance

| Collection | Creation | Use Case |
|------------|----------|----------|
| BBjVector | `BBjAPI().makeVector()` | Dynamic list (BBj native) |
| java.util.HashMap | `new HashMap()` | Key-value pairs |
| java.util.ArrayList | `new ArrayList()` | Dynamic list (Java native) |
| DIM array | `dim a$[10]` | Fixed-size typed array |
| VECTOR() | `vector(array[])` | Convert DIM array to BBjVector |

## For Java, Python, and C# Developers

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Create list | `new ArrayList()` | `[]` | `new List<T>()` | `BBjAPI().makeVector()` |
| Add item | `list.add(item)` | `list.append(item)` | `list.Add(item)` | `vec!.add(item)` |
| Get by index | `list.get(i)` | `list[i]` | `list[i]` | `vec!.get(i)` |
| Iterate list | `for (var x : list)` | `for x in list:` | `foreach (var x in list)` | `for i=0 to vec!.size()-1 ... next i` |
| Create map | `new HashMap()` | `{}` | `new Dictionary<K,V>()` | `new HashMap()` (Java) |
| Get by key | `map.get(k)` | `d[k]` | `d[k]` | `map!.get(k)` |
| Check contains | `map.containsKey(k)` | `k in d` | `d.ContainsKey(k)` | `map!.containsKey(k)` |
| Collection size | `list.size()` | `len(list)` | `list.Count` | `vec!.size()` |

BBj uses `BBjVector` for ordered lists and `java.util.HashMap` for key-value maps. Since BBj runs on the JVM, you can use Java collection classes directly. For the complete cross-language reference, see [BBj for Java, Python, and C# Developers](/introduction/translation-tables).

:::tip[Complete Runnable Examples]
This chapter's code snippets illustrate individual concepts. For complete, runnable programs you can open directly in the BBj IDE, see the sample files in [`samples/06-collections/`](https://github.com/BasisHub/BBj-Beginner-Course/tree/master/samples/06-collections):

- `bbjvector_basics.bbj` -- BBjVector creation, adding items, and iteration
- `arraylist_usage.bbj` -- java.util.ArrayList creation and iteration
- `hashmap_iterator.bbj` -- java.util.HashMap with keySet().iterator()
- `array_to_vector.bbj` -- DIM array to BBjVector conversion with VECTOR()

See [Running Samples](/samples) for setup instructions.
:::
