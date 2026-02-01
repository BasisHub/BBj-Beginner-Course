---
sidebar_position: 1
title: "String Basics"
---

# String Basics

BBj strings use a `$` suffix by convention and are byte-oriented. The core operations -- length, extraction, trimming, case conversion -- are each a single function call.

## LEN() -- String Length

`LEN()` returns the length of a string in **bytes**:

```bbj
a$ = "Hello World"
print len(a$)
rem Output: 11
```

### Bytes vs. Characters

`LEN()` returns bytes, not Unicode characters. For strings containing only ASCII characters, bytes equals characters. For non-ASCII text (accented characters, emoji, CJK), one character may occupy multiple bytes:

```bbj
a$ = "Hello"
print len(a$)
rem Output: 5 (ASCII: 1 byte per character)
```

If you need the character count for a Unicode string, use the `BBjString` object's `length()` method:

```bbj
rem For Unicode-aware length, use BBjString::length()
s! = new BBjString("cafe")
print s!.length()
```

For most BBj business applications, strings are ASCII and `LEN()` is all you need. Be aware of the distinction when processing internationalized data.

## Substring Extraction -- A$(pos,len)

BBj uses a **1-based** position and length notation to extract substrings. This replaces `MID$`, `LEFT$`, and `RIGHT$` from other BASIC dialects -- BBj does not use those functions.

```bbj
a$ = "Hello World"

rem Extract 5 characters starting at position 1
print a$(1,5)
rem Output: Hello

rem Extract from position 7 to end of string
print a$(7)
rem Output: World

rem Extract a single character
print a$(3,1)
rem Output: l
```

Common patterns:

| Expression | Meaning | Equivalent in Java |
|------------|---------|-------------------|
| `a$(1,n)` | First n characters | `a.substring(0, n)` |
| `a$(len(a$)-n+1)` | Last n characters | `a.substring(a.length()-n)` |
| `a$(p,n)` | n characters from position p | `a.substring(p-1, p-1+n)` |
| `a$(p)` | From position p to end | `a.substring(p-1)` |

:::caution
Positions are **1-based**, not 0-based. `a$(1,1)` is the first character, not `a$(0,1)`.
:::

## Concatenation

The `+` operator concatenates strings:

```bbj
first$ = "Hello"
last$ = "World"
full$ = first$ + " " + last$
print full$
rem Output: Hello World
```

## CVS() -- String Cleanup

`CVS()` uses a **bitmask** to combine multiple string operations in a single call. Each bit enables a different transformation:

| Value | Operation |
|-------|-----------|
| 1 | Strip leading spaces |
| 2 | Strip trailing spaces |
| 4 | Convert to uppercase |
| 8 | Strip non-printable characters |
| 16 | Collapse multiple consecutive spaces to one |
| 32 | Convert to lowercase |
| 64 | Swap commas and periods (European number formatting) |

Add values together to combine operations:

```bbj
b$ = "  hello world  "

rem Strip leading + trailing (1 + 2 = 3)
print cvs(b$, 3)
rem Output: "hello world"

rem Strip leading + trailing + uppercase (1 + 2 + 4 = 7)
print cvs(b$, 7)
rem Output: "HELLO WORLD"
```

`CVS()` with value 3 (strip both sides) is the BBj equivalent of Java's `String.trim()`. Using value 7 (strip + uppercase) is a common pattern for case-insensitive comparisons:

```bbj
rem Case-insensitive comparison
if cvs(input$, 7) = "YES" then print "Confirmed"
```

## String Variables and the $ Suffix

In BBj, the `$` suffix indicates a string variable. This is a language requirement, not just a naming convention -- the suffix determines the variable's type:

```bbj
name$ = "Alice"
greeting$ = "Hello, " + name$
```

Numeric variables have no suffix (or `%` for integers), and object references use `!`. See the [Getting Started](/getting-started) chapter for the full variable type system.

<details>
<summary>Reading Legacy Code: String Operations Across Generations</summary>

String operations have been consistent across BBx, PRO/5, and BBj. The functions (`LEN`, `CVS`, substring notation) work identically in all generations.

The main differences you will see in older code:

- **All-uppercase keywords**: `PRINT LEN(A$)` instead of `print len(a$)` -- both compile identically
- **Line numbers**: `0100 LET A$ = "HELLO"` -- the line number and `LET` keyword are optional in modern BBj
- **Tighter spacing**: `A$(1,5)` with no spaces, versus modern readability conventions

The string operations themselves have not changed, so legacy code involving `LEN()`, `CVS()`, and substring notation works exactly as written in modern BBj.

</details>

:::tip Further Reading
- [CVS() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/cvs_function.htm) -- full bitmask reference
- [Substrings](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/substrings.htm) -- substring notation details
- [Character Encoding in BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/character_encoding_bbj.htm) -- Unicode handling
:::
