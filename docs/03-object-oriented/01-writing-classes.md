---
sidebar_position: 1
title: "Writing Your Own Classes"
---

# Writing Your Own Classes

BBj provides full object-oriented class syntax including inheritance, interfaces, and constructors. If you know OOP from Java or C#, the concepts transfer directly -- the syntax is different.

Key differences up front:

- **Block delimiters**: `classend`, `methodend` instead of curly braces
- **Field declarations**: The `field` keyword is required
- **Variable suffixes**: `$` for strings, `%` for integers, `!` for objects
- **Multiple classes per file**: Allowed but discouraged
- **Java interop**: BBj classes can extend Java classes and implement Java interfaces

## Class Definition

A BBj class uses `class`/`classend` blocks with `field` for data and `method`/`methodend` for behavior:

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
- Add `static` keyword for static methods
- Methods can be overloaded with different parameter signatures

### Creating Objects

```bbj
declare MyClass obj!
obj! = new MyClass()
obj!.sayHello("World")
```

The `declare` statement is optional but recommended -- it enables IDE autocomplete and compile-time checking.

<details>
<summary>Watch the video: A First Class in BBj</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/Yyilg_zJ4wc" title="A First Class in BBj" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

For full syntax details, see the documentation for the [CLASS verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/class_verb.htm) and the [METHOD verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/method_verb.htm).

## Constructors

Constructors have the same name as the class and no return type. They run automatically when an object is created with `new`:

```bbj
class public Person
    field public BBjString Name$
    field public BBjNumber Age%

    method public Person(BBjString name$, BBjNumber age%)
        #Name$ = name$
        #Age% = age%
    methodend

    method public void describe()
        print #Name$, ", age ", str(#Age%)
    methodend
classend

declare Person p!
p! = new Person("Alice", 30)
p!.describe()
```

The `#` prefix refers to the current object's fields (equivalent to `this.` in Java).

## Inheritance

BBj supports single inheritance with the `extends` keyword. A subclass inherits all public and protected fields and methods from its parent:

```bbj
class public Vehicle
    field public BBjString Make$
    field public BBjNumber Year%

    method public void describe()
        print "Vehicle: ", #Make$, " (", str(#Year%), ")"
    methodend
classend

class public Car extends Vehicle
    field public BBjNumber Doors%

    method public void describe()
        print "Car: ", #Make$, " (", str(#Year%), "), ", str(#Doors%), " doors"
    methodend
classend
```

The `Car` class overrides `describe()` to include door count while inheriting `Make$` and `Year%` from `Vehicle`. BBj uses the most specific version of a method when called on an object (standard polymorphism).

BBj classes can also extend Java classes. This is covered in [Using Java Classes from BBj](./using-java).

## Interfaces

Interfaces define a contract that implementing classes must fulfill. BBj interfaces use `interface`/`interfaceend` blocks:

```bbj
interface public Describable
    method public BBjString getDescription()
interfaceend

class public Product implements Describable
    field public BBjString Name$
    field public BBjNumber Price

    method public BBjString getDescription()
        methodret #Name$ + " ($" + str(#Price) + ")"
    methodend
classend
```

A BBj class can also implement Java interfaces. This is the primary mechanism for integrating BBj code with Java frameworks that expect interface implementations:

```bbj
use java.util.Comparator

class public NameComparator implements Comparator
    method public int compare(Object o1!, Object o2!)
        methodret str(o1!).compareTo(str(o2!))
    methodend
classend
```

Since BBj 21.00, interfaces support default method bodies, aligning with Java 8+ default methods. See the [INTERFACE verb documentation](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/interface_verb.htm) for full details.

## Referencing Classes from Other Files

When classes are defined in separate `.bbj` files, use the `use` verb with the `::` syntax to reference them:

```bbj
use ::Car.bbj::Car
use ::Car.bbj::FlyingCar

declare Car myCar!
myCar! = new Car()
```

The syntax is `use ::filename::classname`. This makes the class available in the current program without copying the definition.

<details>
<summary>Watch the video: Referencing Classes from Other Programs</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/aN518WzvIOQ" title="Reference Classes from Other Programs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

## Practical Example: An Object-Oriented Dialog

A common pattern in BBj applications is wrapping a dialog window in a class. The dialog encapsulates its window, controls, and event handling, exposing only a clean interface to the caller:

<details>
<summary>Watch the video: An Object-Oriented Dialog</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/z3g51m9Mc_0" title="An Object Oriented Dialog" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>

The video demonstrates building a dialog class that:

1. Creates a window with input fields
2. Takes user input and returns it to the calling program
3. Separates the dialog logic from the main application

**Exercise:** Download the dialog example files and modify the dialog class to add a third input field. Update both the dialog class and the calling program to handle the new field.

## Additional Notes

- Since BBj 21.00, class bodies are cross-compiled to Java bytecode for better performance and reflection support.
- For a step-by-step walkthrough of all class features, see the [Custom Objects Tutorial](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_01intro.htm).
