# Class-8 (Async-1) - Detailed Notes with Code and Solutions

## 1) Why async in JavaScript?

JavaScript is single-threaded for execution. Waiting tasks (I/O, timers, network) are handled by runtime APIs, and results are pushed later.

---

## 2) Callback fundamentals

```js
console.log("Start");
setTimeout(() => console.log("A"), 0);
console.log("End");
```

### Output
1. `Start`
2. `End`
3. `A`

Reason: timer callback enters queue and runs after call stack is empty.

---

## 3) Node `fs.readFile` (error-first callback)

```js
const fs = require("fs");

fs.readFile("f1.txt", (err, data) => {
  if (err) return console.error("Read failed", err);
  console.log(String(data));
});
```

### Key point
Callback signature: `(err, data)` where error is first.

---

## 4) Multiple async reads (parallel)

```js
const fs = require("fs");
console.log("Start");
["f1.txt", "f2.txt", "f3.txt"].forEach((file) => {
  fs.readFile(file, (err, data) => {
    if (err) return console.error(file, "error");
    console.log(file, "->", String(data).trim());
  });
});
console.log("End");
```

### Solution / Output pattern
- `Start`
- `End`
- then file results in completion order (not guaranteed by code order)

---

## 5) Event loop quick model

- Call Stack executes sync code.
- Web APIs / libuv handle timers and I/O.
- Callbacks enter queue.
- Event loop pushes callback when stack is empty.

---

## 6) Callback hell example and cleanup

```js
const fs = require("fs");
fs.readFile("f1.txt", (e1, d1) => {
  if (e1) return console.error(e1);
  fs.readFile("f2.txt", (e2, d2) => {
    if (e2) return console.error(e2);
    fs.readFile("f3.txt", (e3, d3) => {
      if (e3) return console.error(e3);
      console.log(String(d1), String(d2), String(d3));
    });
  });
});
```

This nesting is hard to maintain; Promises solve this in Async-2.

---

## 7) Practice with solutions

1. Predict output:
```js
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```
**Answer:** `1 3 2`

2. Why does `"End"` print before file content?  
**Answer:** `readFile` is async; callback runs later.

3. How to enforce file order?  
**Answer:** chain callbacks (or in next class use promises/async-await).
