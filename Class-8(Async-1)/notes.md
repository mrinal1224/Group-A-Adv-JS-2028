# Class-8 (Async-1) Notes

## 1) Why Asynchronous JavaScript Exists

JavaScript (in browser and Node.js) runs on a **single main thread** for JS execution.  
If one operation takes long (file read, network, timer wait), and JS waited synchronously, the whole app would freeze.

Asynchronous programming lets JS:
- continue executing other code,
- delegate waiting tasks to platform APIs (browser Web APIs / Node libuv + OS),
- handle results later via callbacks, promises, or async/await.

---

## 2) Synchronous vs Asynchronous Mindset

### Synchronous
- One line finishes before next starts.
- Predictable order.
- Can block execution if work is heavy.

### Asynchronous
- Starts an operation now, finishes later.
- Execution order is based on completion and event loop scheduling.
- Non-blocking for waiting operations.

---

## 3) Callback Basics

A **callback** is a function passed to another function to run later.

From class code (`callback2.js`):
- `console.log("Start")`
- multiple `setTimeout(...)`
- `console.log("End")`

Even with `setTimeout(fn, 0)` (default when delay omitted), callback executes **after current call stack is empty**.  
So output is like:
1. Start
2. End
3. A / B / C (timer callbacks)

Key point: `setTimeout` does not execute immediately. It schedules.

---

## 4) Node.js File System Callback Pattern

From class code (`callbacks.js`), each read uses:

`fs.readFile(path, (err, data) => { ... })`

This is Node's standard **error-first callback style**:
- first argument: `err` (if failure),
- second argument: `data` (if success).

Example behavior in current class files:
- `f1.txt`, `f2.txt`, `f3.txt`, `f4.txt`, `f5.txt` are read asynchronously.
- `"Start"` logs first and `"End"` logs quickly.
- file outputs appear later when OS/file system work completes.

Important:
- order of completion is **not guaranteed** by call order.
- if you need strict order, nested callbacks or better abstractions (Promises/async-await) are used.

---

## 5) The Event Loop (Core Foundation)

When JS runs async code, understand these pieces:

1. **Call Stack**  
   Where JS functions execute (LIFO).

2. **Web APIs / libuv + OS**  
   Timers, I/O, network are handled outside JS thread.

3. **Callback Queue (Task Queue / Macrotask Queue)**  
   Completed callbacks (timer, I/O, etc.) wait here.

4. **Microtask Queue**  
   Promise callbacks (`.then/.catch/.finally`) and `queueMicrotask`.

5. **Event Loop**  
   Moves tasks to call stack when stack is empty.  
   Microtasks are drained before next macrotask.

### Rule to remember
- Synchronous code first.
- Then microtasks.
- Then macrotasks (timers/I/O callbacks).

---

## 6) `setTimeout` and `setInterval`

### `setTimeout(fn, delay)`
- Runs callback once after minimum delay.
- Delay is not exact guaranteed runtime; it is "not before delay".

### `setInterval(fn, delay)`
- Repeats callback every delay interval.
- If callback work takes longer than delay, calls can drift.

Practical tip:
- For polling APIs, many teams prefer recursive `setTimeout` over `setInterval` for better control.

---

## 7) Callback Hell (Why We Move to Promises)

When tasks depend on previous async results, callbacks can nest deeply:
- harder to read,
- harder error handling,
- difficult maintenance.

This is called **callback hell** / pyramid of doom.  
Promises and async-await solve most of these readability and composability issues.

---

## 8) Common Async-1 Mistakes

1. Assuming async output order = code order.
2. Forgetting to handle `err` in callback.
3. Returning from callback and expecting outer function to pause.
4. Writing CPU-heavy loops in JS thread and then blaming async APIs.
5. Thinking `setTimeout(..., 0)` means "run now".

---

## 9) Real Project Use Cases

- Reading configuration files at server startup (`fs.readFile`).
- Background logging or audit writes without blocking request handling.
- Debounce/throttle UI events with timers.
- Retry failed operations after delay (backoff strategy).
- Scheduling periodic cleanup jobs.

---

## 10) Quick Revision Checklist

- [ ] I can explain non-blocking I/O.
- [ ] I understand error-first callbacks.
- [ ] I can predict Start/End/timer output ordering.
- [ ] I know event loop components.
- [ ] I can explain why callback hell happens.

---

## Interview Questions (Real-Life + Project Based)

1. You have to read 5 config files in Node before starting a server.  
   How would you ensure startup fails fast if any file is missing, and still keep code readable?

2. A UI app freezes during a long loop, even though API calls are async.  
   Explain why and how you would fix this in a production frontend.

3. In a log processing service, `fs.readFile` callbacks are finishing in unexpected order.  
   Design a solution for:
   - preserving order for one workflow,
   - maximizing speed for another workflow.

4. You are implementing OTP resend timer.  
   How would you use `setTimeout` / `setInterval` correctly so:
   - countdown is accurate,
   - timers are cleaned on component unmount,
   - memory leaks are avoided?

5. A teammate says `setTimeout(fn, 0)` is synchronous.  
   Give a small demo and event loop explanation to prove otherwise.

6. You need to process user-uploaded CSV files and validate each row.  
   What problems can occur if callbacks are nested heavily, and how would you refactor?

7. In a Node API, an error inside callback is swallowed and request hangs.  
   How do you structure callback code to ensure every error path sends response exactly once?

8. You are building a scheduler that runs every 10s.  
   Would you pick `setInterval` or recursive `setTimeout`? Justify with drift, overlap, and failure handling.

9. Explain how event loop behavior can impact perceived latency in a chat app under heavy CPU usage.

10. Build strategy: read `f1 -> f2 -> f3` strictly in order, then read `f4` and `f5` in parallel.  
    Sketch callback-based logic and discuss readability concerns.
