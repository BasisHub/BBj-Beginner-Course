---
sidebar_position: 1
title: "Strings and Numbers"
---

# Strings and Numbers

BBj's string and numeric functions are more powerful than they first appear. A single `CVS()` call replaces what would be multiple method calls in Java, and `STR()` with masks handles formatting that other languages need entire libraries for. If you are coming from Java or .NET, note that BBj uses substring notation `A$(pos,len)` rather than named functions for extraction.

## At a Glance

| Function | Syntax | Purpose |
|----------|--------|---------|
| LEN | `len(a$)` | String length in bytes |
| Substring | `a$(pos,len)` | Extract substring (1-based) |
| CVS | `cvs(a$, mask)` | Trim, case-convert, clean whitespace |
| POS | `pos("find"=a$)` | Find substring position |
| MASK | `mask(a$, "regex")` | Perl 5 regex pattern match |
| STR | `str(num:"mask")` | Format number or string |
| NUM | `num(a$)` | Convert string to number |

## For Java, Python, and C# Developers

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Get length | `s.length()` | `len(s)` | `s.Length` | `len(s$)` |
| Substring | `s.substring(1, 4)` | `s[1:4]` | `s.Substring(1, 3)` | `s$(2, 3)` (1-based) |
| Find in string | `s.indexOf("x")` | `s.find("x")` | `s.IndexOf("x")` | `pos("x" = s$)` |
| Replace | `s.replace("a", "b")` | `s.replace("a", "b")` | `s.Replace("a", "b")` | `stbl("!REPLACE", s$, "a", "b")` |
| Trim whitespace | `s.trim()` | `s.strip()` | `s.Trim()` | `cvs(s$, 3)` |
| String to number | `Integer.parseInt(s)` | `int(s)` | `int.Parse(s)` | `num(s$)` |
| Number to string | `String.valueOf(n)` | `str(n)` | `n.ToString()` | `str(n)` |
| Regex match | `Pattern.matches(p, s)` | `re.match(p, s)` | `Regex.IsMatch(s, p)` | `mask(s$, p$)` |

BBj string positions are 1-based, not 0-based. `pos()` uses the syntax `pos(needle$ = haystack$)` with the needle on the left side of the `=` sign. For the complete cross-language reference, see [BBj for Java, Python, and C# Developers](/introduction/translation-tables).

:::tip[Complete Runnable Examples]
This chapter's code snippets illustrate individual concepts. For complete, runnable programs you can open directly in the BBj IDE, see the sample files in [`samples/05-strings-and-numbers/`](https://github.com/BasisHub/BBj-Beginner-Course/tree/master/samples/05-strings-and-numbers):

- `string_basics.bbj` -- LEN(), substring extraction, concatenation, CVS()
- `pos_searching.bbj` -- POS() basic search, backward scan, occurrence counting
- `str_num_formatting.bbj` -- STR() and NUM() formatting and conversion
- `mask_regex.bbj` -- MASK() with Perl 5 regex patterns

See [Running Samples](/samples) for setup instructions.
:::
