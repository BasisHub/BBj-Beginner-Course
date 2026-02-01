---
sidebar_position: 3
title: "Formatting and Conversion"
---

# Formatting and Conversion

BBj's `STR()` function handles both number-to-string conversion and formatted output using masks. `NUM()` converts the other direction -- string to number. Together they cover the formatting and parsing tasks that other languages need `printf`, `DecimalFormat`, or template literals for.

## STR() -- Number to String

Basic conversion without formatting:

```bbj
x = 42.5
print str(x)
rem Output: 42.5
```

## STR() with Numeric Masks

Add a mask after a colon to format the output:

```bbj
print str(3352.3:"$##,##0.00")
rem Output: $3,352.30
```

### Numeric Mask Characters

| Character | Meaning |
|-----------|---------|
| `#` | Digit placeholder (suppressed if zero) |
| `0` | Digit placeholder (shows zero) |
| `.` | Decimal point |
| `,` | Thousands separator |
| `$` | Literal dollar sign |
| `-` | Minus sign (for negatives) |
| `%` | Literal percent sign |
| `B` | Insert blank if result is zero |

More examples:

```bbj
print str(42:"000")
rem Output: 042

print str(0.5:"##0.00%")
rem Output:  0.50%

print str(-15.3:"##0.00-")
rem Output: 15.30-
```

The mask determines the width and formatting. If the number does not fill all `#` positions, those positions are blank. If the number is too large for the mask, BBj returns asterisks (`*`) to indicate overflow.

## STR() with String Masks

`STR()` also reformats strings by mapping characters through a mask. Use `X` as the character placeholder:

```bbj
print str("5551234567":"(XXX) XXX-XXXX")
rem Output: (555) 123-4567

print str("123456789":"XXX-XX-XXXX")
rem Output: 123-45-6789
```

Each `X` in the mask consumes one character from the input string. All other characters in the mask are inserted literally. This is useful for formatting phone numbers, identifiers, and other fixed-format data.

## NUM() -- String to Number

`NUM()` converts a string to a numeric value:

```bbj
print num("123.45")
rem Output: 123.45

print num("  42  ")
rem Output: 42
```

`NUM()` handles leading and trailing whitespace automatically.

### Error Handling with NUM()

If the string cannot be converted, `NUM()` raises **error 26** (non-numeric data). Use `ERR=` to handle this:

```bbj
x = num("abc", err=bad_number)
print x
stop

bad_number:
print "Not a valid number"
```

See the [Error Handling](/error-handling) chapter for details on `ERR=` and other error trapping techniques.

## Common Mask Patterns

| Mask | Input | Output | Use Case |
|------|-------|--------|----------|
| `$##,##0.00` | `3352.3` | `$3,352.30` | Currency |
| `000` | `42` | `042` | Zero-padded |
| `##0.0%` | `0.5` | `  0.5%` | Percentage |
| `(XXX) XXX-XXXX` | `5551234567` | `(555) 123-4567` | Phone number |
| `XXX-XX-XXXX` | `123456789` | `123-45-6789` | SSN format |
| `##,##0` | `1500` | ` 1,500` | Integer with commas |

<details>
<summary>Reading Legacy Code: Numeric Formatting</summary>

`STR()` with masks has been consistent across BBx, PRO/5, and BBj. The mask syntax has not changed.

In older code, you may see formatting done inline with `PRINT` using a mask directly:

```bbj
rem Legacy inline mask syntax
print (0)"Price: $##,##0.00",total
```

This prints the value of `total` formatted with the mask. Modern BBj code more commonly uses `STR()` for formatting, which separates the formatting from the output and is easier to read:

```bbj
rem Modern approach
print "Price: ", str(total:"$##,##0.00")
```

Both produce the same result. When reading legacy code, recognize the inline `PRINT` mask pattern as equivalent to `STR()` formatting.

</details>

:::tip Further Reading
- [STR() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/str_function.htm) -- full conversion and masking reference
- [NUM() Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/num_function_bbj.htm) -- string-to-number conversion
- [String Output Masking](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/string_output_masking.htm) -- complete mask character reference
- [Numeric Output](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/Language_Concepts/numeric_output.htm) -- numeric formatting guide
:::
