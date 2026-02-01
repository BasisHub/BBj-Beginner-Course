---
sidebar_position: 1
title: "Java Interop"
---

# Java Interop

BBj runs on the JVM and gives you direct access to any Java class. You can create Java objects, call their methods, implement Java interfaces in BBj classes, and use the full standard library plus any JAR on the classpath. BBj 25 requires Java 21, so all modern Java APIs are available.

## At a Glance

| Feature | Syntax | Purpose |
|---------|--------|---------|
| Import class | `use java.util.HashMap` | Reference class by short name |
| Create object | `obj! = new HashMap()` | Instantiate Java class |
| Call method | `obj!.put("key", "value")` | Invoke Java method |
| Implement interface | `class public X implements Comparator` | BBj class implements Java interface |
| Handle exception | `value! = obj!.method(ERR=handler)` | Catch Java exceptions as BBj errors |
| Get exception | `BBjAPI().getLastJavaException()` | Inspect the Java exception object |

This chapter covers three tiers: **basics** (importing and using Java classes), **advanced patterns** (interfaces, generics, classpath configuration), and **practical libraries** (JSON, HTTP, hashing, and more).
