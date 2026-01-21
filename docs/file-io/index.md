# File I/O and Record-Oriented Data Access

If you're coming from a SQL or NoSQL background, BBj's file system will feel unfamiliar at first. Modern databases abstract away the physical storage layer - you think in tables, rows, and queries. BBj exposes you to the raw mechanics: channels, byte positions, field delimiters, and explicit pointer navigation.

This isn't a limitation - it's a design philosophy rooted in the 1980s when Business BASIC first emerged. Understanding this foundation is essential for maintaining legacy systems and making informed modernization decisions.

**Key mindset shift:** In SQL, you declare *what* you want. In BBj file I/O, you specify *how* to get it.

## File I/O for Java/.NET Developers

If you're familiar with file streams or database access in other languages, here's how BBj concepts map:

| Java/.NET | BBj | Notes |
|-----------|-----|-------|
| FileInputStream / StreamReader | **Channel + OPEN** | Integer handle to open file |
| BufferedReader.readLine() | **READ** | Read with field parsing |
| DataInputStream.read() | **READ RECORD** | Read raw bytes |
| FileOutputStream.write() | **WRITE RECORD** | Write raw bytes |
| PreparedStatement (with locking) | **EXTRACT** | Lock record for exclusive access |
| close() | **CLOSE** | Release the channel |
| struct / record class | **String Template** | Define field layout |

### Quick Reference: Common Verbs

| Verb | Purpose | Documentation |
|------|---------|---------------|
| OPEN | Open a file on a channel | [OPEN](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/open_verb.htm) |
| READ | Read with field parsing | [READ](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/read_verb.htm) |
| READ RECORD | Read raw bytes | [READ RECORD](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/read_record_verb.htm) |
| WRITE RECORD | Write raw bytes | [WRITE RECORD](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/write_record_verb.htm) |
| EXTRACT | Lock and read a record | [EXTRACT](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/extract_verb.htm) |
| CLOSE | Close a channel | [CLOSE](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/close_verb.htm) |
| REMOVE | Delete a record | [REMOVE](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/remove_verb.htm) |
| DIM | Dimension a string template | [DIM](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/dim_verb.htm) |

## Core Concepts

### Channels: Your File Handles

In BBj, you open a file on a **channel** - an integer that serves as your reference to that open file.

```bbj
REM Open a customer file on channel 1
OPEN(1) "CUSTOMER.DAT"

REM Read from it
READ RECORD(1, KEY=custId$) rec$

REM Always close when done
CLOSE(1)
```

:::tip
Use the `UNT` function to get the next available unused channel number instead of hardcoding:
```bbj
chan = UNT
OPEN(chan) "CUSTOMER.DAT"
```
:::

### String Templates: Your Schema

Here's where BBj differs dramatically from SQL: **the file knows nothing about your data structure**. A BBj file stores raw bytes. The interpretation of those bytes lives in your code via **string templates**.

```bbj
REM Define a template describing the record layout
DIM rec$:"CUST_ID:C(10),NAME:C(30),BALANCE:N(12),ACTIVE:C(1)"

REM The template is NOT stored in the file - it's only in your program
```

:::note
If you read a file with the wrong template, you get garbage. If you write with the wrong template, you corrupt your data. Store templates in shared include files or use the BBj Data Dictionary for production systems.
:::

### Template Field Types

| Type | Description | Example | Use Case |
|------|-------------|---------|----------|
| C | Character string | `NAME:C(30)` | Text fields |
| N | Numeric string | `BALANCE:N(12)` | Numbers as readable text |
| I | Signed binary integer | `COUNT:I(4)` | Compact integer storage |
| B | Business floating point | `AMOUNT:B` | Currency, financial data |

For new development, use `C` for text, `N` or `B` for currency, and `I` for integers.

### Accessing Template Fields

Once you dimension a string with a template, access fields by name:

```bbj
DIM rec$:"CUST_ID:C(10),NAME:C(30),BALANCE:N(12)"

REM Read a record
READ RECORD(chan, KEY=key$) rec$

REM Access fields - note the dot notation
PRINT rec.CUST_ID$        ; REM String access (note the $)
PRINT rec.NAME$
PRINT rec.BALANCE         ; REM Numeric access (no $ for numbers)

REM Modify fields
rec.BALANCE = rec.BALANCE + 100.00
rec.NAME$ = "New Name"

REM Write back
WRITE RECORD(chan) rec$
```

## BBj File Types

### MKEYED Files: The Modern Standard

MKEYED (Multi-Keyed) files are the recommended file type for new development:

- Up to 16 keys per file
- B-tree indexing for fast lookups
- Dynamic space allocation
- Support for SQL access via the BBj Data Dictionary

**Single-keyed** - you specify the key explicitly:
```bbj
WRITE RECORD(chan, KEY="CUST001") rec$
```

**Multi-keyed** (recommended) - key comes from record content:
```bbj
REM Key is automatically extracted from specific byte positions
WRITE RECORD(chan) rec$
```

### Legacy File Types

You may encounter these in existing applications:

- **DIRECT**: Combines a hash table with a single index. Fixed size, must be pre-allocated.
- **SORT**: Like DIRECT but with zero record size - stores only keys.
- **XKEYED/VKEYED**: Extended versions for larger keys or variable-length records.

For new development, prefer MKEYED.

## Reading and Writing Records

### The READ Verb

```bbj
REM Read by key
READ RECORD(chan, KEY="CUST001", DOM=not_found) rec$

REM Read next record (sequential)
READ RECORD(chan, END=end_of_file) rec$
```

**Key options:**
- `KEY=string` - position to specific key before reading
- `KNUM=int` - select which key chain to use (multi-keyed files)
- `DOM=lineref` - branch if key not found
- `END=lineref` - branch at end of file
- `ERR=lineref` - branch on any error
- `TIM=int` - timeout in seconds

### The EXTRACT Verb: Pessimistic Locking

EXTRACT works like READ but **locks the record** for exclusive access:

```bbj
REM Lock and read
EXTRACT RECORD(chan, KEY="CUST001", DOM=not_found, TIM=10) rec$

REM Record is now locked - other users cannot EXTRACT or WRITE it
REM Modify the data
rec.BALANCE = rec.BALANCE - 100.00

REM Write releases the lock
WRITE RECORD(chan) rec$
```

:::note
By default, BBj uses advisory locking - READ can still read locked records, only EXTRACT and WRITE are blocked.
:::

### The Standard Update Pattern

```bbj
EXTRACT_UPDATE:
    REM Lock and read
    EXTRACT RECORD(chan, KEY=custId$, DOM=NOT_FOUND, TIM=10, ERR=LOCK_ERROR) rec$

    REM Modify
    rec.BALANCE = rec.BALANCE + depositAmount
    rec.LAST_UPDATED$ = DATE(0:"%Y-%m-%d")

    REM Write (automatically unlocks)
    WRITE RECORD(chan) rec$
    RETURN

NOT_FOUND:
    PRINT "Customer not found: ", custId$
    RETURN

LOCK_ERROR:
    PRINT "Could not lock record: ", ERR
    RETURN
```

### WRITE Behavior

- If the key exists: **overwrites** the record
- If the key doesn't exist: **inserts** a new record

To prevent accidental overwrites:
```bbj
REM DOM= on WRITE branches if key already exists
WRITE RECORD(chan, KEY=newKey$, DOM=already_exists) rec$
```

## Sequential File Processing

When you READ without specifying a KEY, BBj reads the next record in the current key chain:

```bbj
REM Position to start of file
READ RECORD(chan, KEY="", DOM=*NEXT) rec$

REM Read all records sequentially
WHILE 1
    READ RECORD(chan, END=done) rec$
    GOSUB PROCESS_RECORD
WEND

done:
    PRINT "Finished processing"
```

:::tip
For performance, don't use KEY= unnecessarily during sequential scans - let the file pointer advance naturally:
```bbj
REM WRONG - slow!
WHILE 1
    READ RECORD(chan, KEY=KEY(chan), END=done) rec$
WEND

REM RIGHT - fast sequential access
WHILE 1
    READ RECORD(chan, END=done) rec$
WEND
```
:::

## SQL Equivalents Quick Reference

| SQL Operation | BBj Equivalent |
|---------------|----------------|
| `SELECT * FROM t WHERE id = 'X'` | `READ RECORD(chan, KEY="X", DOM=not_found) rec$` |
| `SELECT ... FOR UPDATE` | `EXTRACT RECORD(chan, KEY="X", DOM=not_found) rec$` |
| `INSERT INTO t VALUES (...)` | `WRITE RECORD(chan, KEY=k$, DOM=exists) rec$` |
| `UPDATE t SET ... WHERE id = 'X'` | EXTRACT, modify template fields, WRITE |
| `DELETE FROM t WHERE id = 'X'` | `REMOVE(chan, KEY="X", DOM=not_found)` |
| `SELECT * FROM t ORDER BY key` | Sequential READ through key chain |
| `SELECT * FROM t ORDER BY alt_key` | Sequential READ with `KNUM=n` |

## Error Handling

### Common Error Codes

| Error | Meaning | Typical Cause |
|-------|---------|---------------|
| 0 | Record locked | Another user has EXTRACTed this record |
| 2 | End of file | No more records in the key chain |
| 11 | Record not found | KEY= specified a non-existent key |
| 18 | File locked | Another process has exclusive file lock |

### Error Handling Pattern

```bbj
READ_WITH_HANDLING:
    READ RECORD(chan, KEY=key$, DOM=MISSING, ERR=ERROR) rec$
    REM Success - process record
    RETURN

MISSING:
    REM Key doesn't exist (DOM= branch)
    PRINT "Record not found"
    RETURN

ERROR:
    REM Other error (ERR= branch)
    SWITCH ERR
        CASE 0
            PRINT "Record locked by another user"
            BREAK
        CASE 2
            PRINT "End of file reached"
            BREAK
        CASE DEFAULT
            PRINT "Unexpected error: ", ERR
            BREAK
    SWEND
    RETURN
```

## Practical Example: Customer File Operations

```bbj
REM ===== Customer File Operations Example =====

REM Template definition
customer_tpl$ = "CUST_ID:C(10),NAME:C(40),EMAIL:C(50),BALANCE:N(12),CREATED:C(10),ACTIVE:C(1)"

REM Open the file
chan = UNT
OPEN(chan, ERR=OPEN_ERROR) "CUSTOMERS.DAT"
DIM rec$:customer_tpl$

REM ----- Create a new customer -----
GOSUB CREATE_CUSTOMER

REM ----- Read a customer -----
GOSUB READ_CUSTOMER

REM ----- Update customer balance -----
GOSUB UPDATE_BALANCE

REM ----- List all active customers -----
GOSUB LIST_ACTIVE

REM ----- Clean up -----
CLOSE(chan)
END

REM ===== Subroutines =====

CREATE_CUSTOMER:
    rec.CUST_ID$ = "CUST000001"
    rec.NAME$ = "Acme Corporation"
    rec.EMAIL$ = "contact@acme.com"
    rec.BALANCE = 0
    rec.CREATED$ = DATE(0:"%Y-%m-%d")
    rec.ACTIVE$ = "Y"

    WRITE RECORD(chan, DOM=CUST_EXISTS) rec$
    PRINT "Customer created: ", rec.CUST_ID$
    RETURN

CUST_EXISTS:
    PRINT "Customer already exists: ", rec.CUST_ID$
    RETURN

READ_CUSTOMER:
    custId$ = "CUST000001"
    READ RECORD(chan, KEY=custId$, DOM=CUST_NOT_FOUND) rec$
    PRINT "Customer: ", rec.NAME$, " Balance: ", rec.BALANCE
    RETURN

CUST_NOT_FOUND:
    PRINT "Customer not found"
    RETURN

UPDATE_BALANCE:
    custId$ = "CUST000001"
    amount = 500.00

    EXTRACT RECORD(chan, KEY=custId$, DOM=CUST_NOT_FOUND, TIM=10, ERR=LOCK_FAILED) rec$
    rec.BALANCE = rec.BALANCE + amount
    WRITE RECORD(chan) rec$
    PRINT "New balance: ", rec.BALANCE
    RETURN

LOCK_FAILED:
    PRINT "Could not lock record - try again later"
    RETURN

LIST_ACTIVE:
    PRINT "Active Customers:"
    PRINT "================="

    READ RECORD(chan, KEY="", DOM=*NEXT) rec$

    WHILE 1
        READ RECORD(chan, END=LIST_DONE) rec$
        IF rec.ACTIVE$ = "Y" THEN
            PRINT rec.CUST_ID$, " - ", rec.NAME$
        FI
    WEND

LIST_DONE:
    RETURN

OPEN_ERROR:
    PRINT "Failed to open customer file: ", ERR
    END
```

## Exercises

1. **Modify the example**: Add a `DELETE_CUSTOMER` subroutine that uses the [REMOVE](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/remove_verb.htm) verb to delete a customer by ID.

2. **Add a search**: Create a subroutine that lists all customers with a balance greater than a specified amount.

3. **Error handling**: Enhance the `UPDATE_BALANCE` subroutine to retry the EXTRACT up to 3 times if the record is locked.

:::tip
Look at the [FIN()](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/fin_function.htm) function to get information about an open file, including the record count.
:::

## Key Takeaways

1. **Channels are file handles** - open, use, close. Use `UNT` to get available channel numbers.
2. **Templates are your schema** - but they live in code, not the file.
3. **MKEYED is the modern standard** - prefer multi-keyed variants for new development.
4. **EXTRACT for locking** - use the EXTRACT/modify/WRITE pattern for safe updates.
5. **No transactions** - design your updates carefully; there's no rollback.

## Further Reading

- [BBj File System Overview](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/File_System_Overview.htm)
- [String Templates](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/String_Templates.htm)
- [MKEYED Files](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/MKEYED_Files.htm)
- [BBj Data Dictionary](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBjDataDictionary.htm) - for SQL access to BBj files
