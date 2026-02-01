# Phase 5: Data and Application Chapters - Research

**Researched:** 2026-02-01
**Domain:** BBj SQL access, Java interop, GUI event handling, console debugging
**Confidence:** MEDIUM-HIGH (verified against official BASIS documentation for most claims)

## Summary

This phase adds four new chapters covering database/SQL access, Java interop, event handling, and debugging. Research focused on the specific BBj APIs for each domain: the SQL verb family (SQLOPEN/SQLPREP/SQLEXEC/SQLFETCH/SQLCLOSE), the event callback registration patterns (CALLBACK verb and setCallback method), the Java libraries bundled with BBj 25.x, and the console debugging toolkit.

Key discoveries: (1) BBj 25.x bundles both `org.json` (json-20250107.jar) and Google Gson (gson-2.12.1.jar), so JSON parsing works out of the box without external JARs. (2) The primary SQL pattern uses template-based string access via SQLTMPL/SQLFETCH, not BBjRecordSet iteration -- BBjRecordSet is primarily for data-bound GUI controls. (3) BBj 25 requires Java 21 (JDK, not JRE), so all Java 8+ APIs (Base64, HttpURLConnection, etc.) are available. (4) The ChileCompany sample database's confirmed tables are CUSTOMER and ITEM, with partial evidence of order-related tables.

**Primary recommendation:** Teach the SQLOPEN/SQLPREP/SQLEXEC/SQLFETCH/SQLCLOSE verb pattern as the standard SQL workflow (not BBjRecordSet). Use org.json.JSONObject for JSON examples since it ships with BBj. Teach setCallback with method targets as the primary event pattern. Focus debugging on console techniques (dot-stepping, DUMP, SETTRACE) per the CONTEXT.md decisions.

## Standard Stack

This phase does not add new npm/JS dependencies. The "stack" here is BBj's built-in APIs and the Java libraries bundled with BBj 25.x.

### BBj SQL Verbs (Database Chapter)

| Verb/Function | Purpose | Key Syntax |
|---------------|---------|------------|
| SQLOPEN | Open database connection | `SQLOPEN(chan{,MODE=str}{,ERR=lineref})dbname$` |
| SQLPREP | Prepare SQL statement | `SQLPREP(chan{,ERR=lineref})sql$` |
| SQLEXEC | Execute prepared statement | `SQLEXEC(chan)arg1,arg2,...` |
| SQLFETCH | Fetch next result row | `result$=SQLFETCH(chan{,IND=1}{,END=lineref}{,ERR=lineref})` |
| SQLTMPL | Get result template | `template$=SQLTMPL(chan{,IND=1}{,ERR=lineref})` |
| SQLCLOSE | Close SQL channel | `SQLCLOSE(chan)` |
| SQLERR | Get SQL error text | `err$=SQLERR(chan{,ERR=lineref})` |
| SQLLIST | List available databases | `list$=SQLLIST(chan)` |

### Java Libraries Bundled with BBj 25.x (Java Interop Chapter)

| Library | JAR File | Purpose | Confidence |
|---------|----------|---------|------------|
| org.json | json-20250107.jar | JSON parsing/creation (JSONObject, JSONArray) | HIGH -- confirmed in BBj 25.x Classpath Overview |
| Google Gson | gson-2.12.1.jar | JSON via setProperty/getProperty, also usable directly | HIGH -- confirmed in BBj 25.x Classpath Overview |
| json-smart | json-smart-2.5.2.jar | JSON processing (internal use) | HIGH -- confirmed in BBj 25.x Classpath Overview |
| java.util.Base64 | JDK built-in (Java 8+) | Base64 encoding/decoding | HIGH -- BBj 25 requires Java 21 |
| java.security.MessageDigest | JDK built-in | Hashing (SHA-256, MD5) | HIGH -- standard JDK |
| java.util.UUID | JDK built-in | UUID/GUID generation | HIGH -- standard JDK |
| java.net.HttpURLConnection | JDK built-in | HTTP requests | HIGH -- standard JDK |
| java.net.http.HttpClient | JDK built-in (Java 11+) | Modern HTTP client | HIGH -- BBj 25 requires Java 21 |

### Event Handling APIs (Event Chapter)

| API | Type | Purpose |
|-----|------|---------|
| BBjControl::setCallback(int, String) | Method | Register label-based callback |
| BBjControl::setCallback(int, CustomObject, String) | Method | Register method-based callback (primary teaching target) |
| CALLBACK verb | Verb | Legacy procedural callback registration |
| PROCESS_EVENTS | Verb | Blocking event loop |
| REMOVE_CALLBACK | Verb | Deregister callback |
| BBjAPI().getSysGui().getLastEvent() | Method | Get last event in label-based callbacks |

### Java Version

BBj 25 (current) requires **Java 21 LTS**. BBj does NOT bundle its own JRE -- it requires an externally installed JDK (Adoptium/Temurin or Oracle). This means all Java 8+ through Java 21 APIs are available, including:
- `java.util.Base64` (Java 8+)
- `java.net.http.HttpClient` (Java 11+)
- Text blocks (Java 15+)
- Records (Java 16+)
- Pattern matching (Java 16+)

**Confidence:** HIGH -- confirmed via BASIS documentation and Eclipse Plug-ins setup guide.

## Architecture Patterns

### Chapter Directory Structure

Based on the existing sidebar configuration (already set up in Phase 2), the chapter directories are:

```
docs/
  08-database-sql/         # Already exists as placeholder
    index.md               # Chapter overview + At a Glance table
    01-connecting.md       # SQLOPEN, ChileCompany, Data Dictionary context
    02-queries.md          # SQLPREP, SQLEXEC, SQLFETCH, parameterized queries
    03-recordset.md        # BBjRecordSet (OO approach), transactions
  09-java-interop/         # Already exists as placeholder
    index.md               # Overview of Java-from-BBj, three tiers
    01-basics.md           # use statements, creating objects, type mapping (absorbed from OOP chapter)
    02-advanced.md         # Interfaces, generics, exception handling, classpath
    03-libraries.md        # Practical: JSON, HTTP, Base64, Hashing, UUID, collections iteration
  10-event-handling/       # Already exists as placeholder
    index.md               # Event model overview, three generations
    01-setcallback.md      # setCallback with labels and methods, PROCESS_EVENTS
    02-events.md           # Event types table, event objects, common patterns
    03-legacy.md           # CALLBACK verb, READ RECORD loop (legacy context only)
  11-debugging/            # Already exists as placeholder
    index.md               # Overview of debugging approaches
    01-console.md          # Breaking to console, dot-stepping, variable inspection
    02-tracing.md          # DUMP, SETTRACE, logging techniques
```

### Pattern: SQL Workflow (SQLOPEN through SQLCLOSE)

**What:** Template-based SQL access using BBj's SQL verbs
**When to use:** Any database access in BBj programs
**Source:** Official BASIS documentation

```bbj
rem Open connection to local BBj database
SQLOPEN(1)"ChileCompany"

rem Prepare a parameterized SELECT
SQLPREP(1)"SELECT FIRST_NAME, LAST_NAME, COMPANY FROM CUSTOMER WHERE CUST_NUM = ?"

rem Get the result template and dimension a record variable
DIM rec$:SQLTMPL(1)

rem Execute with parameter value
SQLEXEC(1)"000001"

rem Fetch results row by row
WHILE 1
    rec$ = SQLFETCH(1, ERR=done)
    PRINT rec.FIRST_NAME$, " ", rec.LAST_NAME$, " - ", rec.COMPANY$
WEND

done:
SQLCLOSE(1)
```

**Key insight:** The SQLTMPL function returns a template string like `FIRST_NAME:C(20),LAST_NAME:C(30),COMPANY:C(30)` that allows field access via dot notation on the dimensioned string (e.g., `rec.FIRST_NAME$`). This is the standard BBj pattern -- it is NOT the same as JDBC ResultSet iteration.

### Pattern: setCallback with Custom Objects (Modern Event Handling)

**What:** Object-oriented event registration using setCallback with method targets
**When to use:** All new BBj GUI programs
**Source:** BBj Custom Objects Tutorial Program #6

```bbj
class public MyApp
    field private BBjWindow window!
    field private BBjButton button!
    field private BBjInputE input!

    method public void run()
        sysgui! = BBjAPI().openSysGui("X0")
        #window! = sysgui!.addWindow(10, 10, 400, 200, "My App", $00100083$)
        #button! = #window!.addButton(201, 50, 50, 100, 30, "Click Me")
        #input! = #window!.addInputE(202, 50, 100, 200, 30, "")

        #button!.setCallback(#button!.ON_BUTTON_PUSH, #this!, "onButtonPush")
        #input!.setCallback(#input!.ON_EDIT_MODIFY, #this!, "onTextChange")
        #window!.setCallback(#window!.ON_CLOSE, #this!, "onClose")

        process_events
    methodend

    method public void onButtonPush(BBjButtonPushEvent event!)
        a = msgbox("Button pushed! Text: " + #input!.getText(), 0, "Event")
    methodend

    method public void onTextChange(BBjEditModifyEvent event!)
        print "Text changed to: " + event!.getText()
    methodend

    method public void onClose(BBjCloseEvent event!)
        release
    methodend
classend

app! = new MyApp()
app!.run()
```

### Pattern: Label-Based Callback (Simpler Procedural Style)

**What:** setCallback with string label targets
**When to use:** Simple procedural programs, quick scripts
**Source:** BBj Reference Guide, setCallback documentation

```bbj
sysgui! = BBjAPI().openSysGui("X0")
window! = sysgui!.addWindow(10, 10, 400, 200, "Simple App", $00100083$)
button! = window!.addButton(201, 50, 50, 100, 30, "Click Me")

button!.setCallback(button!.ON_BUTTON_PUSH, "onButtonPush")
window!.setCallback(window!.ON_CLOSE, "onClose")

process_events

onButtonPush:
    event! = BBjAPI().getSysGui().getLastEvent()
    a = msgbox("Button clicked!", 0, "Event")
return

onClose:
    release
return
```

### Anti-Patterns to Avoid

- **Using BBjRecordSet for simple SQL queries:** BBjRecordSet is designed for data-bound GUI controls (grids, navigators). For programmatic data access, use the SQLFETCH pattern. Teaching BBjRecordSet as the primary SQL access pattern would confuse readers.
- **Using CALLBACK verb in new code:** The CALLBACK verb uses context IDs and control IDs (integers), not object references. It works but is the middle-generation approach. setCallback on control objects is cleaner.
- **Forgetting SQLCLOSE:** SQL channels are a limited resource. Always close them in cleanup code.
- **Catching SQLFETCH end-of-data with ERR= instead of END=:** Use `END=lineref` for the normal end-of-results condition, reserving `ERR=lineref` for actual errors.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON parsing | String manipulation or regex | `org.json.JSONObject` / `org.json.JSONArray` | Ships with BBj 25.x (json-20250107.jar), handles escaping, nesting, arrays |
| JSON creation | String concatenation | `org.json.JSONObject.put()` | Proper escaping, type handling |
| HTTP requests | Low-level socket code | `java.net.HttpURLConnection` or `java.net.http.HttpClient` | Standard JDK, handles redirects, encoding |
| Base64 encoding | Manual bit manipulation | `java.util.Base64.getEncoder()` / `.getDecoder()` | Standard JDK since Java 8 |
| UUID generation | Random string concatenation | `java.util.UUID.randomUUID()` | RFC 4122 compliant, standard JDK |
| Hashing | External library | `java.security.MessageDigest` | Standard JDK, supports SHA-256, MD5, etc. |
| SQL parameterization | String concatenation into SQL | `SQLPREP` with `?` placeholders + `SQLEXEC` args | Prevents SQL injection, enables statement reuse |

**Key insight:** BBj 25.x bundles three JSON libraries (org.json, Gson, json-smart). For the tutorial, use `org.json` since it is the simplest API and is explicitly bundled. Gson is also available but its primary purpose in BBj is for `setProperty`/`getProperty` on controls.

## Common Pitfalls

### Pitfall 1: SQL Channel vs File Channel Confusion
**What goes wrong:** Developers try to use SQL channels (from SQLOPEN) with file I/O functions like FID() or FIN(), or try to use channel 0 for SQL.
**Why it happens:** BBj uses integer channels for both file I/O and SQL, but they are separate namespaces.
**How to avoid:** SQL channels are distinct from I/O channels. SQLOPEN does not accept channel 0. Use different variable naming (e.g., `sqlchan` vs `filechan`).
**Warning signs:** Error messages about invalid channel when mixing SQL and file operations.

### Pitfall 2: Forgetting SQLTMPL Before DIM
**What goes wrong:** Trying to access fields on SQLFETCH results without first dimensioning with SQLTMPL.
**Why it happens:** Developers coming from other languages expect column-name access without template setup.
**How to avoid:** Always call `DIM rec$:SQLTMPL(chan)` after SQLPREP and before SQLFETCH. The template defines which fields are accessible via dot notation.
**Warning signs:** Errors when trying to access `rec.FIELD_NAME$`.

### Pitfall 3: SQLFETCH End-of-Data Returns ERROR 2
**What goes wrong:** When SQLFETCH reaches the end of results, it generates ERROR 2 (end of file). This is normal flow, not an error.
**Why it happens:** BBj signals end-of-data the same way as end-of-file in record I/O.
**How to avoid:** Use `END=lineref` parameter on SQLFETCH for clean end-of-data handling. Use `ERR=lineref` separately for actual errors. Or loop with `ERR=` and check the error number.
**Warning signs:** Programs crashing at end of query results.

### Pitfall 4: process_events Must Come After All Setup
**What goes wrong:** Program exits immediately after creating window and controls.
**Why it happens:** Without `process_events`, the program reaches the end of code and terminates.
**How to avoid:** Place `process_events` after all control creation and callback registration, before any label subroutines.
**Warning signs:** Window flashes briefly then disappears.

### Pitfall 5: setCallback Method Parameter Type Must Match Event
**What goes wrong:** Registering a callback method with the wrong event parameter type causes Error 208 or silent failures.
**Why it happens:** When using `setCallback(eventType, customObj, methodName)`, the method must accept exactly one parameter whose type matches the event class for that eventType.
**How to avoid:** For `ON_BUTTON_PUSH`, the method must accept `BBjButtonPushEvent`. For `ON_CLOSE`, accept `BBjCloseEvent`. For `ON_EDIT_MODIFY`, accept `BBjEditModifyEvent`.
**Warning signs:** Error 208 (Multi Thread Error) or callback not firing.

### Pitfall 6: Variable Type Suffixes in SQL Results
**What goes wrong:** Accessing a character field without `$` suffix or a numeric field with `$`.
**Why it happens:** SQLTMPL returns templates with type codes (C for character, N for numeric). The DIM statement creates typed fields. Accessing `rec.FIRST_NAME` (no suffix) when the field is character will fail.
**How to avoid:** Character fields from SQL templates use `$` suffix: `rec.FIRST_NAME$`. Numeric fields have no suffix: `rec.COST`.
**Warning signs:** Type mismatch errors when printing or assigning SQL results.

### Pitfall 7: BBj Treats Java Generics as Raw Types
**What goes wrong:** Developers try to use generic syntax like `HashMap<String, String>` in BBj.
**Why it happens:** Java knowledge leads to expecting generics syntax.
**How to avoid:** Always use raw types: `new HashMap()`, not `new HashMap<String, String>()`. BBj resolves types at runtime.
**Warning signs:** Syntax errors on angle brackets.

### Pitfall 8: Console Debugging Unavailable in Production
**What goes wrong:** Developers rely on console debugging techniques that are disabled in deployed applications.
**Why it happens:** Enterprise Manager can disable console access via "Disallow Console" setting.
**How to avoid:** Use `System.out.println()` for BBj debug log output (writes to `<bbj>/log` directory). Use SETTRACE with file output. These work even when console is disabled.
**Warning signs:** Ctrl-C/Ctrl-Break does not break to console.

## Code Examples

### Database: Complete SELECT with Parameters

```bbj
rem === Query customers by last name pattern ===
rem Open ChileCompany sample database
SQLOPEN(1)"ChileCompany"

rem Prepare parameterized query
SQLPREP(1)"SELECT CUST_NUM, FIRST_NAME, LAST_NAME, COMPANY FROM CUSTOMER WHERE LAST_NAME LIKE ?"

rem Get result template and dimension record variable
DIM rec$:SQLTMPL(1)

rem Execute with parameter (% is SQL wildcard)
SQLEXEC(1)"S%"

rem Fetch and display results
PRINT "Customers with last name starting with S:"
PRINT "---"
count = 0
WHILE 1
    rec$ = SQLFETCH(1, END=done)
    PRINT rec.CUST_NUM$, " ", rec.FIRST_NAME$, " ", rec.LAST_NAME$
    count = count + 1
WEND

done:
PRINT "---"
PRINT count, " customers found"
SQLCLOSE(1)
```

### Database: INSERT with Prepared Statement

```bbj
rem === Insert a new record ===
SQLOPEN(1)"ChileCompany"
SQLPREP(1)"INSERT INTO CUSTOMER (CUST_NUM, FIRST_NAME, LAST_NAME, COMPANY) VALUES (?, ?, ?, ?)"
SQLEXEC(1)"999999", "Test", "User", "Example Corp"
SQLCLOSE(1)
PRINT "Record inserted"
```

### Java Interop: JSON Parsing with org.json

```bbj
use org.json.JSONObject
use org.json.JSONArray

rem Create JSON
json! = new JSONObject()
json!.put("name", "Alice")
json!.put("role", "Developer")
json!.put("active", BBjAPI.TRUE)

rem Add nested array
skills! = new JSONArray()
skills!.put("BBj")
skills!.put("Java")
skills!.put("SQL")
json!.put("skills", skills!)

print json!.toString(2)

rem Parse JSON string
parsed! = new JSONObject("{""name"":""Bob"",""age"":30}")
print "Name: ", parsed!.getString("name")
print "Age: ", str(parsed!.getInt("age"))
```

### Java Interop: HTTP Request

```bbj
use java.net.URL
use java.net.HttpURLConnection
use java.io.BufferedReader
use java.io.InputStreamReader

rem Simple GET request
url! = new URL("https://httpbin.org/get")
conn! = cast(HttpURLConnection, url!.openConnection())
conn!.setRequestMethod("GET")

code = conn!.getResponseCode()
print "Response code: ", code

rem Read response body
reader! = new BufferedReader(new InputStreamReader(conn!.getInputStream()))
line! = reader!.readLine()
while line! <> null()
    print line!
    line! = reader!.readLine()
wend
reader!.close()
conn!.disconnect()
```

### Java Interop: Base64, Hashing, UUID

```bbj
use java.util.Base64
use java.security.MessageDigest
use java.util.UUID

rem Base64 encoding/decoding
encoder! = Base64.getEncoder()
encoded$ = encoder!.encodeToString(new java.lang.String("Hello BBj").getBytes())
print "Base64: ", encoded$

decoder! = Base64.getDecoder()
decoded! = new java.lang.String(decoder!.decode(encoded$))
print "Decoded: ", decoded!

rem SHA-256 hash
md! = MessageDigest.getInstance("SHA-256")
hash! = md!.digest(new java.lang.String("password123").getBytes())
rem Convert bytes to hex string
sb! = new StringBuilder()
for i = 0 to hash!.length - 1
    sb!.append(String.format("%02x", hash![i]))
next i
print "SHA-256: ", sb!.toString()

rem UUID generation
uuid! = UUID.randomUUID()
print "UUID: ", uuid!.toString()
```

### Event Handling: Complete GUI Application with setCallback

```bbj
class public ContactForm
    field private BBjWindow window!
    field private BBjInputE nameInput!
    field private BBjInputE emailInput!
    field private BBjButton submitBtn!

    method public void run()
        sysgui! = BBjAPI().openSysGui("X0")
        #window! = sysgui!.addWindow(10, 10, 350, 200, "Contact Form", $00100083$)

        #window!.addStaticText(200, 20, 20, 80, 25, "Name:")
        #nameInput! = #window!.addInputE(201, 100, 20, 200, 25, "")

        #window!.addStaticText(202, 20, 60, 80, 25, "Email:")
        #emailInput! = #window!.addInputE(203, 100, 60, 200, 25, "")

        #submitBtn! = #window!.addButton(204, 100, 110, 100, 30, "Submit")

        rem Register callbacks with method targets
        #submitBtn!.setCallback(#submitBtn!.ON_BUTTON_PUSH, #this!, "onSubmit")
        #nameInput!.setCallback(#nameInput!.ON_EDIT_MODIFY, #this!, "onNameChange")
        #window!.setCallback(#window!.ON_CLOSE, #this!, "onClose")

        process_events
    methodend

    method public void onSubmit(BBjButtonPushEvent event!)
        name$ = #nameInput!.getText()
        email$ = #emailInput!.getText()
        a = msgbox("Submitted: " + name$ + " (" + email$ + ")", 0, "Contact Form")
    methodend

    method public void onNameChange(BBjEditModifyEvent event!)
        print "Name field: ", event!.getText()
    methodend

    method public void onClose(BBjCloseEvent event!)
        release
    methodend
classend

app! = new ContactForm()
app!.run()
```

### Debugging: DUMP and SETTRACE

```bbj
rem === DUMP: Output all variables to file ===
name$ = "Alice"
count = 42
items! = BBjAPI().makeVector()
items!.addItem("one")
items!.addItem("two")

rem Dump all variables to a file
open(7, mode="O_CREATE,O_TRUNC")"/tmp/debug_dump.txt"
dump(7)
close(7)
print "Variables dumped to /tmp/debug_dump.txt"

rem === SETTRACE: Record execution trace ===
open(8, mode="O_CREATE,O_TRUNC")"/tmp/debug_trace.txt"
settrace(8)

rem Code being traced
for i = 1 to 3
    print "Loop iteration: ", i
next i

endtrace
close(8)
print "Trace written to /tmp/debug_trace.txt"
```

## ChileCompany Database Schema

The ChileCompany sample database ships with BBj and requires no setup. It is opened with `SQLOPEN(chan)"ChileCompany"`.

### Confirmed Tables (HIGH confidence)

| Table | Key Columns | Source |
|-------|-------------|--------|
| CUSTOMER | CUST_NUM:C(6), FIRST_NAME:C(20), LAST_NAME:C(30), COMPANY:C(30), SALESPERSON, SALES_YTD | Widget Wizard docs, SQL examples |
| ITEM | DESCRIPTION, COST, PROD_CAT (with FULLTEXT index on DESCRIPTION) | Stored procedure docs, FULLTEXT docs |

### Likely Tables (MEDIUM confidence)

| Table | Evidence |
|-------|----------|
| ORDER-related (ORDER_HDR / ORDER_DETAIL or similar) | Docs reference "returning all orders with a customer" |
| CATEGORY | SQLTMPL example shows PROD_CAT:C(2), DESC:C(30), COST_METHOD:C(5), etc. |
| VENDOR | Common in demo databases but not explicitly confirmed |

### Stored Procedures

| Procedure | Description |
|-----------|-------------|
| ITEM_DETAIL | Accepts Product Category, returns ITEM records |
| CUST_DETAIL | Customer detail lookup |

### Data Dictionary Location

Default path: `<bbj install dir>/demos/chiledd/data/`
DATA path variable: `(DATA)CUSTOMER` maps to `/usr/local/basis/demos/data/CUSTOMER`

**Recommendation for tutorial:** Use CUSTOMER table for all primary examples (SELECT, INSERT, WHERE clauses). It has the most well-documented schema with clear column names. Use ITEM table for secondary examples (cost calculations, FULLTEXT search mentions). Do not depend on tables that aren't explicitly confirmed.

## Event Types Reference

### Core Events for the Tutorial (HIGH confidence)

These are the events to teach, prioritized by frequency of use:

| Event Constant | Event Class | Fired By | Description |
|----------------|-------------|----------|-------------|
| ON_BUTTON_PUSH | BBjButtonPushEvent | BBjButton | Button clicked |
| ON_CLOSE | BBjCloseEvent | BBjWindow | Window close box clicked |
| ON_EDIT_MODIFY | BBjEditModifyEvent | BBjInputE, BBjEditBox | Text content changed |
| ON_GAINED_FOCUS | BBjGainedFocusEvent | Any control | Control received focus |
| ON_LOST_FOCUS | BBjLostFocusEvent | Any control | Control lost focus |

### Additional Events for Reference Table (MEDIUM confidence)

| Event Constant | Event Class | Description |
|----------------|-------------|-------------|
| ON_CHECK_ON | BBjCheckOnEvent | Checkbox checked |
| ON_CHECK_OFF | BBjCheckOffEvent | Checkbox unchecked |
| ON_LIST_SELECT | BBjListSelectEvent | List item selected |
| ON_LIST_CLICK | BBjListClickEvent | List item clicked |
| ON_MOUSE_DOWN | BBjMouseDownEvent | Mouse button pressed |
| ON_MOUSE_UP | BBjMouseUpEvent | Mouse button released |
| ON_RESIZE | BBjResizeEvent | Window resized |
| ON_FORM_VALIDATION | BBjFormValidationEvent | Form validation triggered |
| ON_INPUT_KEYPRESS | BBjInputKeypressEvent | Key pressed in input |
| ON_PAGE_LOADED | BBjPageLoadedEvent | HTML content loaded |

### Three-Generation Event Model

| Generation | Era | Mechanism | Key Syntax |
|------------|-----|-----------|------------|
| 1. READ RECORD | Visual PRO/5 | Poll SYSGUI event queue | `READ RECORD(sysgui,siz=6)event$` |
| 2. CALLBACK verb | BBj (procedural) | Register with context/control IDs | `CALLBACK(ON_BUTTON_PUSH,label,ctx,ctrlID)` |
| 3. setCallback | BBj (OO) | Register on control objects | `ctrl!.setCallback(ctrl!.ON_BUTTON_PUSH,obj!,"method")` |

### CALLBACK Verb Syntax (for Legacy Context Section)

```
CALLBACK(eventType, subroutineName, contextID {, controlID})
```

Parameters:
- eventType: Event constant (e.g., ON_BUTTON_PUSH)
- subroutineName: Label to GOSUB when event fires (must start with alpha, contain alphanumeric + underscore)
- contextID: Integer 0-32767 (window context)
- controlID: Integer 1-32767, optional (required for control-specific events)

The CALLBACK verb implicitly GOSUBs to the subroutine, so it must end with RETURN. This is different from setCallback which can target methods.

### PROCESS_EVENTS Syntax

```
PROCESS_EVENTS {,TIM=int}{,ERR=lineref}
```

- `TIM=int`: Timeout in seconds (BBj 17.0+). Returns after timeout if no events.
- `ERR=lineref`: Error branch (BBj 5.0+).
- Blocks until an event occurs, dispatches to registered callback, then blocks again.
- Programs can mix READ RECORD and PROCESS_EVENTS, but switching empties the event queue.

## SQLFETCH vs BBjRecordSet: Which to Teach

**Research finding:** There are two distinct patterns for SQL data access in BBj:

1. **SQL Verbs (SQLFETCH pattern):** SQLOPEN/SQLPREP/SQLEXEC/SQLFETCH/SQLCLOSE. This is the procedural, verb-based approach. Data comes back as templated strings. This is what most BBj code uses for programmatic data access.

2. **BBjRecordSet (OO pattern):** Created via BBjAPI, maintains a cursor with first()/next()/previous()/last(). Has getCurrentRecordData()/getFieldValue() methods. Primarily designed for data-bound GUI controls (BBjGrid, BBjNavigator, BBjDataBoundGrid).

**Recommendation:** Teach the SQLFETCH pattern as primary. It is simpler, more widely used in existing BBj code, and works without requiring BBjRecordSet's GUI-oriented infrastructure. Briefly mention BBjRecordSet as an alternative approach used with data-bound controls, and note that `getJDBCResultSet()` (BBj 9.0+) provides full JDBC ResultSet access if needed.

## Debugging Techniques Summary

From the "Debugging BBj in the Console" PDF and CONTEXT.md:

### Console Access
- **Ctrl-C / Ctrl-Break / ESC**: Break running program to console (behavior depends on terminal/stty settings)
- **ESCAPE verb**: Programmatically stop execution at a specific point
- **Untrapped errors**: Automatically drop to console
- **Console prompt**: `>` character

### Stepwise Execution
| Command | Action |
|---------|--------|
| `.` + Enter | Execute one line (single step) |
| `. n` | Execute next n lines |
| `..` | Step over (skips CALL, GOSUB, method calls) |
| `.. n` | Step over n lines |
| `methodret` | Exit current method early |

### Variable Inspection
| Command | Action |
|---------|--------|
| `PRINT varname` or `? varname` | Display variable value |
| `varname = newvalue` | Change variable at runtime |
| `? obj!.method()` | Call method and display result |
| `\searchstring` | Search for text in current program |

### DUMP Verb
- `DUMP` -- output all variables to console
- `DUMP(chan)` -- output to file channel
- `DUMP(0, MODE="vars,level="+str(tcb(13)))` -- filter by call level

### SETTRACE
- `SETTRACE` -- trace to console
- `SETTRACE(chan)` -- trace to file channel
- `ENDTRACE` -- stop tracing

### Logging Without Console
| Method | Output Destination | When to Use |
|--------|--------------------|-------------|
| `System.out.println(var$)` | BBj Debug log (`<bbj>/log/`) | Server-side debugging |
| `sysGui!.executeScript("console.log(...)")` | Browser console | BUI/DWC debugging |
| `MSGBOX(var$)` | Dialog popup | Quick visual check (remove before production) |

### Console Disabling
- Enterprise Manager "Disallow Console" setting
- `BBjAppServer::setDisallowConsole()` method
- `STBL("!CONPASS")` for console password protection

## Subpage Structure Recommendation

Based on content volume analysis and the Phase 4 pattern of index + 2-3 subpages:

### Database/SQL (08-database-sql) -- 3 subpages
1. **01-connecting.md** -- SQLOPEN, ChileCompany, connecting to databases, Data Dictionary light explanation, SQLCLOSE, error handling with SQLERR
2. **02-queries.md** -- SQLPREP with SELECT/INSERT/UPDATE/DELETE, SQLTMPL, SQLEXEC parameter binding, SQLFETCH iteration, complete working examples
3. **03-patterns.md** -- Transactions (SQLCOMMIT/SQLROLLBACK), BBjRecordSet brief overview, JDBC alternative via getJDBCConnection, File I/O bridge cross-link

### Java Interop (09-java-interop) -- 3 subpages
1. **01-basics.md** -- use statements, creating Java objects, calling methods, type mapping BBj<->Java (absorbed from OOP chapter content)
2. **02-advanced.md** -- Implementing Java interfaces, generics handling (raw types), exception handling across boundary, classpath configuration via Enterprise Manager
3. **03-libraries.md** -- Practical examples: org.json for JSON, HttpURLConnection for HTTP, Base64, MessageDigest, UUID, java.util.HashMap iteration patterns

### Event Handling (10-event-handling) -- 3 subpages
1. **01-setcallback.md** -- setCallback with labels and methods, PROCESS_EVENTS, building a complete GUI application, window close pattern
2. **02-events.md** -- Event types reference table, BBjEvent subclasses, accessing event properties, getLastEvent for label callbacks
3. **03-legacy.md** -- CALLBACK verb syntax, READ RECORD loop, SYSGUI device context (all as legacy reference, not primary teaching)

### Debugging (11-debugging) -- 2 subpages
1. **01-console.md** -- Breaking to console, dot-stepping, step-over, variable inspection, direct assignment, search in program, BEM error interpretation
2. **02-tracing.md** -- DUMP verb (to console, to file, filtered), SETTRACE/ENDTRACE, logging techniques (System.out.println, executeScript, MSGBOX), IDE debugger brief mention

**Rationale:** Debugging has less content volume than the other chapters, so 2 subpages suffice. The other three chapters each have enough distinct topic areas for 3 subpages.

## OOP Chapter Consolidation Plan

The existing `docs/03-object-oriented/02-using-java.md` content must be absorbed into the Java interop chapter. The plan:

1. **Move content to 09-java-interop/01-basics.md**: The existing file covers `use` imports, HashMap+Iterator, ArrayList, File, SimpleDateFormat, implementing Java interfaces (Comparator), and limitations. All of this maps to the "basics" subpage of the new chapter.

2. **Replace OOP subpage with pointer**: Replace `docs/03-object-oriented/02-using-java.md` with a brief stub that says "Java interop is covered in detail in the Java Interop chapter" with a link. Keep the same sidebar_position so existing navigation still works.

3. **Expand in new chapter**: The new Java interop chapter will go deeper than the OOP subpage: adding classpath configuration, more library examples, interface implementation with event callbacks, generics handling details.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| BBjHashMap | java.util.HashMap | Deprecated in recent BBj | Use HashMap directly with `use java.util.HashMap` |
| READ RECORD event loop | setCallback + process_events | BBj introduced setCallback | Modern BBj programs never use READ RECORD for events |
| CALLBACK verb | setCallback method | BBj Custom Objects | setCallback with method targets is the recommended pattern |
| SQLOPEN with SQL.INI | SQLOPEN with database name | BBj supports direct name reference | Local BBj databases don't need SQL.INI entries |
| Manual JSON string building | org.json JSONObject/JSONArray | json.jar bundled with BBj | No need for external library or string concatenation |
| Java 8 (older BBj) | Java 21 (BBj 25) | BBj 25 release | All modern Java APIs available (HttpClient, Base64, records, etc.) |

**Deprecated/outdated:**
- BBjHashMap: Deprecated, use java.util.HashMap
- READ RECORD event loop: Legacy, teach as history only
- CALLBACK verb: Still works but not the modern pattern
- Manual SQL.INI configuration for local databases: No longer needed for BBj databases on same BBjServices

## Open Questions

1. **Complete ChileCompany schema**
   - What we know: CUSTOMER and ITEM tables confirmed with partial column lists. CATEGORY table implied by SQLTMPL example.
   - What's unclear: Full list of all tables and their complete column definitions.
   - Recommendation: Use CUSTOMER and ITEM tables only in examples. If needed during planning, run `SQLOPEN(1)"ChileCompany"` then `SQLPREP(1)"SELECT TABLE_NAME FROM ALL_TABLES"` to enumerate. Or inspect via Enterprise Manager.

2. **BBjRecordSet creation from SQL**
   - What we know: BBjRecordSet exists and has navigation methods (first, next, previous, last, seek). Has getCurrentRecordData()/getFieldValue().
   - What's unclear: Exact factory method syntax for creating an SQL-based BBjRecordSet programmatically (the BBjAPI entry point).
   - Recommendation: Focus on SQLFETCH pattern as primary. Mention BBjRecordSet briefly for data-bound controls context only.

3. **SQLEXEC with multiple parameters**
   - What we know: Parameterized queries use `?` placeholders. SQLEXEC passes values positionally.
   - What's unclear: Exact syntax for multiple parameters -- comma-separated on SQLEXEC line, or separate SQLARG calls?
   - Recommendation: Based on the INSERT example syntax `SQLEXEC(1)val1$,val2$,val3$`, comma-separated values work. Verify during implementation by compiling test .bbj files.

4. **SQLFETCH END= vs ERR= behavior**
   - What we know: END= handles end-of-data (ERROR 2). ERR= handles actual errors.
   - What's unclear: Whether both can be specified simultaneously on the same SQLFETCH call.
   - Recommendation: Show END= as the clean pattern. Test with compiler during implementation.

## Sources

### Primary (HIGH confidence)
- [BBj 25.x Classpath Overview](https://documentation.basis.cloud/BASISHelp/WebHelp/b3odbc/Classpath_Overviews/BBj_25.x_Classpath_Overview.htm) -- bundled JARs (gson, org.json, json-smart)
- [SQLPREP Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/sqlprep_verb.htm) -- SQL prepare syntax
- [SQLOPEN Verb (BBj)](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/bbj-commands/sqlopen_verb_open_sql_channel_bbj.htm) -- BBj-specific SQLOPEN
- [SQLFETCH Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/sqlfetch_function.htm) -- fetch syntax with ChileCompany example
- [SQLTMPL Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/sqltmpl_function.htm) -- template function
- [SQLERR Function](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/sqlerr_function.htm) -- SQL error text
- [BBjControl::setCallback](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/SysGui/bbjcontrol/bbjcontrol_setcallback.htm) -- callback registration
- [CALLBACK Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/callback_verb.htm) -- legacy callback syntax
- [PROCESS_EVENTS Verb](https://documentation.basis.cloud/BASISHelp/WebHelp/commands/process_events_verb.htm) -- event loop
- [BBjEvent Objects](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjevents/bbjevent_objects.htm) -- event class hierarchy
- [Events Correspondence Table](https://documentation.basis.cloud/BASISHelp/WebHelp/bbjevents/events_correspondence_table.htm) -- event type mapping
- [Custom Objects Tutorial: Program #6](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_12program6.htm) -- callback patterns example
- [Calling Java from BBj](https://documentation.basis.cloud/BASISHelp/WebHelp/gridctrl/calling_java_from_bbj.htm) -- Java interop reference
- [SQL Command Execution](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/SQL/sql_command_execution.htm) -- SQLEXEC details
- [BBj-only Data Dictionary Overview](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/dbms/bbj-only_data_dictionary_overview.htm) -- data dictionary explanation
- [BASIS Product Compatibility with Java Releases](https://basis.cloud/knowledge-base/kb-basis-support-java-releases/) -- BBj 25 requires Java 21
- [Eclipse Plug-Ins Setup](https://basis.cloud/eclipseplug-ins/) -- BBj 25 + Java 21 confirmed

### Secondary (MEDIUM confidence)
- [Widget Wizard](https://documentation.basis.cloud/BASISHelp/WebHelp/bbutil/BBjGridExWidget/BBjGridExWidget.htm) -- ChileCompany CUSTOMER table partial schema
- [BBjRecordSet](https://documentation.basis.com/BASISHelp/WebHelp/gridctrl3/bbjrecordset.htm) -- RecordSet API overview
- [Connecting to a BBj Database](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/SQL/connecting_to_a_bbj_database.htm) -- connection string format
- Guide to GUI Programming in BBj (PDF) -- provided by user, 47-page event model reference
- Debugging BBj in the Console (PDF) -- provided by user, 8-page debugging reference

### Tertiary (LOW confidence)
- ChileCompany ORDER-related tables -- implied by documentation queries but table names not confirmed
- SQLEXEC multiple parameter syntax -- inferred from INSERT example, needs compilation verification

## Metadata

**Confidence breakdown:**
- Standard stack (SQL verbs): HIGH -- verified against multiple official docs pages with code examples
- Standard stack (Java libraries): HIGH -- confirmed from BBj 25.x Classpath Overview
- Architecture (SQL pattern): HIGH -- SQLFETCH pattern with ChileCompany example directly from official docs
- Architecture (event patterns): HIGH -- setCallback syntax from official docs + Custom Objects tutorial
- Architecture (subpage structure): MEDIUM -- based on content volume analysis and Phase 4 patterns
- ChileCompany schema: MEDIUM -- CUSTOMER and ITEM confirmed, other tables inferred
- Pitfalls: MEDIUM -- gathered from documentation warnings and common BBj development patterns
- Debugging techniques: HIGH -- sourced from official PDF provided by user

**Research date:** 2026-02-01
**Valid until:** 2026-03-01 (BBj APIs are stable; 30 days is conservative)
