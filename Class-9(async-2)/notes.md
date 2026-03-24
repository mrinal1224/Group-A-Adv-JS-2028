# Class-9 (Async-2: Promise Combinators) Notes

## 1) Promises: Core Idea

A **Promise** represents a value that may be available now, later, or never.

States:
- **pending**: initial, not settled.
- **fulfilled**: success with value.
- **rejected**: failure with reason/error.

Once fulfilled/rejected, state is immutable.

From class code:
- `fetchUserData`, `fetchUserPosts`, `fetchUserComments` return promises using `setTimeout`.
- This simulates real APIs with different response times and success/failure.

---

## 2) Promise Construction Pattern

```js
new Promise((resolve, reject) => {
  // async work
  // resolve(value) on success
  // reject(error) on failure
});
```

Rules:
- call `resolve` or `reject` once.
- prefer rejecting with `Error` objects in real code.
- executor runs immediately when promise is created.

---

## 3) Consuming Promises

### `.then(onFulfilled)`
Runs when promise fulfills.

### `.catch(onRejected)`
Runs when promise rejects or if error thrown upstream.

### `.finally(onFinally)`
Runs after settle (both success/failure), good for cleanup.

### Chaining
Each `.then` returns a new promise, enabling pipeline flow:
- return value -> next `.then` gets value.
- throw error / reject -> control jumps to nearest `.catch`.

---

## 4) Why Promise Combinators Matter

In projects, we often run multiple async tasks together:
- fetch user + posts + settings,
- call multiple vendors for same data,
- run independent startup checks,
- accept first successful source.

Promise combinators provide standard patterns for this.

---

## 5) `Promise.all`

`Promise.all([p1, p2, p3])`

Behavior:
- fulfills when **all** fulfill,
- result is array in input order,
- rejects immediately if any promise rejects (fail-fast).

Use when all results are mandatory.

Example use case:
- dashboard requires profile, permissions, and billing plan; no partial render allowed.

---

## 6) `Promise.allSettled`

`Promise.allSettled([p1, p2, p3])`

Behavior:
- always fulfills after all settle,
- each entry is `{ status: "fulfilled", value }` or `{ status: "rejected", reason }`.

In class code (`script.js`):
- `Promise.allSettled([fetchUserData(), fetchUserPosts(), fetchUserComments()])`
- logs all outcomes, even when comments fail.

Use when partial results are acceptable and you need per-request status.

---

## 7) `Promise.race`

`Promise.race([p1, p2, p3])`

Behavior:
- settles with first settled promise (fulfilled or rejected).

In weather example (`race.js`):
- if fastest promise rejects, race rejects.

Use cases:
- timeout wrapper (`race([apiCall, timeoutPromise])`),
- first response wins strategy where failures should fail quickly.

---

## 8) `Promise.any`

`Promise.any([p1, p2, p3])`

Behavior:
- fulfills with first fulfilled promise,
- ignores rejections until all reject,
- if all reject, rejects with `AggregateError`.

In class weather example:
- returns first successful weather provider even if one provider fails early.

Use when "any one success is enough."

---

## 9) Choosing the Right Combinator

- Need all mandatory results -> `Promise.all`
- Need all outcomes (success + failure report) -> `Promise.allSettled`
- Need first settled result (including fast failure) -> `Promise.race`
- Need first successful result -> `Promise.any`

---

## 10) Error Handling Strategy in Real Projects

1. Wrap external calls in domain functions (e.g., `fetchPaymentsProviderA`).
2. Normalize errors (`throw new Error("...")`) with useful context.
3. Prefer `allSettled` for resilience dashboards and analytics.
4. Use `any` for fallback architecture across vendors.
5. Use `race` with timeout to avoid hanging requests.

---

## 11) Performance and Reliability Notes

- Combinators start all input promises immediately (if promises already created).
- Preserve order of results where applicable (`all`, `allSettled`) by input index, not completion order.
- Avoid unbounded parallelism for huge arrays; use batching/pools.
- Add retries with exponential backoff for flaky APIs.

---

## 12) Practical Patterns

### Timeout Pattern
Use `Promise.race` with timeout promise:
- API call vs timer reject.
- whichever settles first decides result.

### Multi-vendor Fallback
Use `Promise.any` across providers:
- first successful vendor wins.
- if all fail, aggregate failure logged.

### Partial Rendering UI
Use `Promise.allSettled`:
- show available widgets,
- show graceful error for failed widgets.

---

## 13) Common Mistakes in Async-2

1. Using `Promise.all` where partial success is acceptable.
2. Forgetting `return` inside `.then`, breaking chains.
3. Ignoring rejected promises causing unhandled rejection warnings.
4. Confusing `race` and `any`.
5. Assuming output order equals completion order.

---

## 14) Quick Revision Checklist

- [ ] I can explain promise states and transitions.
- [ ] I can chain `.then` and centralize `.catch`.
- [ ] I can pick the right combinator by requirement.
- [ ] I know `any` throws `AggregateError` when all fail.
- [ ] I can design fallback/timeout strategies.

---

## Interview Questions (Real-Life + Project Based)

1. You are building a product page that needs:
   - product details,
   - inventory,
   - reviews.
   Inventory is mandatory, reviews are optional.  
   Which combinator(s) would you choose and why?

2. You integrate 3 payment gateways.  
   Business rule: process payment using first successful gateway.  
   Design this flow using promises and explain failure reporting.

3. In a weather app, fastest provider often fails quickly and blocks user response.  
   Why can this happen with `Promise.race`, and how would `Promise.any` change behavior?

4. You have 20 microservice calls for an admin dashboard.  
   How would you avoid failing entire screen due to 1 failing API while still surfacing meaningful errors?

5. Create a timeout mechanism for `fetchUserData()` without modifying that function.  
   Which combinator will you use and how?

6. Your teammate used `Promise.all` for analytics pings where failures are acceptable.  
   What production issues can this cause and what is a better alternative?

7. In an e-commerce checkout, shipping quote API is slow/unreliable.  
   Propose a strategy using combinators + retry policy for better UX and resilience.

8. Explain how you would log and monitor partial failures when using `Promise.allSettled` in a real project.

9. You receive user data, posts, and comments from different services.  
   How would you keep response time low while still returning as much data as possible?

10. Build a fault-tolerant "price comparison aggregator" using 5 provider APIs.  
    Specify where you would use `all`, `allSettled`, `race`, and `any`, and why.
