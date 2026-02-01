---
sidebar_position: 2
title: "Advanced Java Patterns"
---

# Advanced Java Patterns

Beyond basic usage, BBj can implement Java interfaces, handle Java exceptions gracefully, and access external libraries through classpath configuration. These patterns unlock the full power of the Java ecosystem from BBj code.

## Implementing Java Interfaces

BBj classes can implement Java interfaces using the `implements` keyword. This is the bridge between BBj code and Java APIs that expect callback objects, strategy patterns, or other interface-based contracts.

Here is a `Comparator` implementation that sorts strings by length:

```bbj
use java.util.Comparator
use java.util.Collections
use java.util.ArrayList

class public LengthComparator implements Comparator
    method public int compare(Object o1!, Object o2!)
        len1 = len(str(o1!))
        len2 = len(str(o2!))
        if len1 < len2 then methodret -1
        if len1 > len2 then methodret 1
        methodret 0
    methodend
classend

rem Create a list of strings
list! = new ArrayList()
list!.add("banana")
list!.add("fig")
list!.add("cherry")
list!.add("apple")

rem Sort using the BBj Comparator implementation
Collections.sort(list!, new LengthComparator())

rem Print sorted results
for i = 0 to list!.size() - 1
    print list!.get(i)
next i
rem Output: fig, apple, banana, cherry
```

The key points:

- The BBj class declares `implements Comparator`
- The method signature must match the Java interface exactly
- The BBj object can then be passed to any Java API expecting that interface
- Java calls back into your BBj code through the interface methods

## Generics: Raw Types Only

BBj does not support Java generics syntax. Always use raw types:

```bbj
use java.util.HashMap
use java.util.ArrayList

rem Correct -- raw types
map! = new HashMap()
list! = new ArrayList()
```

Attempting to use angle brackets causes a syntax error:

```bbj
rem WRONG -- this will NOT compile in BBj
rem map! = new HashMap<String, String>()
rem list! = new ArrayList<Integer>()
```

BBj resolves types at runtime, not at compile time. This means there is no compile-time type safety for Java generic types -- you are responsible for putting and getting consistent types. If you add a string to a list and then try to use the retrieved value as a number, you will get a runtime error, not a compile error.

## Handling Java Exceptions (Error 252)

When a Java method throws an exception, BBj traps it as **error 252**. You handle it with `ERR=` or `SETERR` -- BBj does not have try/catch blocks.

**Using SETERR:**

```bbj
use java.lang.Integer

seterr java_err

rem This will throw a NumberFormatException
value = Integer.parseInt("not_a_number")
print "Value: ", value
release

java_err:
    print "Error number: ", err
    ex! = BBjAPI().getLastJavaException()
    if ex! <> null() then
        print "Java exception: ", ex!.getMessage()
        print "Exception type: ", ex!.getClass().getName()
    fi
    release
```

**Using ERR= on a single statement:**

```bbj
use java.lang.Integer

value = Integer.parseInt("not_a_number", err=parse_failed)
print "Parsed: ", value
release

parse_failed:
    ex! = BBjAPI().getLastJavaException()
    print "Parse failed: ", ex!.getMessage()
    release
```

`BBjAPI().getLastJavaException()` returns the actual Java exception object, so you can call `.getMessage()`, `.getClass().getName()`, `.getCause()`, or any other Java exception method on it.

For the full error handling model including ERR=, SETERR, and error priority rules, see the [Error Handling chapter](/error-handling/patterns).

## Classpath Configuration

BBj's bundled classpath includes the standard JDK library and several third-party JARs (org.json, Gson, and more). When you need an external JAR beyond what BBj bundles:

1. **Open Enterprise Manager** and navigate to Java Settings
2. **Add the JAR path** to the classpath list (e.g., `/opt/libs/my-library.jar`)
3. **Restart BBjServices** for the change to take effect
4. **Use the classes** from that JAR in your BBj code:

```bbj
use com.example.MyLibrary

obj! = new MyLibrary()
result! = obj!.doSomething()
```

The classpath change applies to all BBj programs running on that BBjServices instance. For per-program classpath control, you can also set the classpath in the program's configuration within Enterprise Manager.

## Limitations Summary

| Limitation | Details |
|------------|---------|
| No generics syntax | Raw types only -- `HashMap`, not `HashMap<String, String>` |
| Runtime type resolution | No compile-time type checking for Java calls |
| Java exceptions become error 252 | Handle with ERR= or SETERR, inspect with `getLastJavaException()` |
| Object identity differences | Comparing object identity across the BBj/Java boundary can produce unexpected results |

<details>
<summary>Reading Legacy Code: Pre-Use Import Patterns</summary>

Before the `use` statement was added to BBj, all Java classes required fully qualified names on every reference:

```bbj
rem Legacy style -- no use statement available
map! = new java.util.HashMap()
map!.put("key", "value")

iter! = map!.keySet().iterator()
while iter!.hasNext()
    key! = iter!.next()
    print key!, " = ", map!.get(key!)
wend
```

Some very old programs may also use `ADDR()` and `CALL` for Java method invocation -- a lower-level approach that predates the direct method call syntax. Modern BBj code should always use `use` statements and direct method calls.

</details>

:::tip Further Reading
- [BBj Object Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/error_handling.htm) -- Error handling patterns in BBj object programs
- [BBjAPI::getLastJavaException](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/bbjapi/BBjAPI_getLastBBjException.htm) -- Retrieving Java exception details from BBj
- [Custom Objects Tutorial: Program #6](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_12program6.htm) -- Interface implementation and callback patterns
:::
