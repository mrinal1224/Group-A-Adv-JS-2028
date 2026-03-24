# Class-9 (Async-2: Promise Combinators) - Detailed Notes with Code and Solutions

## 1) Promise basics

A Promise has three states:
- pending
- fulfilled
- rejected

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 500);
});
p.then(console.log).catch(console.error);
```

### Output
`Done`

---

## 2) Chaining

```js
Promise.resolve(2)
  .then((x) => x * 3)
  .then((x) => x + 1)
  .then(console.log);
```

### Output
`7`

---

## 3) `Promise.all`

```js
const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
Promise.all([p1, p2]).then(console.log);
```

### Output
`["A", "B"]`

If any promise rejects, whole `all` rejects.

---

## 4) `Promise.allSettled`

```js
const p1 = Promise.resolve("OK");
const p2 = Promise.reject("FAIL");

Promise.allSettled([p1, p2]).then(console.log);
```

### Output
Array of statuses:
- `{ status: "fulfilled", value: "OK" }`
- `{ status: "rejected", reason: "FAIL" }`

---

## 5) `Promise.race`

```js
const fast = new Promise((res) => setTimeout(() => res("fast"), 100));
const slow = new Promise((res) => setTimeout(() => res("slow"), 500));
Promise.race([slow, fast]).then(console.log);
```

### Output
`fast`

First settled wins (fulfilled or rejected).

---

## 6) `Promise.any`

```js
const p1 = Promise.reject("err1");
const p2 = new Promise((res) => setTimeout(() => res("success"), 200));
Promise.any([p1, p2]).then(console.log).catch(console.error);
```

### Output
`success`

`any` ignores rejections until one fulfills.  
If all reject -> `AggregateError`.

---

## 7) Real project patterns

### Timeout wrapper with race
```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([promise, timeout]);
}
```

### Vendor fallback with any
```js
Promise.any([providerA(), providerB(), providerC()]);
```

---

## 8) Practice with solutions

1. Need all APIs mandatory -> choose?  
   **Answer:** `Promise.all`

2. Need all statuses even failures -> choose?  
   **Answer:** `Promise.allSettled`

3. Need first success only -> choose?  
   **Answer:** `Promise.any`

4. Need first settle (success/failure) -> choose?  
   **Answer:** `Promise.race`
