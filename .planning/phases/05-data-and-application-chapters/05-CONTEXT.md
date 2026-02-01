# Phase 5 Context: Data and Application Chapters

**Captured:** 2026-02-01
**Phase goal:** Readers can access databases via SQL, call Java from BBj, handle events systematically, and debug their programs -- completing the full skill set for independent BBj development

## Decisions

### Database/SQL Access (CONT-09)

1. **Sample database**: Use the ChileCompany database that ships with BBj -- no external setup needed
2. **Data Dictionary**: Light coverage -- explain what it is and how it relates to SQL access, but don't deep-dive into creating/managing dictionaries
3. **File I/O bridge**: Brief mention that legacy code uses record-oriented file access for data; cross-link to the File I/O chapter rather than re-teaching
4. **Prepared statements**: Teach as the recommended pattern (SQLPREP/SQLEXEC), not just an alternative
5. **SQL injection**: Mention what SQL injection is to motivate prepared statements -- security benefit plus performance benefit from statement reuse
6. **Pattern**: SQLOPEN → SQLPREP → SQLEXEC → iterate BBjRecordSet → SQLCLOSE

### Java Interop (CONT-10)

1. **Scope**: Both advanced patterns (extending interfaces, generics handling) AND practical library usage
2. **OOP consolidation**: Absorb the existing `docs/03-object-oriented/02-using-java.md` subpage content into the new Java interop chapter. Replace the OOP subpage with a brief pointer to the Java interop chapter. This avoids duplication and puts all Java-from-BBj content in one place.
3. **Specific libraries to demonstrate**:
   - JSON parsing/creation (org.json or similar)
   - HTTP requests (java.net.HttpURLConnection or similar)
   - java.util maps with iteration patterns
   - Base64 encoding/decoding (java.util.Base64)
   - Hashing (java.security.MessageDigest)
   - UUID/GUID creation (java.util.UUID)
4. **Classpath setup**: Walk through adding external JARs via Enterprise Manager -- show how the classpath gets configured so readers can use any Java library
5. **Three tiers of content**: Basic usage (moved from OOP chapter), advanced patterns (interfaces, generics), practical libraries

### Event Handling (CONT-08)

1. **Scope**: Full GUI event model -- this course should be complete for non-DWC usage. Everything taught here is also relevant for DWC.
2. **Core controls for examples**: BBjWindow, BBjButton, BBjInputE -- keep it focused on these three for examples
3. **Three-generation event model** (teach modern-first, legacy as context):
   - **READ RECORD loop** (Visual PRO/5 era): Manual event queue polling from SYSGUI device with event templates. Legacy-only context.
   - **CALLBACK verb** (middle generation): Procedural callback registration to labels. Still works but not the modern pattern.
   - **setCallback** (modern OO API): The primary teaching target. Supports both label targets (procedural programs) and method targets with event payload objects (OO programs).
4. **process_events**: Full explanation -- this is the blocking event loop that keeps a callback-based program alive. Explain what it does, when to call it, and what happens without it.
5. **Key reference**: `/Users/beff/_workspace/bbj-ai-strategy/GuideToGuiProgrammingInBBj.pdf` -- 47-page guide covering the full evolution with sample programs (cust-cui.txt → cust-gui.txt → cust-bbj.txt → cust-obj.txt). The researcher should mine this heavily.
6. **Event code table**: Include key event types (ON_BUTTON_PUSH, ON_CLOSE, ON_EDIT_MODIFY, etc.) with descriptions
7. **SYSGUI device**: Explain briefly as context for how events work under the hood, but don't teach as a primary pattern

### Debugging (CONT-11)

1. **Focus**: Console-based debugging -- the BBj IDE debugger has limited capabilities, so the chapter should emphasize console techniques
2. **Key reference**: `/Users/beff/_workspace/bbj-beginner-tutorial/Debugging BBj in the Console.pdf` -- 8-page guide covering the full console debugging toolkit
3. **Core techniques to cover**:
   - Breaking to console (Ctrl-C / Ctrl-Break / ESCAPE verb)
   - Dot-stepping (`.` single step, `..` step-over, `. n` for n steps)
   - Variable inspection (`PRINT`/`?` and direct variable assignment)
   - DUMP verb (output all variables, redirect to file, filter by call level)
   - SETTRACE (record execution trace to file)
   - Logging without console: `System.out.println()` for BBj debug log, `executeScript("console.log()")` for browser
4. **BEM/error codes**: Claude's discretion on split between error handling chapter and debugging chapter. The error handling chapter already covers error codes and ERR= patterns. The debugging chapter should focus on _diagnosing_ errors (interpreting BEM, looking up error codes, using error info to find root cause) rather than _handling_ them.
5. **IDE debugger**: Brief mention that it exists, but the chapter's value is in console techniques that work everywhere

### Chapter Structure (Claude's Discretion)

- Subpage structure for each chapter: Claude determines based on content volume during planning
- Previous chapters used index + 2-3 subpages pattern; same approach is likely appropriate but can vary per chapter

## Source References

| Reference | Location | Relevant To |
|-----------|----------|-------------|
| Guide to GUI Programming in BBj | `/Users/beff/_workspace/bbj-ai-strategy/GuideToGuiProgrammingInBBj.pdf` | Event handling -- full 4-generation evolution with sample programs |
| Debugging BBj in the Console | `/Users/beff/_workspace/bbj-beginner-tutorial/Debugging BBj in the Console.pdf` | Debugging -- console techniques, dot-stepping, DUMP, SETTRACE |
| CALLBACK verb docs | `https://documentation.basis.cloud/BASISHelp/WebHelp/commands/callback_verb.htm` | Event handling -- middle-generation CALLBACK syntax |
| BBj sample database | Ships with BBj installation (ChileCompany) | Database chapter examples |

## Constraints

- All code examples must be runnable in BBj IDE without external dependencies (except classpath chapter showing how to add JARs)
- Database examples use the ChileCompany sample database only
- Event examples use BBjWindow, BBjButton, BBjInputE only (no DWC-specific controls)
- setCallback is the primary event pattern taught; READ RECORD and CALLBACK verb are legacy context only
- BBjHashMap remains deprecated per Phase 4 decisions; java.util.HashMap for all key-value storage
- Existing OOP "Using Java" subpage content must be relocated, not duplicated

## Open for Research

- Exact Java libraries available in BBj's bundled JRE (JSON library, HTTP client version)
- ChileCompany database schema and table names for examples
- Specific CALLBACK verb syntax and parameters
- Which event types are most commonly used (prioritize for the event code table)
- Whether BBj has built-in JSON support or requires external library
