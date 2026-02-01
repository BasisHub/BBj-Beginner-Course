---
sidebar_position: 1
title: "Introduction"
---

# Introduction

## Structure of This Material

This is a meta-course: it introduces concepts and links directly into the official BBj documentation rather than duplicating reference material. The goal is to orient you in the BBj ecosystem so you can find and use the official resources effectively.

Each section covers a topic area with explanations, working code examples, and links to the relevant documentation pages. The official docs are comprehensive -- this course shows you where to look and what to look for.

## Prerequisites

This material is written for experienced software developers who are new to BBj. It assumes familiarity with:

- Programming fundamentals (variables, functions, control flow)
- Loops and conditional statements
- Object-oriented programming concepts
- Working with an IDE or code editor

The material **does not** cover general programming concepts. If you need to strengthen any of these areas, address those gaps before starting.

## BBj for Java, Python, and C# Developers

If you are coming from Java, Python, C#, or similar languages, this section maps familiar concepts to their BBj equivalents. For a comprehensive task-by-task translation reference, see [BBj for Java, Python, and C# Developers](/introduction/translation-tables).

### What is BBj?

BBj is a **dynamic, interpreted language that runs on the JVM**. It has automatic garbage collection (Java's GC) and seamless Java interoperability -- you can instantiate Java classes directly, and BBj classes can extend Java classes.

### Key Terminology

| Java/C# | Python | BBj | Notes |
|----------|--------|-----|-------|
| keywords/statements | keywords/statements | **verbs** | See [Alphabetical Verbs](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/Alphabetical_Verbs.htm) |
| CLASSPATH | `sys.path` | **PREFIX** | Search path for classes. See [PREFIX verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/prefix_verb_set_file_system_search_paths_bbj.htm) |
| `this.field` | `self.field` | **`#field`** | Instance field reference within methods |
| ArrayList / List | `list` | **BBjVector** | `BBjAPI().makeVector()` - dynamic array |
| try/catch | try/except | **SETERR/THROW** | `SETERR errHandler` sets handler, `THROW` raises errors |
| static factory | module function | **BBjAPI()** | Entry point for creating BBj objects (windows, vectors, etc.) |

### Common Tasks

| Task | BBj Approach |
|------|--------------|
| **Collections** | `vector! = BBjAPI().makeVector()` then `vector!.add(item)` |
| **Error handling** | `SETERR handler` + label, or use `THROW "message", 256` |
| **Database access** | `SQLOPEN`, `SQLPREP`, `SQLEXEC` verbs |
| **String functions** | `LEN()`, `MID()`, `POS()`, `CVS()` - see [Functions list](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/Alphabetical_Functions.htm) |
| **File I/O** | `OPEN`, `READ`, `WRITE`, `CLOSE` verbs |

### Further Reading

- [BBj Object Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm) -- Search "Error Handling" in the BBj documentation index
- [Unit Testing in BBj](https://documentation.basis.cloud/advantage/v18-2014/14unittest.pdf) (PDF)
- [BBjVector Methods](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/API/bbjvector/bbjvector.htm)

## Please Contribute!

Found a typo? Have a suggestion? We welcome contributions to improve this tutorial.

**[View Contributing Guidelines](https://github.com/BasisHub/BBj-Beginner-Course/blob/master/CONTRIBUTING.md)** | **[Open an Issue](https://github.com/BasisHub/BBj-Beginner-Course/issues)**

Your contributions help make this material better for future BBj developers!
