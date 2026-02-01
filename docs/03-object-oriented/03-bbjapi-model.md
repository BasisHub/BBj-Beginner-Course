---
sidebar_position: 3
title: "The BBjAPI Object Model"
---

# The BBjAPI Object Model

`BBjAPI()` is the entry point for nearly everything you do in BBj beyond basic language operations. It is a factory and registry for GUI controls, collections, namespaces, file utilities, and system services. Understanding what it provides and how to navigate it is essential.

Unlike the classes you write yourself or the Java classes you import, the BBjAPI object model is built into the BBj runtime. You do not instantiate it -- you call `BBjAPI()` to get the singleton entry point, then use its methods to access specific subsystems.

## Getting Started with BBjAPI()

```bbj
rem BBjAPI() is the entry point for all BBj built-in objects
api! = BBjAPI()

rem GUI: Open a SysGui context and create windows
sysgui! = api!.openSysGui("X0")
wnd! = sysgui!.addWindow(10, 10, 400, 300, "My Window")

rem Collections: Create vectors (dynamic arrays)
vect! = api!.makeVector()
vect!.addItem("item1")
vect!.addItem("item2")

rem Namespaces: Share data between programs
ns! = api!.getNamespace("myApp", "shared", 1)
ns!.setValue("key", "value")
```

Each call to a `BBjAPI()` method returns a specialized object with its own methods. The pattern is always: get the entry point, then navigate to the subsystem you need.

## Main Object Families

The BBjAPI provides access to these major subsystems:

| Family | Entry Method | Purpose |
|--------|-------------|---------|
| **SysGui / GUI controls** | `openSysGui()` | Create windows, controls (buttons, text fields, grids), and handle GUI events |
| **Collections** | `makeVector()` | Create BBjVector objects -- dynamic arrays that grow as needed |
| **Namespaces** | `getNamespace()` | Share data between running BBj programs through named key-value stores |
| **File utilities** | `getFileSystem()` | File operations: read, write, copy, delete, directory listing |
| **Admin** | `getAdmin()` | Administrative operations: user management, configuration, licensing |
| **Config** | `getConfig()` | Access BBj configuration settings |
| **Thin Client** | `getThinClient()` | Information about the client connection (browser, display, session) |

Each family returns objects with their own method sets. For example, `openSysGui()` returns a `BBjSysGui` object, which has `addWindow()`, which returns a `BBjWindow`, which has `addButton()`, `addEditBox()`, and dozens of other control-creation methods.

## Discovering Methods

BBj's object model is large. Three approaches help you navigate it:

1. **IDE autocomplete.** The BBj IDE (BDTStudio or the Eclipse plugin) provides autocomplete when you type `api!.` or any object reference followed by a dot. This is the fastest way to explore available methods.

2. **The BBjAPI documentation.** The [BBjAPI object reference](https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm) provides the complete method listing for every object family. Bookmark this -- you will refer to it frequently.

3. **Runtime exploration.** The `FIELD()` function lists available fields/methods on any object at runtime:

```bbj
api! = BBjAPI()
sysgui! = api!.openSysGui("X0")
wnd! = sysgui!.addWindow(10, 10, 400, 300, "Test")

rem See what methods are available on a window object
print wnd!.getClass().getName()
```

## A Note on Scope

This page provides orientation. Detailed coverage of individual BBjAPI families -- GUI programming, event handling, collections -- appears in later chapters. The goal here is to give you the map so you know what exists and where to find it, before you dive into specific topics.

When you encounter `BBjAPI()` in code, you now know: it is the gateway to BBj's built-in object system, and the method you see called on it tells you which subsystem is being accessed.
