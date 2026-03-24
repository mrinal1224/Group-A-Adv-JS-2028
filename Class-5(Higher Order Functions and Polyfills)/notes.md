# Class-5 (HOF and Polyfills) Notes

## 1) What is a Higher-Order Function (HOF)?

A **Higher-Order Function** is a function that does at least one of these:
- takes another function as an argument, or
- returns a function.

In JavaScript, array methods like `map`, `filter`, and `reduce` are classic HOF examples because they accept callback functions.

Why HOFs are powerful:
- reusable logic,
- cleaner and declarative code,
- less repetitive loops,
- easier composition of data transformations.

---

## 2) Callback Refresher (Needed for HOF)

When using `map/filter/reduce`, you pass a callback:
- `element` (current item),
- optionally index and full array,
- callback result controls behavior of method.

Example shape:
```js
arr.map((element, index, array) => {
  return transformedValue;
});
```

---

## 3) `map` in Detail

### Purpose
`map` transforms each element and returns a **new array of same length**.

### Key Properties
- does not mutate original array (if callback itself is pure),
- runs callback for each existing element,
- output length equals input length.

### Class Understanding
In class file, custom `myMap` loops over array and pushes callback result to `resultantArray`.

Conceptual polyfill logic:
1. Validate callback is function.
2. Create output array.
3. Iterate each element.
4. Push transformed value.
5. Return new array.

Use cases:
- convert prices from USD to INR,
- normalize API response fields,
- create UI label arrays.

---

## 4) `filter` in Detail

### Purpose
`filter` keeps only elements for which callback returns truthy.

### Key Properties
- returns new array (possibly smaller or empty),
- preserves original order,
- original array unchanged.

### Class Understanding
`myFilter` checks callback condition and pushes original element if true.

Conceptual polyfill logic:
1. Create empty output array.
2. Loop through array.
3. If predicate true, push current element.
4. Return filtered array.

Use cases:
- keep active users only,
- filter paid orders,
- remove invalid form entries.

---

## 5) `reduce` in Detail

### Purpose
`reduce` collapses an array into one final value (number/object/array/string/etc.).

Signature idea:
`reduce((accumulator, current) => newAccumulator, initialValue)`

### Key Properties
- accumulator carries state across iterations,
- extremely flexible: sum, group, flatten, index building,
- can return any type.

### With and without initial value
- If initial value provided: accumulator starts from it.
- If not provided: first element becomes accumulator, loop starts from second item.

### Class Understanding
`myReduce` handles both cases with `arguments.length`.

Use cases:
- total cart amount,
- group products by category,
- convert array to lookup object by id.

---

## 6) What is a Polyfill?

A **polyfill** is custom code that provides modern feature behavior in environments where feature is missing.

In interview/project terms:
- "If browser/runtime does not support method X, implement X-like behavior."

For this class:
- `Array.prototype.myMap`
- `Array.prototype.myFilter`
- `Array.prototype.myReduce`

Goal is to understand internal behavior, not just usage.

---

## 7) Polyfill Design Principles

1. Validate input types (`callback` must be function).
2. Use `this` as the source array when implementing on `Array.prototype`.
3. Return new result where native method returns new result.
4. Keep behavior predictable and consistent.
5. Handle edge cases (empty array, missing initial value in reduce).

---

## 8) `thisArg` Concept (Important for Real Accuracy)

Native `map/filter/reduce` support optional `thisArg` in some methods, letting callback run with custom `this`.

Example:
```js
arr.map(function (x) {
  return x * this.multiplier;
}, { multiplier: 2 });
```

Many beginner polyfills skip `thisArg` for simplicity; that is okay for learning first pass.  
In production-grade polyfills/interview rounds, you should mention it as an enhancement.

---

## 9) Time and Space Complexity

- `map`: O(n) time, O(n) extra space
- `filter`: O(n) time, O(k) space (k selected items, worst O(n))
- `reduce`: O(n) time, O(1) extra space (excluding returned structure growth)

---

## 10) When to Use Which

- Need one-to-one transformation -> `map`
- Need conditional selection -> `filter`
- Need one aggregated/final value -> `reduce`

Common pipeline:
`data.filter(...).map(...).reduce(...)`

---

## 11) Practical Real-World Examples

### Example A: E-commerce Checkout
- `filter`: remove out-of-stock items,
- `map`: convert each item to `{id, priceWithTax}`,
- `reduce`: compute grand total.

### Example B: Analytics Dashboard
- `filter`: keep events from selected date range,
- `map`: normalize timestamps,
- `reduce`: count events by event type.

### Example C: Student Portal
- `filter`: eligible students only,
- `map`: create report card rows,
- `reduce`: compute class average.

---

## 12) Common Mistakes Students Make

1. Forgetting to return inside `map` callback.
2. Returning boolean from `map` when `filter` was needed.
3. Mutating accumulator incorrectly in `reduce`.
4. Not handling missing initial value in custom reduce.
5. Confusing "transform each element" vs "aggregate all elements".

---

## 13) Revision Checklist

- [ ] I can define HOF with examples.
- [ ] I can differentiate `map`, `filter`, `reduce`.
- [ ] I can write basic polyfills for all three.
- [ ] I can explain accumulator clearly.
- [ ] I can choose right method for business use case.

---

## Interview Questions (Real-Life + Project Based)

1. You get a list of products from API.  
   Build a pipeline to:
   - keep only in-stock products,
   - apply 18% tax,
   - calculate total cart value.
   Explain where you use `filter`, `map`, `reduce`.

2. In a job portal, you receive 10,000 applicants.  
   How would you:
   - filter only eligible candidates,
   - map to interview schedule format,
   - reduce to count candidates by city?

3. Implement `myMap` polyfill with callback validation and optional `thisArg`.  
   What edge cases will you handle?

4. Build `myReduce` polyfill that behaves like native reduce for:
   - no initial value,
   - with initial value,
   - empty array scenarios.
   What errors should it throw?

5. A teammate used nested loops to transform and aggregate order data.  
   Refactor using HOFs and justify readability/maintainability gains.

6. In analytics processing, memory usage is high after chaining map/filter on huge arrays.  
   What optimizations can you suggest (batching, streaming, single-pass reduce)?

7. You need to build an index object: `{ userId: userObject }` from users array.  
   How would you solve it using `reduce`, and why is that better than repeated searches?

8. For a fintech app, transaction records include invalid entries.  
   Design validation + normalization + aggregation flow with HOFs.

9. Explain a case where using `reduce` makes code worse than `map/filter`.  
   How do you decide between concise and readable code in teams?

10. If old browser does not support `Array.prototype.filter`, how would you ship safe behavior to production?
    Discuss polyfill loading strategy and compatibility testing.
