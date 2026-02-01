# Phase 4: Core Language Chapters - Research

**Researched:** 2026-02-01
**Domain:** BBj error handling, string/numeric functions, and collections
**Confidence:** HIGH (verified via official docs + compiler)

## Summary

This phase adds three new tutorial chapters covering the core BBj capabilities needed after basic syntax: error handling, string/numeric functions, and collections. Each chapter follows the established subpage pattern from Phase 03's OOP chapter (index page + concept subpages), with legacy callouts in collapsible `<details>` elements.

Research focused on three areas: (1) verifying the exact syntax and semantics of each BBj language feature via official documentation and compiler testing, (2) identifying the complete set of legacy patterns that differ across BBj generations, and (3) understanding which official documentation URLs to link from "Further Reading" sections.

**Primary recommendation:** Build each chapter as an index page with a quick-reference table linking to 2-4 subpages. Use compiler-verified code examples throughout. For error handling, teach SETERR/THROW/ERR= patterns (NOT try/catch, which does not exist in BBj despite appearing in the existing codebase). For strings, teach substring notation A$(pos,len) rather than MID$/LEFT$/RIGHT$ which are not part of BBj. For collections, lead with BBjVector and java.util.HashMap as the two daily-use collections.

## Standard Stack

This phase produces documentation content (Markdown files + BBj sample files), not application code. The "stack" is the content toolchain and the BBj language features being documented.

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Docusaurus 3.9.2 | 3.9.2 | Documentation framework | Already configured in project |
| `bbj` Prism language | N/A | Syntax highlighting for code blocks | Already registered in docusaurus.config.ts |
| `bbjcpl -N` | Local install | Compiler verification of all BBj snippets | CLAUDE.md mandates verification before embedding |
| `<details>/<summary>` | HTML | Collapsible legacy callouts | Decision from CONTEXT.md |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Docusaurus admonitions (:::tip, :::note, :::info) | Callout boxes | "Further Reading" sections, tips, warnings |
| Mermaid diagrams | Visual explanation | Error trapping priority flow (if useful) |
| samples/ directory | Runnable .bbj files | One or more per concept, self-contained |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `<details>` for legacy callouts | Docusaurus admonition | CONTEXT.md specifies `<details>/<summary>` -- locked decision |
| Inline code only | Separate .bbj sample files | Decision: bias toward more sample files for developer learning |

## Architecture Patterns

### Recommended Content Structure

Each of the three chapters follows the same skeleton established by the OOP chapter:

```
docs/
├── 04-error-handling/
│   ├── index.md              # Overview + quick-reference table + links
│   ├── 01-seterr-and-err.md  # SETERR, ERR=, ERR(), ERRMES(), error codes
│   ├── 02-throw-and-custom.md # THROW verb, custom errors, error propagation
│   └── 03-patterns.md        # Common patterns: retry, cleanup, Java exceptions
├── 05-strings-and-numbers/
│   ├── index.md              # Overview + quick-reference table + links
│   ├── 01-string-basics.md   # LEN, substrings A$(pos,len), concatenation, CVS
│   ├── 02-searching.md       # POS(), MASK() regex pattern matching
│   └── 03-formatting.md      # STR(), NUM(), numeric/string masking
├── 06-collections/
│   ├── index.md              # Overview + quick-reference table + links
│   ├── 01-bbjvector.md       # BBjVector creation, methods, iteration
│   ├── 02-java-collections.md # HashMap, ArrayList, Iterator patterns
│   └── 03-arrays-conversion.md # DIM arrays, VECTOR() conversion, when to use what
samples/
├── 04-error-handling/        # .bbj files for error handling examples
├── 05-strings-and-numbers/   # .bbj files for string/number examples
└── 06-collections/           # .bbj files for collection examples
```

### Pattern 1: Chapter Index Page Structure

**What:** Each chapter index follows a consistent format: overview paragraph, quick-reference table, then the sidebar auto-generates navigation to subpages.
**When to use:** Every chapter in Phase 4.
**Example:**

```markdown
---
sidebar_position: 1
title: "Error Handling"
---

# Error Handling

[2-3 sentence overview of what and why]

## At a Glance

| Feature | Syntax | Purpose |
|---------|--------|---------|
| SETERR | `seterr label` | Set global error trap |
| ERR= | `statement(args, err=label)` | Statement-level error trap |
| THROW | `throw "message", code` | Raise custom error |
| ERR | `err` | Get last error number |
| ERRMES | `errmes(-1)` | Get last error message |

[Docusaurus sidebar auto-generates links to subpages]
```

Source: Pattern derived from existing `docs/03-object-oriented/index.md`

### Pattern 2: Subpage Structure (Fixed Skeleton, Flexible Middle)

**What:** Every subpage follows: frontmatter -> opening context (2-3 sentences) -> code examples -> legacy callouts -> Further Reading.
**When to use:** All subpages.
**Example structure:**

```markdown
---
sidebar_position: N
title: "Concept Title"
---

# Concept Title

[2-3 sentence intro: what this does and when you need it]

## [Main concept sections -- flexible per content]

[Code examples with expected output where non-obvious]

## [Additional concept sections as needed]

<details>
<summary>Reading Legacy Code: [concept name]</summary>

[Legacy pattern comparison with modern equivalent]

</details>

:::tip Further Reading
- [Link to official BBj docs](url)
- [Link to other relevant resources](url)
:::
```

Source: CONTEXT.md decisions on structure and flow

### Pattern 3: Legacy Callout Format

**What:** Collapsible `<details>/<summary>` elements showing how the same operation looked in older BBj generations.
**When to use:** Any concept where legacy code differs from modern BBj.
**Example:**

```markdown
<details>
<summary>Reading Legacy Code: Error Handling with Line Numbers</summary>

In early BBx/PRO/5 programs, error handlers used line numbers instead of labels:

```bbj
0100 SETERR 9500
0200 REM ... program code ...
9500 REM Error handler
9510 PRINT ERR
9520 RETRY
```

Modern BBj uses symbolic labels, which are clearer and do not require line number management:

```bbj
seterr handler
rem ... program code ...

handler:
    print err
    retry
```

**When you see this:** Legacy code with `SETERR` followed by a number is branching to a line number. The behavior is identical to label-based SETERR. If maintaining legacy code, you can continue using line numbers -- they still work in BBj.

</details>
```

### Anti-Patterns to Avoid

- **Using try/catch/endtry syntax:** BBj does NOT have try/catch. The existing codebase's `02-using-java.md` contains a try/catch/endtry example that FAILS compilation. This is invalid BBj syntax and must not be taught in the error handling chapter. (See "Critical Pitfall 1" below.)
- **Teaching MID$, LEFT$, RIGHT$:** BBj does not use these functions. It uses substring notation: `A$(pos, len)`. Do not import patterns from other BASIC dialects.
- **Assuming BBjHashMap exists as a general-purpose collection:** `BBjHashMap` was renamed to `BBjspHashMap` in BBj 20.10 and is deprecated for general use. Use `java.util.HashMap` instead.
- **Showing only one legacy generation:** CONTEXT.md says "cover all relevant generations that had a different way of doing it." Show line-number era AND label-based era where both differ from current patterns.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Hash maps / key-value stores | Custom BBj class wrapping arrays | `java.util.HashMap` directly | Full Java HashMap API available; no BBjHashMap equivalent for general use |
| Dynamic lists | Manual array resizing with DIM | `BBjVector` via `BBjAPI().makeVector()` | Dynamic sizing, implements java.util.List |
| Regular expression matching | Character-by-character scanning | `MASK()` function | Supports Perl 5 regex syntax natively |
| String trimming/conversion | Manual loops with substring operations | `CVS()` function | Single function handles trim, case conversion, whitespace normalization |
| Error message lookup | Hardcoded error message tables | `ERRMES()` function | Returns system error messages, supports custom messages via `ERRMES(code, "message")` |

**Key insight:** BBj's built-in functions (CVS, POS, MASK, STR with masks) are more powerful than they appear. Most string manipulation that would require multiple lines in other languages is a single function call in BBj.

## Common Pitfalls

### Critical Pitfall 1: try/catch/endtry Does Not Exist in BBj

**What goes wrong:** The existing tutorial codebase (in `docs/03-object-oriented/02-using-java.md`) shows a `try`/`catch`/`endtry` block. This code does NOT compile. Running `bbjcpl -N` on it produces three syntax errors.
**Why it happens:** Claude's training data or the original author may have assumed BBj supports Java-like try/catch. It does not. BBj is not listed as having TRY/CATCH/ENDTRY in the "New Verbs in BBj" documentation page.
**How to avoid:** All error handling must use SETERR, ERR= clauses, and THROW. Every code snippet must be compiler-verified before embedding.
**Warning signs:** Any code using `try`, `catch`, or `endtry` keywords.
**Impact on this phase:** The error handling chapter must teach the correct patterns. Additionally, the invalid example in `02-using-java.md` should be flagged (but fixing it is out of scope for Phase 4 unless the planner decides otherwise).

### Pitfall 2: LEN() Returns Bytes, Not Characters

**What goes wrong:** Developers assume `LEN("euro sign")` returns 1 for a single Unicode character, but it returns 3 (UTF-8 bytes for non-ASCII characters).
**Why it happens:** BBx string functions are byte-oriented, inherited from the ASCII-era origins.
**How to avoid:** Document this explicitly. Show the difference between `LEN()` (bytes) and `BBjString::length()` (Unicode characters) when relevant.
**Warning signs:** String length calculations on user input that may contain non-ASCII characters.

### Pitfall 3: BBjVector contains() Type Sensitivity

**What goes wrong:** `vector!.contains(2)` returns false even after `vector!.addItem(2)`, because the integer literal and the stored object may be different Java types.
**Why it happens:** BBjVector wraps values as Java objects. The `contains()` method uses Java's `.equals()`, which is type-sensitive.
**How to avoid:** Document this gotcha explicitly in the collections chapter. Show the correct pattern using consistent types.
**Warning signs:** Boolean checks on BBjVector.contains() returning unexpected false.

### Pitfall 4: SETERR Resets to Zero After Branching

**What goes wrong:** After an error branches to the SETERR handler, SETERR is automatically reset to 0. If another error occurs in the handler, the program crashes.
**Why it happens:** By design -- PRO/5/BBj saves the SETERR value and resets it. RETRY restores the saved value.
**How to avoid:** Either use RETRY (which restores SETERR) or re-establish SETERR at the start of the error handler. Document this behavior explicitly.
**Warning signs:** Error handlers that do complex operations without re-establishing their own error traps.

### Pitfall 5: ERR= Priority Over SETERR

**What goes wrong:** Developer sets up SETERR but an ERR= clause on a specific statement intercepts the error first. The SETERR handler never fires.
**Why it happens:** Error trapping priority: ERR= on the specific statement has higher priority than the global SETERR trap.
**How to avoid:** Teach the error trapping priority order explicitly. Show the five-level priority hierarchy from the official docs.
**Warning signs:** SETERR handlers that seem to be "skipped" for certain statements.

### Pitfall 6: MASK() vs POS() Confusion

**What goes wrong:** Developer uses POS() when they need regex matching, or uses MASK() for simple substring search.
**Why it happens:** Both functions search strings, but POS() does literal/relational comparison while MASK() does regex pattern matching.
**How to avoid:** Clearly distinguish the two: POS() for literal substring searching, MASK() for regex/pattern matching.
**Warning signs:** POS() calls with regex-like patterns, or MASK() calls for simple substring finding.

## Code Examples

All examples below have been verified to compile with `bbjcpl -N`.

### Error Handling: SETERR + Label Pattern

```bbj
rem Modern BBj error handling with labels
seterr handler

rem Code that might error
x = num("not a number")
print "This line is never reached"
release

handler:
    print "Error #", err, " - ", errmes(-1)
    release
```

Source: Verified via `bbjcpl -N`, pattern from [SETERR Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/seterr_verb.htm)

### Error Handling: ERR= on Statements

```bbj
rem ERR= clause catches errors on specific statements
x = num("not a number", err=*next)
print "Continued after error, x is: ", x

rem ERR= on file open
open(1, err=fileErr)"nonexistent.dat"
print "File opened"
release

fileErr:
    print "Could not open file: ", errmes(-1)
    release
```

Source: Verified via `bbjcpl -N`, pattern from [Error Trapping Rules](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/error_trapping_rules.htm)

### Error Handling: THROW from a Class

```bbj
rem Custom class that throws errors for validation
class public Validator
    method public void validate(BBjString input$)
        if len(input$) = 0 then
            throw "Input cannot be empty", 256
        fi
        if len(input$) > 100 then
            throw "Input too long (max 100 characters)", 257
        fi
    methodend
classend

seterr handler
declare Validator v!
v! = new Validator()
v!.validate("")
release

handler:
    print "Validation error #", err, ": ", errmes(-1)
    release
```

Source: Verified via `bbjcpl -N`, pattern from [Custom Objects Tutorial: Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_10program4.htm)

### Error Handling: ERR= on Java Method Calls

```bbj
use java.util.HashMap

map! = new HashMap()
x$ = map!.get("missing_key",err=oops)
print "Got value: ", x$
release

oops:
    print "Error: ", err, " - ", errmes(-1)
    release
```

Source: Verified via `bbjcpl -N`, pattern from [BBj Object Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/error_handling.htm)

### String Functions: Basics

```bbj
rem String length (returns bytes)
a$ = "Hello World"
print len(a$)

rem Substring extraction (1-based position, length)
print a$(1,5)
rem Output: Hello

rem Substring from position to end
print a$(7)
rem Output: World

rem CVS: strip leading (1), trailing (2), uppercase (4)
b$ = "  hello world  "
print cvs(b$, 3)
rem Output: "hello world" (stripped leading + trailing)
print cvs(b$, 7)
rem Output: "HELLO WORLD" (stripped + uppercase)
```

Source: Verified via `bbjcpl -N`, functions from [CVS()](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/cvs_function.htm), [Substrings](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/substrings.htm)

### String Functions: POS() Searching

```bbj
rem Find substring position
a$ = "MONTUEWEDTHUFRISATSUN"
print pos("WED" = a$)
rem Output: 7

rem Find from end (scan backward)
b$ = "hello world hello"
print pos("hello" = b$, -1)
rem Output: 13

rem Count occurrences (intB = 0)
print pos("hello" = b$, 1, 0)
rem Output: 2
```

Source: Verified via `bbjcpl -N`, from [POS() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/pos_function.htm)

### String Functions: STR() and NUM() Formatting

```bbj
rem Number to string
x = 42.5
print str(x)

rem Numeric masking
print str(3352.3:"$##,##0.00")
rem Output: $3,352.30

rem String masking (reformatting)
print str("5551234567":"(XXX) XXX-XXXX")
rem Output: (555) 123-4567

rem String to number
print num("123.45")
rem Output: 123.45
```

Source: Verified via `bbjcpl -N`, from [STR()](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/str_function.htm), [NUM()](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/num_function_bbj.htm)

### String Functions: MASK() Pattern Matching

```bbj
rem MASK() uses Perl 5 regex syntax
a$ = "config.bbj"
print mask(a$, ".*bbj")
rem Output: 1 (match found at position 1)

rem TCB(16) returns length of match
rem after successful MASK() call
```

Source: Verified via `bbjcpl -N`, from [MASK()](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/mask_function_bbj.htm)

### Collections: BBjVector

```bbj
rem Create and populate a BBjVector
vect! = BBjAPI().makeVector()
vect!.addItem("alpha")
vect!.addItem("beta")
vect!.addItem("gamma")
print "Size: ", vect!.size()

rem Iterate with for loop
for i = 0 to vect!.size() - 1
    print vect!.getItem(i)
next i

rem BBjVector also implements java.util.List
vect!.add("delta")
print "Contains alpha: ", vect!.contains("alpha")
```

Source: Verified via `bbjcpl -N`, from [BBjVector](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/API/bbjvector/bbjvector.htm)

### Collections: java.util.HashMap

```bbj
use java.util.HashMap
use java.util.Iterator

map! = new HashMap()
map!.put("name", "Alice")
map!.put("role", "Developer")
map!.put("team", "Platform")

rem Iterate using keySet().iterator()
iter! = map!.keySet().iterator()
while iter!.hasNext()
    key! = iter!.next()
    print key!, " = ", map!.get(key!)
wend
```

Source: Verified via `bbjcpl -N`, standard Java HashMap usage in BBj

### Collections: Array to Vector Conversion

```bbj
rem DIM array (fixed size, typed)
dim names$[2]
names$[0] = "Alice"
names$[1] = "Bob"
names$[2] = "Charlie"

rem Convert to BBjVector (BBj 16.0+)
vect! = vector(names$[])
print "Vector size: ", vect!.size()
for i = 0 to vect!.size() - 1
    print vect!.getItem(i)
next i
```

Source: Verified via `bbjcpl -N`, from [VECTOR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/VECTOR()_Function_Convert_Array_to_Vector.htm)

### Collections: java.util.ArrayList

```bbj
use java.util.ArrayList

list! = new ArrayList()
list!.add("first")
list!.add("second")
list!.add("third")

for i = 0 to list!.size() - 1
    print list!.get(i)
next i
```

Source: Verified via `bbjcpl -N`, standard Java ArrayList usage in BBj

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `SETERR 9500` (line number) | `seterr handler` (symbolic label) | BBj introduced symbolic labels | Labels are clearer, no line number management |
| `ON ERR GOTO 9500` (line number) | `on err goto handler` (symbolic label) | BBj symbolic labels | Same functionality, more readable |
| DIM arrays only | BBjVector + Java collections | BBj (1999+) | Dynamic sizing, mixed types, Java interop |
| BBjHashMap | java.util.HashMap | BBj 20.10 renamed BBjHashMap to BBjspHashMap | BBjHashMap deprecated for general use |
| No pattern matching | MASK() with Perl 5 regex | Added in BBj | Full regex support native to language |
| No object-oriented error handling | THROW + SETERR in class methods | BBj custom objects | Structured error propagation from classes |
| Error codes 0-255 only | Developer range 256-1024 via THROW | BBj THROW verb | Custom application errors distinct from system errors |
| ERRMES(code) read-only | ERRMES(code, "message") writable | BBj enhancement | Custom error messages |
| `BBjAPI().getLastException()` | `BBjAPI().getLastBBjException()` + `getLastJavaException()` | BBj 12.0 | Separated BBj errors from Java exceptions |

**Deprecated/outdated:**
- `BBjHashMap`: Renamed to `BBjspHashMap` in BBj 20.10, restricted to BBJSP subsystem. Use `java.util.HashMap` for general key-value storage.
- `BBjAPI().getLastException()`: Deprecated in BBj 12.0. Use `getLastBBjException()` or `getLastJavaException()` instead.
- `try/catch/endtry`: This syntax does NOT exist in BBj. It is not a verb, not documented, and fails compilation. The existing tutorial code using it is incorrect.

## Subpage Breakdown Recommendations (Claude's Discretion)

Based on the research, here are recommended subpage groupings for each chapter:

### Chapter: Error Handling (04-error-handling/)

| Subpage | Content | Rationale |
|---------|---------|-----------|
| `01-seterr-and-err.md` | SETERR verb, ERR= clause, ERR() function, ERRMES() function, error trapping priority, common error codes table | These are the foundation -- the reader needs to understand the error system before using it |
| `02-throw-and-custom.md` | THROW verb (syntax, developer error range 256-1024), THROW from class methods, error propagation through call stack, RETRY verb | Building custom errors is the next step after understanding trapping |
| `03-patterns.md` | ERR=*NEXT (skip-on-error), ERR= on Java calls, `getLastBBjException()`, handling Java exceptions (error 252), cleanup patterns | Practical patterns that tie everything together |

### Chapter: Strings and Numbers (05-strings-and-numbers/)

| Subpage | Content | Rationale |
|---------|---------|-----------|
| `01-string-basics.md` | LEN() (bytes vs characters note), substring notation A$(pos,len), concatenation with +, CVS() for trimming/case/cleanup | The everyday operations every developer uses |
| `02-searching.md` | POS() for literal substring search (all operators, occurrences, backward scan), MASK() for regex pattern matching, when to use which | Searching is a distinct skill; POS vs MASK confusion is a known pitfall |
| `03-formatting.md` | STR(num:mask) for numeric formatting, STR(str:mask) for string formatting, NUM() for string-to-number, mask character tables, ERR=43 handling | Formatting is its own domain with mask syntax to learn |

### Chapter: Collections (06-collections/)

| Subpage | Content | Rationale |
|---------|---------|-----------|
| `01-bbjvector.md` | BBjAPI().makeVector(), addItem/getItem/removeItem/setItem/size, iteration with for loop, java.util.List methods, contains() gotcha | BBjVector is the first collection most developers encounter |
| `02-java-collections.md` | java.util.HashMap (put/get/keySet/iterator), java.util.ArrayList, java.util.Iterator pattern, when to use Java collections vs BBjVector | HashMap is the most-used Java class in BBj code |
| `03-arrays-conversion.md` | DIM arrays (fixed-size, typed), VECTOR() function for conversion, Java arrays (BBj 18+), comparison table: when to use DIM vs BBjVector vs Java collections | Bridges legacy array code with modern collections |

## Legacy Callout Coverage

Research identified the following legacy patterns that need callouts:

### Error Handling Legacy Patterns

1. **Line-number SETERR** (earliest BBx/PRO/5): `SETERR 9500` branching to a line number
2. **ON ERR GOTO with line numbers**: `ON ERR GOTO 9500` -- older branching pattern
3. **No THROW verb** (pre-BBj): Only system errors existed; no way to raise custom errors
4. **!THROWERROR STBL** (BBj 6.0+): STBL-based error propagation before THROW became common
5. **!ERROR_HANDLER STBL** (BBj 17.0+): Program-level untrapped error handler

### String/Numeric Legacy Patterns

1. **CVS() with !CTYPE string** (legacy): Character type determination via !CTYPE STBL vs modern Java-based determination (JAVA_CVS !COMPAT)
2. **Byte-oriented string functions** (all generations): LEN/substrings always counted bytes; this hasn't changed but developers from other languages need the callout
3. **No MASK() function** (pre-BBj): Pattern matching was done manually with POS() and loops
4. **ALLOW_DECIMAL_COMMA** (BBj 19+): NUM() and INPUT verb decimal separator handling

### Collections Legacy Patterns

1. **DIM arrays only** (BBx/PRO/5): No dynamic collections; all data stored in fixed-size DIM arrays
2. **String templates** as pseudo-records: Before objects, structured data was stored in templated strings
3. **BBjHashMap** (BBj through 20.09): General-purpose hash map, renamed/deprecated in BBj 20.10
4. **No VECTOR() function** (pre-BBj 16.0): No way to convert arrays to vectors; manual copying required

## Official Documentation URLs for Further Reading Links

### Error Handling
- [SETERR Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/seterr_verb.htm)
- [Error Trapping Rules](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/error_trapping_rules.htm)
- [THROW Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/throw_verb.htm) (verify URL; may need alternate path)
- [ERR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/variables/err_function_variable.htm)
- [ERRMES() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/errmes_function.htm)
- [List of Errors](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Errors/Errors.htm)
- [Custom Objects Tutorial: Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_10program4.htm)
- [BBj Object Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/error_handling.htm)
- [BBjAPI::getLastBBjException](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/bbjapi/BBjAPI_getLastBBjException.htm)
- [STBL Formats (THROWERROR)](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/stbl_formats_bbj.htm)

### Strings and Numbers
- [CVS() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/cvs_function.htm)
- [CVS() Function - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/cvs_function_bbj.htm)
- [POS() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/pos_function.htm)
- [MASK() Function - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/mask_function_bbj.htm)
- [STR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/str_function.htm)
- [STR() Function - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/str_function_bbj.htm)
- [NUM() Function - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/num_function_bbj.htm)
- [Substrings](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/substrings.htm)
- [String Output Masking](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/string_output_masking.htm)
- [Numeric Output](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/numeric_output.htm)
- [Character Encoding - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/character_encoding_bbj.htm)

### Collections
- [BBjVector Methods](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/API/bbjvector/bbjvector.htm)
- [VECTOR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/VECTOR()_Function_Convert_Array_to_Vector.htm)
- [Working with Java Arrays](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/Working_with_Java_Arrays.htm)
- [Types in BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/types_in_bbj.htm)
- [Calling Java from BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/calling_java_from_bbj.htm)

## Open Questions

Things that could not be fully resolved:

1. **THROW verb documentation URL**
   - What we know: The THROW verb is listed in "New Verbs in BBj" and is used extensively in examples
   - What's unclear: The direct documentation page URL (`throw_verb.htm`) returned a 404; the verb may have a different URL path
   - Recommendation: The planner should verify the THROW verb URL or link to the Custom Objects Tutorial error handling page instead

2. **try/catch existence in newer BBj versions**
   - What we know: `try`/`catch`/`endtry` does NOT compile with the installed `bbjcpl`. It is NOT listed in "New Verbs in BBj." The web search found zero documentation for it on documentation.basis.cloud.
   - What's unclear: Whether a very recent BBj version (post-installed compiler) added this syntax
   - Recommendation: Treat as non-existent. Teach SETERR/ERR=/THROW patterns. Flag the existing `02-using-java.md` try/catch example as invalid.

3. **RETRY verb documentation page URL**
   - What we know: RETRY is documented in error trapping rules and custom objects tutorial; it restores SETERR state
   - What's unclear: Direct verb documentation page URL could not be found via search
   - Recommendation: Link to Error Trapping Rules page which documents RETRY behavior

4. **Exact list of CVS() operations above 64**
   - What we know: Values 0-64 are documented (strip spaces, case, non-printable, multiple spaces, commas/periods)
   - What's unclear: Whether additional CVS values exist in newer BBj versions
   - Recommendation: Document the well-known values (0, 1, 2, 4, 8, 16, 32, 64) and link to official docs for full reference

## Sources

### Primary (HIGH confidence)
- [BBjVector Methods](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/API/bbjvector/bbjvector.htm) - BBjVector API, java.util.Collection/List implementation
- [SETERR Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/seterr_verb.htm) - Global error trap syntax and behavior
- [Error Trapping Rules](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/error_trapping_rules.htm) - Error priority hierarchy, RETRY, error propagation
- [Custom Objects Tutorial: Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_10program4.htm) - SETERR in methods, THROW verb usage
- [List of Errors](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Errors/Errors.htm) - Complete error code reference (0-255 system, 256-1024 developer)
- [CVS() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/cvs_function.htm) - String conversion operations
- [POS() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/pos_function.htm) - String scanning with relational operators
- [MASK() Function - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/mask_function_bbj.htm) - Perl 5 regex pattern matching
- [STR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/str_function.htm) - Numeric/string conversion and masking
- [NUM() Function - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/num_function_bbj.htm) - String to number conversion
- [Substrings](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/substrings.htm) - Substring notation A$(pos,len)
- [VECTOR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/VECTOR()_Function_Convert_Array_to_Vector.htm) - Array to BBjVector conversion
- [ERR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/variables/err_function_variable.htm) - Error number retrieval
- [BBj Object Error Handling](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/error_handling.htm) - ERR= on Java calls, type checking
- [New Verbs in BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/BBj_New_Verbs.htm) - Confirmed THROW is listed, try/catch is NOT listed
- Local `bbjcpl -N` compiler verification - All code examples verified to compile

### Secondary (MEDIUM confidence)
- [BBjspHashMap](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjsp/BBjspHashMap/bbjsphashmap.html) - Confirmed BBjHashMap renamed in BBj 20.10
- [Character Encoding - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/character_encoding_bbj.htm) - LEN() byte vs character distinction
- [STBL Formats - BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/stbl_formats_bbj.htm) - !THROWERROR and !ERROR_HANDLER STBLs
- [BBj Changes from Earlier Versions](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/bbj_bbx_differences.htm) - ERRMES(-1), migration notes
- [Converting to BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/converting_to_bbj_from_earlier_versions_of_basis_products.htm) - Legacy compatibility differences
- [String Output Masking](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/string_output_masking.htm) - Mask character reference

### Tertiary (LOW confidence)
- [BBj Wikipedia/Infogalactic article](https://infogalactic.com/info/BBj) - Historical context on BBj generations (1985 BBx, 1999 BBj)
- [Business Basic Wikipedia](https://en.wikipedia.org/wiki/Business_Basic) - Business BASIC family history

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All tools and patterns verified against existing codebase and official docs
- Architecture: HIGH - Chapter structure follows established OOP chapter pattern, subpage breakdown based on content research
- Code examples: HIGH - Every BBj snippet compiled with `bbjcpl -N`
- Legacy patterns: MEDIUM - Identified through official docs and migration guides; some generational details are inferred from documentation references rather than direct observation
- Pitfalls: HIGH - Critical pitfall (try/catch) verified via compiler; others from official documentation

**Research date:** 2026-02-01
**Valid until:** 2026-04-01 (90 days -- BBj syntax is stable; official docs may add pages)
