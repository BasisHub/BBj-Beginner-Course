---
sidebar_position: 3
title: "BBj for Java, Python, and C# Developers"
description: "Task-oriented translation tables mapping familiar Java, Python, and C# patterns to BBj equivalents"
---

# BBj for Java, Python, and C# Developers

If you are coming from Java, Python, or C#, this page maps the patterns you already know to their BBj equivalents. Each row shows how to accomplish a common task across all four languages. For detailed examples of each BBj pattern, follow the links to the relevant tutorial chapters.

## Variables and Types

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Declare string | `String s = "hi";` | `s = "hi"` | `string s = "hi";` | `s$ = "hi"` |
| Declare number | `int n = 42;` | `n = 42` | `int n = 42;` | `n = 42` |
| Declare boolean | `boolean b = true;` | `b = True` | `bool b = true;` | `b = 1` (0/1 convention) |
| Null check | `if (x == null)` | `if x is None:` | `if (x == null)` | `if x! = null()` |
| String to number | `Integer.parseInt(s)` | `int(s)` | `int.Parse(s)` | `num(s$)` |
| Number to string | `String.valueOf(n)` | `str(n)` | `n.ToString()` | `str(n)` |

BBj uses suffixes to indicate type: `$` for strings, `!` for objects, no suffix for numbers. There is no boolean type -- use `0` for false and `1` (or any nonzero value) for true.

## Control Flow

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| If/else | `if (x > 0) { } else { }` | `if x > 0:` | `if (x > 0) { } else { }` | `if x > 0 then ... else ... fi` |
| For loop | `for (int i=0; i<10; i++)` | `for i in range(10):` | `for (int i=0; i<10; i++)` | `for i = 0 to 9 ... next i` |
| While loop | `while (cond) { }` | `while cond:` | `while (cond) { }` | `while cond ... wend` |
| For-each | `for (var item : list)` | `for item in list:` | `foreach (var item in list)` | `for i=0 to list!.size()-1; item!=list!.get(i); next i` |
| Switch/match | `switch (x) { case 1: }` | `match x: case 1:` | `switch (x) { case 1: }` | `switch x; case 1; ...; swend` |

See [Getting Started](/getting-started) for BBj control flow syntax in detail.

## Error Handling

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Set error handler | `try {` | `try:` | `try {` | `seterr handler` |
| Catch specific error | `catch (IOException e)` | `except IOError as e:` | `catch (IOException e)` | `if err = 17 then ...` |
| Catch all errors | `catch (Exception e)` | `except Exception as e:` | `catch (Exception e)` | `seterr handler` (global) |
| Get error message | `e.getMessage()` | `str(e)` | `e.Message` | `errmes(-1)` |
| Raise/throw | `throw new Exception("msg")` | `raise Exception("msg")` | `throw new Exception("msg")` | `throw "msg", 256` |
| Skip on error | `catch (E e) { }` | `except: pass` | `catch { }` | `err=*next` |
| Cleanup | `finally { }` | `finally:` | `finally { }` | Fall-through to cleanup label |

BBj does not have try/catch blocks. All error handling uses `seterr` to set a handler label, `err=` on individual statements for inline trapping, and `throw` to raise custom errors. See [Error Handling](/error-handling) for the complete model.

## Strings

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Get length | `s.length()` | `len(s)` | `s.Length` | `len(s$)` |
| Substring | `s.substring(1, 4)` | `s[1:4]` | `s.Substring(1, 3)` | `s$(2, 3)` (1-based) |
| Find in string | `s.indexOf("x")` | `s.find("x")` | `s.IndexOf("x")` | `pos("x" = s$)` |
| Replace | `s.replace("a", "b")` | `s.replace("a", "b")` | `s.Replace("a", "b")` | `stbl("!REPLACE", s$, "a", "b")` |
| Split | `s.split(",")` | `s.split(",")` | `s.Split(',')` | Manual with `pos()` loop |
| Trim | `s.trim()` | `s.strip()` | `s.Trim()` | `cvs(s$, 3)` |
| Uppercase | `s.toUpperCase()` | `s.upper()` | `s.ToUpper()` | `cvs(s$, 4)` |
| Regex match | `Pattern.matches(p, s)` | `re.match(p, s)` | `Regex.IsMatch(s, p)` | `mask(s$, p$)` |

BBj string positions are 1-based, not 0-based. `pos()` uses the syntax `pos(needle$ = haystack$)` with the needle on the left side of the `=` sign. See [Strings and Numbers](/strings-and-numbers) for details.

## Collections

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Create list | `new ArrayList()` | `[]` | `new List<T>()` | `BBjAPI().makeVector()` |
| Add item | `list.add(item)` | `list.append(item)` | `list.Add(item)` | `vec!.add(item)` |
| Get by index | `list.get(i)` | `list[i]` | `list[i]` | `vec!.get(i)` |
| List size | `list.size()` | `len(list)` | `list.Count` | `vec!.size()` |
| Create map | `new HashMap()` | `{}` | `new Dictionary<K,V>()` | `new HashMap()` (Java) |
| Put key/value | `map.put(k, v)` | `d[k] = v` | `d[k] = v` | `map!.put(k, v)` |
| Get by key | `map.get(k)` | `d[k]` | `d[k]` | `map!.get(k)` |
| Check contains | `map.containsKey(k)` | `k in d` | `d.ContainsKey(k)` | `map!.containsKey(k)` |

BBj uses `BBjVector` for ordered lists and `java.util.HashMap` for key-value maps. Since BBj runs on the JVM, you can use Java collection classes directly. See [Collections](/collections) for complete examples.

## Classes and Objects

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Define class | `class Foo { }` | `class Foo:` | `class Foo { }` | `class public Foo ... classend` |
| Constructor | `Foo() { }` | `def __init__(self):` | `Foo() { }` | `method public Foo() ... methodend` |
| Instance method | `void bar() { }` | `def bar(self):` | `void Bar() { }` | `method public void bar() ... methodend` |
| Static method | `static void baz() { }` | `@staticmethod` | `static void Baz() { }` | `method public static void baz() ... methodend` |
| Inheritance | `class B extends A` | `class B(A):` | `class B : A` | `class public B extends A` |
| Interface | `interface I { }` | `class I(ABC):` | `interface I { }` | `interface public I ... interfaceend` |
| Create instance | `new Foo()` | `Foo()` | `new Foo()` | `new Foo()` |
| Instance field access | `this.field` | `self.field` | `this.field` | `#field` or `#field!` |

BBj Custom Objects use `#` to reference instance fields (similar to `this.` in Java). Classes can extend Java classes and implement Java interfaces. See [Object-Oriented Programming](/object-oriented) for the full syntax.

## File and Database

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Open DB connection | `DriverManager.getConnection()` | `sqlite3.connect()` | `SqlConnection.Open()` | `SQLOPEN(chan)"DbName"` |
| Prepared statement | `conn.prepareStatement(sql)` | `cursor.execute(sql, params)` | `new SqlCommand(sql)` | `SQLPREP(chan)sql$` |
| Execute with params | `stmt.setString(1, val)` | Passed as tuple | `cmd.Parameters.Add()` | `SQLEXEC(chan)val$` |
| Fetch results | `rs.next()` + `rs.getString()` | `cursor.fetchone()` | `reader.Read()` | `rec$ = SQLFETCH(chan, END=lbl)` |
| Close connection | `conn.close()` | `conn.close()` | `conn.Close()` | `SQLCLOSE(chan)` |
| Read file | `Files.readString(path)` | `open(f).read()` | `File.ReadAllText(path)` | `OPEN(chan)f$; READ RECORD(chan)rec$` |

BBj SQL uses verbs (`SQLOPEN`, `SQLPREP`, `SQLEXEC`, `SQLFETCH`, `SQLCLOSE`) rather than objects. Parameters use `?` placeholders in `SQLPREP` and are passed as arguments to `SQLEXEC`. See [Database and SQL](/database-sql) for complete patterns.

## Events and Callbacks

| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Register handler | `btn.addActionListener(l)` | `btn.bind("<Click>", fn)` | `btn.Click += handler;` | `btn!.setCallback(BBjAPI.ON_BUTTON_PUSH, obj!, "method")` |
| Handle event | `void actionPerformed(e)` | `def fn(event):` | `void handler(s, e)` | `method public void onPush(BBjButtonPushEvent ev!)` |
| Event loop | Automatic (Swing EDT) | `root.mainloop()` | `Application.Run()` | `process_events` |

BBj uses `setCallback` with a string method name and an object reference. The event handler method receives a typed event parameter. See [Event Handling](/event-handling) for the callback model.

---

For detailed examples of each BBj pattern, follow the chapter links above. This page is a quick-reference starting point -- the tutorial chapters provide working code samples, error handling patterns, and best practices for each topic.
