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

## For Java, Python, and C# Developers

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Import class | `import java.util.HashMap;` | `from collections import OrderedDict` | `using System.Collections;` | `use java.util.HashMap` |
| Create instance | `new HashMap()` | `OrderedDict()` | `new Dictionary()` | `new HashMap()` |
| Call method | `obj.put("k", "v")` | `obj.update({"k": "v"})` | `obj.Add("k", "v")` | `obj!.put("k", "v")` |
| Implement interface | `class X implements Y` | `class X(Y):` | `class X : Y` | `class public X implements Y` |
| Cast object | `(String) obj` | N/A (duck typing) | `(string) obj` | `cast(String, obj!)` |
| Get Java exception | N/A (native) | N/A | N/A | `BBjAPI().getLastJavaException()` |

Since BBj runs on the JVM, you use Java classes directly -- no bridge or FFI layer needed. `use` statements work like Java imports, and `new` creates Java objects the same way. For the complete cross-language reference, see [BBj for Java, Python, and C# Developers](/introduction/translation-tables).
