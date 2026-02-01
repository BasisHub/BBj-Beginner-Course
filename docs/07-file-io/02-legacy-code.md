---
sidebar_position: 99
title: "Reading Legacy Code"
description: "Recognize and understand legacy file I/O patterns in older BBj codebases"
---

# Reading Legacy Code: File I/O

You will encounter these patterns in older BBj codebases. Each section shows the legacy approach and its modern equivalent. The entire file I/O chapter covers a system that is itself largely legacy -- SQL through the Data Dictionary is the modern approach -- but these patterns represent the *oldest* file I/O conventions.

### Direct Access File Modes

You may see this in 1st Gen (BBx) code:

```bbj
rem Legacy: DIRECT file with fixed-size records
OPEN(1,"DIRECT",ISZ=128)"CUSTOMER.DAT"
READ RECORD(1, IND=42) rec$
WRITE RECORD(1, IND=42) rec$
CLOSE(1)
```

The modern equivalent:

```bbj
rem Modern: MKEYED file with key-based access
chan = UNT
OPEN(chan)"CUSTOMER.DAT"
DIM rec$:"CUST_ID:C(10),NAME:C(30),BALANCE:N(12)"
READ RECORD(chan, KEY="CUST001") rec$
WRITE RECORD(chan) rec$
CLOSE(chan)
```

DIRECT files use index-based record positioning (`IND=`) -- the programmer must know the physical record number. SERIAL files use sequential access only. Both were pre-allocated to a fixed size. MKEYED files replaced them with key-based lookups, dynamic sizing, and multi-key support.

### String-Packed Records

You may see this in 1st Gen and 2nd Gen code:

```bbj
rem Legacy: manually packing fields into a fixed-width string
rec$ = "CUST001   Alice                         00000100.00Y"
rem Fields at fixed byte positions:
rem   Bytes 1-10:  customer ID
rem   Bytes 11-40: name
rem   Bytes 41-51: balance
rem   Byte  52:    active flag
name$ = rec$(11, 30)
balance = num(rec$(41, 11))
```

The modern equivalent:

```bbj
rem Modern: DIM with a string template for named field access
DIM rec$:"CUST_ID:C(10),NAME:C(30),BALANCE:N(12),ACTIVE:C(1)"
READ RECORD(chan, KEY=key$) rec$
print rec.NAME$
print rec.BALANCE
```

Before string templates, programmers tracked field offsets manually using byte positions. Any change to a field width required updating every line that referenced subsequent fields. Templates let you access fields by name (`rec.NAME$`) without manual offset math.

### IOLIST for Field Mapping

You may see this in 2nd Gen and 3rd Gen code:

```bbj
rem Legacy: IOLIST clause on READ for field-by-field parsing
READ(chan, KEY=key$, ERR=handler) IOL=custId$, name$, balance, active$
print name$
print balance
```

The modern equivalent:

```bbj
rem Modern: DIM template + READ RECORD for named field access
DIM rec$:"CUST_ID:C(10),NAME:C(30),BALANCE:N(12),ACTIVE:C(1)"
READ RECORD(chan, KEY=key$, ERR=handler) rec$
print rec.NAME$
print rec.BALANCE
```

`IOLIST` (or `IOL=`) defines fields inline on the `READ` or `WRITE` statement, parsing them positionally into separate variables. This couples the field layout to every `READ`/`WRITE` statement. String templates centralize the layout in one `DIM` statement, and all reads and writes share the same structure.

### Channel-Number File Management

You may see this in 1st Gen and 2nd Gen code:

```bbj
rem Legacy: hardcoded channel numbers, manual tracking
OPEN(1)"CUSTOMER.DAT"
OPEN(2)"ORDERS.DAT"
OPEN(3)"PRODUCTS.DAT"
rem ... code must remember which file is on which channel
READ RECORD(1, KEY=key$) cust$
READ RECORD(2, KEY=ordKey$) ord$
CLOSE(3)
CLOSE(2)
CLOSE(1)
```

The modern equivalent:

```bbj
rem Modern: UNT for dynamic channel assignment
custChan = UNT; OPEN(custChan)"CUSTOMER.DAT"
ordChan = UNT;  OPEN(ordChan)"ORDERS.DAT"
prodChan = UNT; OPEN(prodChan)"PRODUCTS.DAT"
rem Descriptive variable names identify each channel
READ RECORD(custChan, KEY=key$) cust$
READ RECORD(ordChan, KEY=ordKey$) ord$
CLOSE(prodChan)
CLOSE(ordChan)
CLOSE(custChan)
```

Hardcoded channel numbers required programmers to maintain a mental map of which file lived on which number. Conflicts arose when subroutines used the same numbers as the calling code. `UNT` (unused channel) returns the next available channel, and storing it in a descriptive variable name makes the code self-documenting.
