# Introduction to Object Oriented Syntax in BBj

## What is Object Oriented Programming?

If you know Object Orientation from other programming languages, you already know: Object Orientation tries to find a way to combine data with the code that works on the data.

This course does not explain much more than that but rather assumes that you know about Object Orientation from other programming languages. On a side note, you are not forced to use Object Orientation with BBj. Feel free to write programs in the scripted, procedural fashion the language offers.

For a comprehensive tutorial, see the official [Custom Objects Tutorial](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_01intro.htm) in the BASIS documentation.

## Quick Syntax Reference

If you're coming from Java or another OO language, here's how BBj syntax maps to familiar concepts:

### Class Definition

```bbj
class public MyClass extends ParentClass implements MyInterface
    field public BBjString Name$
    field private BBjNumber count%

    method public void sayHello(BBjString name$)
        print "Hello, ", name$
    methodend
classend
```

### Access Modifiers

| Modifier | Meaning |
|----------|---------|
| `public` | Accessible from anywhere |
| `private` | Only visible within the same file |
| `protected` | Accessible within the same directory (BBj 21.0+) |

### Methods

```bbj
method public BBjNumber calculateTotal(BBjNumber price, BBjNumber qty%)
    methodret price * qty%
methodend
```

- Use `methodret` to return a value (similar to `return`)
- Constructors have the same name as the class and no return type
- Add `static` keyword for static methods

### Creating Objects

```bbj
declare MyClass obj!
obj! = new MyClass()
obj!.sayHello("World")
```

### Key Differences from Java

- **Block delimiters**: Use `classend`, `methodend` instead of curly braces
- **Field declarations**: Use `field` keyword, not just the type
- **Variable suffixes**: `$` for strings, `%` for integers, `!` for objects
- **Multiple classes per file**: Allowed but discouraged
- **Java interop**: BBj classes can extend Java classes and implement Java interfaces

## General OOP Resources

If you need to refresh your OOP knowledge:

- [Wikipedia: Object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming)
- [GeeksforGeeks: Introduction to OOP](https://www.geeksforgeeks.org/introduction-of-object-oriented-programming/)

## A first Class in BBj

The video shows how to write a first class in BBj. It illustrates the syntax and object oriented code blocks:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Yyilg_zJ4wc" title="A First Class in BBj" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

After watching it, visit this [documentation page for the CLASS Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/class_verb.htm) in BBj and see another example.

What other verbs would you need for object orientation? Look them up in the documentation.

## Reference Classes from Other Programs

To reference other classes, we use the `USE` verb, like we did in the earlier chapter for referencing a Java type.

<iframe width="560" height="315" src="https://www.youtube.com/embed/aN518WzvIOQ" title="Reference Classes from Other Programs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In the `CarApplication.bbj` we use:
```bbj
use ::Car.bbj::Car
use ::Car.bbj::FlyingCar
```

to reference the Car and FlyingCar classes in the original file.

## An Object Oriented Dialog

Now it's time to write our first graphical object oriented program in BBj. We develop a small dialog to take user input and return it to the calling program:

Watch the video about how it's developed:

<iframe width="560" height="315" src="https://www.youtube.com/embed/z3g51m9Mc_0" title="An Object Oriented Dialog" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In the files section you find a ZIP file which contains the three programs from this chapter. Load the `MyDialog.bbj` program into your IDE and examine it. Can you improve it?

## Additional Documentation and Random Useful Hints

Besides the documentation for the relevant verbs (`CLASS`, `FIELD`, `INTERFACE`, `METHOD`, `EXTENDS`, `IMPLEMENTS`) there is a somewhat dated PDF document that you still might find useful. It's a tutorial that was created when the language received its Object Oriented capabilities.

### Some more random hints you might find useful:

- BBj classes can also extend Java classes and implement Java interfaces.
- Since BBj 21.00, BBj classes support reflection. From that version on their bodies get cross-compiled in Java classes for better performance.
- If you are faced with a task to upgrade Object Oriented BBj code from older versions, this document might be a useful read.
