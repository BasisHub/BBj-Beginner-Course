---
sidebar_position: 3
title: "Practical Java Libraries"
---

# Practical Java Libraries

BBj 25.x bundles several useful Java libraries beyond the standard JDK. This section shows practical, copy-paste examples for the libraries you will reach for most often: JSON parsing, HTTP requests, encoding, hashing, and unique ID generation.

## JSON with org.json (Bundled)

The `org.json` library (json-20250107.jar) ships with BBj 25.x -- no external JAR needed and no classpath configuration required.

**Creating JSON:**

```bbj
use org.json.JSONObject
use org.json.JSONArray

rem Create a JSON object
json! = new JSONObject()
json!.put("name", "Alice")
json!.put("role", "Developer")
json!.put("active", BBjAPI.TRUE)

rem Add a nested array
skills! = new JSONArray()
skills!.put("BBj")
skills!.put("Java")
skills!.put("SQL")
json!.put("skills", skills!)

rem Pretty-print with 2-space indent
print json!.toString(2)
```

**Parsing JSON:**

```bbj
use org.json.JSONObject
use org.json.JSONArray

rem Parse a JSON string
parsed! = new JSONObject("{""name"":""Bob"",""age"":30,""active"":true}")
print "Name: ", parsed!.getString("name")
print "Age: ", str(parsed!.getInt("age"))

rem Check if a key exists before accessing
if parsed!.has("email") then
    print "Email: ", parsed!.getString("email")
else
    print "No email on record"
fi

rem Parse a JSON array
arr! = new JSONArray("[""red"",""green"",""blue""]")
for i = 0 to arr!.length() - 1
    print arr!.getString(i)
next i
```

## HTTP Requests with HttpURLConnection

`java.net.HttpURLConnection` is available in the standard JDK and works for both GET and POST requests.

**GET request:**

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

**POST request:**

```bbj
use java.net.URL
use java.net.HttpURLConnection
use java.io.BufferedReader
use java.io.InputStreamReader
use java.io.OutputStreamWriter

url! = new URL("https://httpbin.org/post")
conn! = cast(HttpURLConnection, url!.openConnection())
conn!.setRequestMethod("POST")
conn!.setRequestProperty("Content-Type", "application/json")
conn!.setDoOutput(BBjAPI.TRUE)

rem Write request body
writer! = new OutputStreamWriter(conn!.getOutputStream())
writer!.write("{""message"":""Hello from BBj""}")
writer!.flush()
writer!.close()

print "Response code: ", conn!.getResponseCode()

rem Read response
reader! = new BufferedReader(new InputStreamReader(conn!.getInputStream()))
line! = reader!.readLine()
while line! <> null()
    print line!
    line! = reader!.readLine()
wend
reader!.close()
conn!.disconnect()
```

`java.net.http.HttpClient` (Java 11+) is also available as a more modern alternative, but `HttpURLConnection` is simpler for basic requests and more commonly seen in existing BBj code.

## Base64 Encoding and Decoding

`java.util.Base64` provides standard Base64 encoding and decoding. A common use is encoding credentials for API authentication headers.

```bbj
use java.util.Base64

rem Encode a string to Base64
encoder! = Base64.getEncoder()
encoded$ = encoder!.encodeToString(new java.lang.String("Hello BBj").getBytes())
print "Encoded: ", encoded$

rem Decode back to original
decoder! = Base64.getDecoder()
decoded! = new java.lang.String(decoder!.decode(encoded$))
print "Decoded: ", decoded!

rem Practical: encode API credentials
credentials$ = "api_user:api_secret"
auth$ = encoder!.encodeToString(new java.lang.String(credentials$).getBytes())
print "Authorization: Basic ", auth$
```

## Hashing with MessageDigest

`java.security.MessageDigest` supports SHA-256, SHA-512, MD5, and other hash algorithms. SHA-256 is recommended for general use.

```bbj
use java.security.MessageDigest

rem SHA-256 hash
md! = MessageDigest.getInstance("SHA-256")
hash! = md!.digest(new java.lang.String("password123").getBytes())

rem Convert bytes to hex string
sb! = new StringBuilder()
for i = 0 to hash!.length - 1
    sb!.append(String.format("%02x", hash![i]))
next i
print "SHA-256: ", sb!.toString()
```

MD5 is also available (`MessageDigest.getInstance("MD5")`) but SHA-256 is preferred. Note that for actual password storage, use a dedicated password hashing library (bcrypt, scrypt) rather than raw SHA-256 -- raw hashes are fast to brute-force.

## UUID Generation

`java.util.UUID` generates RFC 4122 compliant unique identifiers in a single line:

```bbj
use java.util.UUID

uuid! = UUID.randomUUID()
print "UUID: ", uuid!.toString()
```

UUIDs are useful for generating unique record identifiers, session tokens, or correlation IDs for logging.

## What Else is Available

With Java 21, you have access to the entire JDK standard library. BBj 25.x also bundles several third-party JARs including Google Gson (`gson-2.12.1.jar`) and json-smart (`json-smart-2.5.2.jar`). For a full list of bundled libraries, see the [BBj 25.x Classpath Overview](https://documentation.basis.cloud/BASISHelp/WebHelp/b3odbc/Classpath_Overviews/BBj_25.x_Classpath_Overview.htm).

If you need a library beyond what is bundled, add its JAR to the classpath via Enterprise Manager (see the [Advanced Patterns](/java-interop/advanced) page for details).

:::tip[Reading Legacy Code]
See [Reading Legacy Code](./legacy-code) for legacy Java interop patterns including string-based data exchange and procedural Java usage.
:::

:::tip Further Reading
- [BBj 25.x Classpath Overview](https://documentation.basis.cloud/BASISHelp/WebHelp/b3odbc/Classpath_Overviews/BBj_25.x_Classpath_Overview.htm) -- complete list of bundled JARs
- [org.json JavaDoc](https://javadoc.io/doc/org.json/json/latest/index.html) -- full API reference for JSONObject, JSONArray, and more
:::
