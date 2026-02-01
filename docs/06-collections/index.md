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
