---
sidebar_position: 99
title: "Reading Legacy Code"
description: "Recognize and understand legacy string and number patterns in older BBj codebases"
---

# Reading Legacy Code: Strings and Numbers

You will encounter these patterns in older BBj codebases. Each section shows the legacy approach and its modern equivalent.

### Uppercase Keywords and Line Numbers

You may see this in 1st Gen (BBx) code:

```bbj
rem Legacy: uppercase keywords with line numbers
0010 LET A$ = "HELLO WORLD"
0020 PRINT LEN(A$)
0030 PRINT CVS(A$, 32)
0040 RELEASE
```

The modern equivalent:

```bbj
rem Modern: lowercase keywords, no line numbers
a$ = "Hello World"
print len(a$)
print cvs(a$, 32)
release
```

BBj is case-insensitive for keywords -- `PRINT` and `print` compile identically. The `LET` keyword for assignments is optional in modern BBj and almost never used. Line numbers are also optional. Modern convention uses lowercase keywords and no line numbers for readability.

### String Searching Before MASK()

You may see this in 1st Gen and 2nd Gen code:

```bbj
rem Legacy: validate digits using POS() loop
valid% = 1
for i = 1 to len(input$)
    if pos(input$(i,1) = "0123456789") = 0 then
        valid% = 0
        break
    fi
next i
```

The modern equivalent:

```bbj
rem Modern: one MASK() call with regex
if mask(input$, "^[0-9]+$") then valid% = 1 else valid% = 0
```

`MASK()` was added in BBj and provides Perl 5 regular expression matching. Before it existed, all pattern matching required nested `POS()` calls and character-by-character loops. When maintaining legacy code, these multi-line `POS()` validation patterns are candidates for simplification with `MASK()`.

### Inline PRINT Formatting Masks

You may see this in 1st Gen and 2nd Gen code:

```bbj
rem Legacy: inline PRINT mask
print (0)"Price: $##,##0.00",total
print (0)"Qty:   ###",qty
```

The modern equivalent:

```bbj
rem Modern: STR() for formatting, separate from output
print "Price: ", str(total:"$##,##0.00")
print "Qty:   ", str(qty:"###")
```

The mask syntax itself has not changed -- `$##,##0.00` works the same way in both approaches. The difference is where the formatting happens. Legacy code embeds the mask directly in the `PRINT` statement, while modern code uses `STR()` to format the value first. `STR()` is preferred because it separates formatting from output, making the code easier to read and the formatted value reusable.

### MID$/LEFT$/RIGHT$ Functions

You may see this in code migrated from other BASIC dialects:

```bbj
rem Migrant pattern: BASIC dialect string functions
rem These do NOT exist in BBj
rem x$ = MID$(a$, 3, 5)
rem x$ = LEFT$(a$, 5)
rem x$ = RIGHT$(a$, 3)
```

The BBj equivalent:

```bbj
rem BBj: substring notation (1-based)
a$ = "Hello World"
x$ = a$(3, 5)
y$ = a$(1, 5)
z$ = a$(len(a$) - 2)
```

BBj does not use `MID$`, `LEFT$`, or `RIGHT$` functions. These are common in Microsoft BASIC dialects (GW-BASIC, QBasic, Visual Basic). BBj has always used its own substring notation: `a$(position, length)` for extraction and `a$(position)` for "from position to end." If you encounter these function names in documentation or code comments, they refer to other BASIC dialects, not BBj.
