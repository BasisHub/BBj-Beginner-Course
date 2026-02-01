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
