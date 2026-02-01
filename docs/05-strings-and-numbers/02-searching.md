---
sidebar_position: 2
title: "Searching Strings"
---

# Searching Strings

BBj has two string searching functions: `POS()` for literal substring matching and `MASK()` for regex pattern matching. `POS()` handles the vast majority of search tasks; `MASK()` is available when you need the full power of regular expressions.

## POS() -- Find Substring Position

`POS()` searches for a substring and returns its 1-based position, or 0 if not found:

```bbj
a$ = "MONTUEWEDTHUFRISATSUN"
print pos("WED" = a$)
rem Output: 7

print pos("XYZ" = a$)
rem Output: 0
```

Note the syntax: the search string comes **before** the `=` sign and the target string comes after. This reads as "find the position of `WED` in `a$`."

### Searching from a Starting Position

Pass a second argument to start the search at a specific position:

```bbj
a$ = "hello world hello"
print pos("hello" = a$, 7)
rem Output: 13
```

### Backward Search

Use a negative value for the second argument to scan from the end of the string toward the beginning:

```bbj
b$ = "hello world hello"
print pos("hello" = b$, -1)
rem Output: 13
```

This finds the **last** occurrence. The `-1` means "start from the end, find the first match scanning backward."

### Counting Occurrences

When the third argument is `0`, `POS()` returns the **count** of non-overlapping occurrences instead of a position:

```bbj
b$ = "hello world hello"
print pos("hello" = b$, 1, 0)
rem Output: 2
```

### POS() Quick Reference

| Syntax | Meaning |
|--------|---------|
| `pos("find"=a$)` | First occurrence (position or 0) |
| `pos("find"=a$, n)` | First occurrence at or after position n |
| `pos("find"=a$, -1)` | Last occurrence (backward scan) |
| `pos("find"=a$, 1, 0)` | Count of occurrences |

## MASK() -- Regex Pattern Matching

`MASK()` matches a string against a **Perl 5 regular expression** and returns the 1-based position of the match, or 0 if no match:

```bbj
a$ = "config.bbj"
print mask(a$, ".*\.bbj")
rem Output: 1 (match found starting at position 1)
```

After a successful `MASK()` call, `TCB(16)` returns the length of the matched text:

```bbj
a$ = "order-12345-draft"
if mask(a$, "[0-9]+") then print "Match length: ", tcb(16)
```

### Common Regex Patterns

| Pattern | Matches |
|---------|---------|
| `[0-9]+` | One or more digits |
| `[A-Za-z]+` | One or more letters |
| `^[A-Z]` | Starts with uppercase letter |
| `\.bbj$` | Ends with `.bbj` |
| `\s+` | One or more whitespace characters |

Since `MASK()` uses standard Perl 5 syntax, any regex reference applies. If you already know regex from Java, Python, or JavaScript, the same patterns work here.

## POS() vs. MASK() -- When to Use Each

| Scenario | Use | Why |
|----------|-----|-----|
| Find a known substring | `POS()` | Simpler, faster |
| Count occurrences | `POS()` | Built-in with third argument |
| Scan backward | `POS()` | Built-in with negative second argument |
| Match a pattern (digits, email, etc.) | `MASK()` | Regex required |
| Validate format | `MASK()` | Regex handles complex rules |
| Simple presence check | `POS()` | `if pos("x"=a$) then ...` |

**Rule of thumb:** Use `POS()` unless you need pattern matching. It is simpler to read and covers most search tasks.

<details>
<summary>Reading Legacy Code: String Searching Before MASK()</summary>

`MASK()` was added in BBj. In earlier BBx and PRO/5 programs, all pattern matching was done with nested `POS()` calls and conditional logic.

For example, checking if a string contains only digits in legacy code:

```bbj
rem Legacy approach: check each character class with POS()
valid% = 1
for i = 1 to len(input$)
    if pos(input$(i,1) = "0123456789") = 0 then valid% = 0; break
next i
```

The modern equivalent:

```bbj
rem Modern BBj: one MASK() call
if mask(input$, "^[0-9]+$") then valid% = 1 else valid% = 0
```

When maintaining legacy code, you will see these multi-line `POS()` patterns where a single `MASK()` call would suffice today. Both approaches produce correct results.

</details>

:::tip Further Reading
- [POS() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/pos_function.htm) -- full syntax with all argument combinations
- [MASK() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/mask_function_bbj.htm) -- regex matching reference
:::
