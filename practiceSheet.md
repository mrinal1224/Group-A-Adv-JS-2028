# Hard JavaScript Interview Practice Sheet: 50 Full Detailed Problems

---

## Problem 1: Implement a Promise Pool (Concurrency Limiter)

### Interview Framing

You are given an array of async tasks. Each task is a function that returns a promise. Run at most `k` tasks at the same time and return all results in input order.

### Problem Statement

Implement `promisePool(tasks, limit)`.

* `tasks` is an array of functions, where each function returns a promise.
* `limit` is the maximum number of tasks that may run concurrently.
* Return a promise that resolves with an array of results in the same order as `tasks`.
* If any task rejects, the returned promise should reject immediately.

### Requirements

* Preserve input order.
* Never run more than `limit` tasks at once.
* Start the next task as soon as one finishes.
* Handle `limit <= 0` as invalid input.

### Function Signature

```js
function promisePool(tasks, limit) {}
```

### Example

```js
const tasks = [
  () => Promise.resolve(1),
  () => new Promise(r => setTimeout(() => r(2), 100)),
  () => Promise.resolve(3)
];
```

### Hints

* Track the next index to schedule.
* Track active task count.
* Resolve only when all tasks finish.

---

## Problem 2: Retry with Exponential Backoff

### Interview Framing

A flaky external API fails intermittently. Implement a retry helper with exponential backoff.

### Problem Statement

Implement `retryWithBackoff(fn, retries, delay)`.

* `fn` is a function returning a promise.
* Retry up to `retries` times after failures.
* Wait `delay`, then `delay * 2`, then `delay * 4`, and so on.
* Resolve as soon as one attempt succeeds.
* Reject with the last error if all attempts fail.

### Function Signature

```js
async function retryWithBackoff(fn, retries, delay) {}
```

### Requirements

* `retries` means additional attempts after the first try.
* Delay should grow exponentially.
* No retries after success.

### Hints

* Wrap each attempt in `try/catch`.
* Use a helper `wait(ms)`.

---

## Problem 3: Promise.all with Concurrency Control

### Interview Framing

You need `Promise.all`, but the system should not overwhelm downstream services.

### Problem Statement

Implement `limitedPromiseAll(taskFns, limit)`.

* `taskFns` is an array of functions returning promises.
* Return results in input order.
* Never run more than `limit` tasks at the same time.
* Reject immediately if any task fails.

### Difference from Problem 1

Frame this as a custom `Promise.all` with concurrency control and ask for production-grade handling of many tasks.

### Function Signature

```js
function limitedPromiseAll(taskFns, limit) {}
```

### Hints

* Similar scheduling logic to promise pool.
* Think of it as lazy promise creation.

---

## Problem 4: Event Loop Output Prediction #1

### Interview Framing

Predict the output and explain the ordering in terms of call stack, microtasks, and macrotasks.

### Problem Statement

Given:

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

Answer:

1. What is the output?
2. Why?
3. What changes if the promise chain is nested?

### Requirements

* Explain the exact ordering.
* Mention when the microtask queue is drained.

---

## Problem 5: Implement async/await Using Generators

### Interview Framing

Build a tiny runner that executes generator functions yielding promises.

### Problem Statement

Implement `run(generatorFn)` so that code like async/await can be simulated with generators.

### Function Signature

```js
function run(generatorFn) {}
```

### Requirements

* Support `yield` of promises.
* Resume generator with resolved value.
* Propagate rejection into generator via `throw`.
* Return a promise for the final result.

### Hints

* Call `iterator.next(value)` and `iterator.throw(error)`.
* Recursively process yielded values.

---

## Problem 6: Sequential Async Task Queue

### Interview Framing

Create an object that accepts async tasks and ensures they run one at a time in insertion order.

### Problem Statement

Implement `createSequentialQueue()` returning an object with:

* `add(taskFn)`

Each added task starts only after the previous task settles.

### Requirements

* Preserve order.
* Continue queue even if one task fails.
* Each `add` returns a promise for that task’s result.

### Function Signature

```js
function createSequentialQueue() {}
```

### Hints

* Keep a tail promise.
* Chain the next task onto the previous one.

---

## Problem 7: Manual Promise Chaining

### Interview Framing

Implement a simplified promise-like structure supporting chained `then` calls.

### Problem Statement

Build a `MyPromise` with:

* constructor executor
* `then`
* `catch`
* basic chaining support

### Requirements

* `then` returns a new promise-like object.
* Returned values flow to next `then`.
* Thrown errors flow to rejection path.
* Support async executor settlement.

### Hints

* This is harder than storing one callback.
* Each `then` creates a new downstream promise.

---

## Problem 8: Promise Timeout Wrapper

### Interview Framing

Wrap a promise so it rejects if it takes too long.

### Problem Statement

Implement `withTimeout(promise, ms)`.

* Resolve with original value if completed in time.
* Reject with timeout error if exceeded.
* Ensure only first settlement wins.

### Function Signature

```js
function withTimeout(promise, ms) {}
```

### Hints

* Race original promise against timeout promise.

---

## Problem 9: Debounced Async Function

### Interview Framing

A search API should only be called after the user stops triggering requests for a while.

### Problem Statement

Implement `debounceAsync(fn, delay)`.

* Returned function delays execution until no calls happen for `delay` ms.
* Only latest call should execute.
* Earlier pending calls should reject or resolve in a documented way.

### Requirements

* Decide and document cancellation behavior.
* Preserve `this` and arguments.

### Function Signature

```js
function debounceAsync(fn, delay) {}
```

---

## Problem 10: Throttled Async Function

### Interview Framing

An analytics endpoint must not be called too frequently.

### Problem Statement

Implement `throttleAsync(fn, interval)`.

* Allow at most one execution per `interval`.
* Decide whether to drop or queue the last call.
* Preserve context and args.

### Function Signature

```js
function throttleAsync(fn, interval) {}
```

---

## Problem 11: Polyfill Promise.all

### Interview Framing

Implement `Promise.all` from scratch.

### Problem Statement

Write `myPromiseAll(iterable)`.

### Requirements

* Resolve when all succeed.
* Reject immediately on first rejection.
* Preserve input order.
* Handle plain values.
* Empty input should resolve to `[]`.

### Function Signature

```js
function myPromiseAll(items) {}
```

---

## Problem 12: Polyfill Promise.any

### Interview Framing

Implement `Promise.any`.

### Problem Statement

Write `myPromiseAny(iterable)`.

### Requirements

* Resolve as soon as one promise fulfills.
* Reject only if all reject.
* Return aggregate reasons structure of your choice or `AggregateError` if supported.

### Function Signature

```js
function myPromiseAny(items) {}
```

---

## Problem 13: Polyfill Promise.race

### Interview Framing

Implement `Promise.race`.

### Problem Statement

Write `myPromiseRace(iterable)`.

### Requirements

* Settle with the first settled input.
* Handle plain values.
* Empty iterable should remain pending or follow your chosen documented behavior.

### Function Signature

```js
function myPromiseRace(items) {}
```

---

## Problem 14: Polyfill Promise.allSettled

### Interview Framing

Implement `Promise.allSettled`.

### Problem Statement

Write `myPromiseAllSettled(iterable)`.

### Requirements

* Wait for all inputs to settle.
* Return array of `{ status, value }` or `{ status, reason }`.
* Never reject due to input rejection.

### Function Signature

```js
function myPromiseAllSettled(items) {}
```

---

## Problem 15: Polyfill Function.prototype.call

### Interview Framing

Implement your own `call`.

### Problem Statement

Add `myCall` to `Function.prototype`.

### Requirements

* Accept context and individual args.
* Invoke function with provided `this`.
* Handle `null` and `undefined` by defaulting to global object.
* Use basic temporary property approach.

### Function Signature

```js
Function.prototype.myCall = function (context, ...args) {}
```

---

## Problem 16: Polyfill Function.prototype.apply

### Interview Framing

Implement your own `apply`.

### Problem Statement

Add `myApply` to `Function.prototype`.

### Requirements

* Accept context and array-like args.
* Handle missing args list.
* Preserve return value.

### Function Signature

```js
Function.prototype.myApply = function (context, argsArray) {}
```

---

## Problem 17: Polyfill Function.prototype.bind

### Interview Framing

Implement `bind`, including partial application.

### Problem Statement

Add `myBind` to `Function.prototype`.

### Requirements

* Return a new function.
* Bind `this` permanently.
* Support preset args.
* Bonus: handle constructor usage with `new`.

### Function Signature

```js
Function.prototype.myBind = function (context, ...presetArgs) {}
```

---

## Problem 18: Polyfill Array.prototype.reduce

### Interview Framing

Implement `reduce` with correct accumulator initialization.

### Problem Statement

Add `myReduce` to `Array.prototype`.

### Requirements

* Support optional initial value.
* Throw for empty array without initial value.
* Callback gets `(acc, current, index, array)`.

### Function Signature

```js
Array.prototype.myReduce = function (callback, initialValue) {}
```

---

## Problem 19: Polyfill Array.prototype.filter

### Interview Framing

Implement `filter` from scratch.

### Problem Statement

Add `myFilter` to `Array.prototype`.

### Requirements

* Return a new array of elements passing callback test.
* Callback receives `(value, index, array)`.

### Function Signature

```js
Array.prototype.myFilter = function (callback) {}
```

---

## Problem 20: Polyfill Object.create

### Interview Framing

Implement a simplified version of `Object.create`.

### Problem Statement

Write `myObjectCreate(proto)`.

### Requirements

* Return a new object whose prototype is `proto`.
* Bonus: reject invalid prototype values.

### Function Signature

```js
function myObjectCreate(proto) {}
```

---

## Problem 21: Implement once(fn)

### Interview Framing

Create a helper that only allows one execution.

### Problem Statement

Implement `once(fn)`.

### Requirements

* First call executes `fn`.
* Later calls return first result without re-executing.
* Preserve `this` and args.

### Function Signature

```js
function once(fn) {}
```

---

## Problem 22: Implement memoize(fn)

### Interview Framing

Cache expensive function calls.

### Problem Statement

Implement `memoize(fn)`.

### Requirements

* Cache based on arguments.
* Return cached result for repeated calls.
* Document limitations of your keying strategy.

### Function Signature

```js
function memoize(fn) {}
```

---

## Problem 23: Private Variables Using Closures

### Interview Framing

Simulate private state without classes using closures.

### Problem Statement

Implement `createBankAccount(initialBalance)`.

Return an object with:

* `deposit(amount)`
* `withdraw(amount)`
* `getBalance()`

### Requirements

* Balance must not be directly accessible.
* Reject invalid withdrawals.

### Function Signature

```js
function createBankAccount(initialBalance) {}
```

---

## Problem 24: Rate Limiter Using Closure

### Interview Framing

Allow only `n` calls in a rolling time window.

### Problem Statement

Implement `rateLimit(fn, limit, windowMs)`.

### Requirements

* Calls beyond limit should be blocked or rejected in a documented way.
* Preserve `this` and args.
* Use closure for internal timestamps.

### Function Signature

```js
function rateLimit(fn, limit, windowMs) {}
```

---

## Problem 25: Fix the var + setTimeout Bug

### Interview Framing

Explain why all values are the same and provide multiple fixes.

### Problem Statement

Given:

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

Answer:

1. What prints and why?
2. Fix it using `let`.
3. Fix it using IIFE.
4. Fix it using a helper function.

---

## Problem 26: Implement Currying

### Interview Framing

Transform a function so arguments can be supplied gradually.

### Problem Statement

Implement `curry(fn)`.

### Requirements

* If original function arity is 3, allow:

  * `curried(1,2,3)`
  * `curried(1)(2)(3)`
  * `curried(1,2)(3)`
* Return final result only when enough args are collected.

### Function Signature

```js
function curry(fn) {}
```

---

## Problem 27: Infinite Currying Sum

### Interview Framing

Implement a chainable function that ends when called with no arguments.

### Problem Statement

Support:

```js
sum(1)(2)(3)(4)() // 10
```

### Requirements

* Keep accumulating until empty call.
* Bonus: support `sum(1,2)(3)(4,5)()`.

### Function Signature

```js
function sum(...args) {}
```

---

## Problem 28: Function Logger Wrapper

### Interview Framing

Wrap any function so calls are logged for debugging or analytics.

### Problem Statement

Implement `withLogging(fn)`.

### Requirements

* Log function name, args, return value, and thrown errors.
* Preserve original `this`.
* Return the same final result or rethrow.

### Function Signature

```js
function withLogging(fn) {}
```

---

## Problem 29: Deep Clone with Circular Reference Handling

### Interview Framing

Clone complex objects safely, including self-references.

### Problem Statement

Implement `deepClone(value)`.

### Requirements

* Handle objects and arrays.
* Preserve circular references.
* Do not use `JSON.stringify`.
* Bonus: handle `Date`, `Map`, `Set`.

### Function Signature

```js
function deepClone(value, seen = new Map()) {}
```

---

## Problem 30: Deep Equality Check

### Interview Framing

Determine whether two values are structurally equal.

### Problem Statement

Implement `isEqual(a, b)`.

### Requirements

* Compare primitives, arrays, and plain objects deeply.
* Handle nested data.
* Bonus: handle circular references.

### Function Signature

```js
function isEqual(a, b) {}
```

---

## Problem 31: Flatten an Object

### Interview Framing

Normalize nested configuration into dot-path keys.

### Problem Statement

Convert:

```js
{ a: { b: 2 }, c: 3 }
```

into:

```js
{ 'a.b': 2, c: 3 }
```

### Requirements

* Flatten nested plain objects.
* Decide how to handle arrays and document it.

### Function Signature

```js
function flattenObject(obj, prefix = '', result = {}) {}
```

---

## Problem 32: Unflatten an Object

### Interview Framing

Reconstruct nested structure from dot-path keys.

### Problem Statement

Convert:

```js
{ 'a.b': 2, c: 3 }
```

into:

```js
{ a: { b: 2 }, c: 3 }
```

### Function Signature

```js
function unflattenObject(obj) {}
```

### Requirements

* Build nested objects progressively.
* Handle multiple sibling paths.

---

## Problem 33: Object Diff

### Interview Framing

Compare two state snapshots and report changed fields.

### Problem Statement

Implement `diffObjects(oldObj, newObj)`.

### Requirements

* Return changed keys and their old/new values.
* Support nested comparison.
* Decide output format, for example:

```js
{
  'user.name': { oldValue: 'A', newValue: 'B' }
}
```

### Function Signature

```js
function diffObjects(oldObj, newObj) {}
```

---

## Problem 34: Deep Merge Objects

### Interview Framing

Merge layered configuration files.

### Problem Statement

Implement `deepMerge(target, source)`.

### Requirements

* Merge nested objects recursively.
* Decide overwrite behavior for arrays.
* Do not mutate inputs unless documented.

### Function Signature

```js
function deepMerge(target, source) {}
```

---

## Problem 35: Implement pick(obj, keys)

### Interview Framing

Extract only required fields for API payloads.

### Problem Statement

Implement `pick(obj, keys)`.

### Requirements

* Return new object with only requested keys.
* Bonus: support nested paths.

### Function Signature

```js
function pick(obj, keys) {}
```

---

## Problem 36: Implement omit(obj, keys)

### Interview Framing

Remove sensitive or irrelevant fields from objects.

### Problem Statement

Implement `omit(obj, keys)`.

### Requirements

* Return new object excluding provided keys.
* Bonus: support nested paths.

### Function Signature

```js
function omit(obj, keys) {}
```

---

## Problem 37: Implement the new Operator

### Interview Framing

Simulate what happens when JavaScript executes `new`.

### Problem Statement

Implement `myNew(Constructor, ...args)`.

### Requirements

* Create a new object.
* Link it to `Constructor.prototype`.
* Invoke constructor with the new object as `this`.
* Return explicit object return if constructor returns one, else return created object.

### Function Signature

```js
function myNew(Constructor, ...args) {}
```

---

## Problem 38: Manual Prototypal Inheritance

### Interview Framing

Set up inheritance between constructor functions without using classes.

### Problem Statement

Implement `inherit(Child, Parent)`.

### Requirements

* Child prototype should inherit from Parent prototype.
* Reset constructor reference.
* Demonstrate parent and child method access.

### Function Signature

```js
function inherit(Child, Parent) {}
```

---

## Problem 39: Prototype Lookup Reasoning

### Interview Framing

Explain prototype chain behavior for deleted properties.

### Problem Statement

Given:

```js
function A() {}
A.prototype.x = 10;

const a = new A();
delete a.x;
console.log(a.x);
```

Answer:

1. What prints?
2. Why?
3. What if `a.x = 20` before deletion?
4. What if `delete A.prototype.x`?

---

## Problem 40: Class-Based Inheritance with Mixins

### Interview Framing

Compose reusable behaviors into classes.

### Problem Statement

Create:

* class `Vehicle`
* mixins `canFly`, `canSail`
* classes such as `Plane`, `Boat`

### Requirements

* Use inheritance for base data.
* Use mixins for shared optional behavior.
* Avoid duplicating method bodies.

### Function Signature

Open-ended design problem.

---

## Problem 41: Method Overriding and super Simulation (Without class)

### Interview Framing

Implement parent-child constructor relationships manually.

### Problem Statement

Using constructor functions only, implement:

* `Animal(name)` with `speak()`
* `Dog(name)` overriding `speak()`
* Dog’s `speak()` should call parent `speak()` first, then add custom behavior

### Requirements

* No `class` syntax.
* Use prototype inheritance.
* Simulate `super` manually.

---

## Problem 42: Singleton Pattern

### Interview Framing

Ensure only one instance of a config manager exists.

### Problem Statement

Implement `ConfigManager` as a singleton.

### Requirements

* Multiple instantiations should return same instance.
* Store global config values.
* Avoid polluting outer scope more than necessary.

### Bonus

Implement both function-based and class-based versions.

---

## Problem 43: Factory Pattern

### Interview Framing

Create users of different roles without exposing construction details.

### Problem Statement

Implement `createUser(type, data)`.

### Requirements

* Support roles such as `admin`, `customer`, `moderator`.
* Return objects/classes with role-specific methods.
* Keep creation logic centralized.

---

## Problem 44: Observer Pattern

### Interview Framing

A state store should notify subscribers whenever state changes.

### Problem Statement

Implement a basic observer system with:

* `subscribe(listener)`
* `unsubscribe(listener)`
* `notify(data)`

### Requirements

* Multiple subscribers.
* Unsubscribe should stop future notifications.
* Preserve notification order.

---

## Problem 45: Build Your Own EventEmitter

### Interview Framing

Implement a Node-style event system.

### Problem Statement

Create `EventEmitter` with:

* `on(event, listener)`
* `off(event, listener)`
* `emit(event, ...args)`
* `once(event, listener)`

### Requirements

* Multiple listeners per event.
* `once` auto-removes after first invocation.
* Emitting unknown event should be safe.

### Function Signature

```js
class EventEmitter {}
```

---

## Problem 46: Pub-Sub System

### Interview Framing

Create a topic-based messaging bus.

### Problem Statement

Implement `PubSub` with:

* `subscribe(topic, listener)`
* `publish(topic, payload)`
* unsubscribe function returned from `subscribe`

### Requirements

* Topic isolation.
* Multiple subscribers per topic.
* Publishing without listeners should be safe.

---

## Problem 47: Implement an LRU Cache

### Interview Framing

Design an LRU cache supporting `get` and `put` in efficient time.

### Problem Statement

Implement `LRUCache(capacity)`.

### Requirements

* `get(key)` returns value or `-1`/`undefined`.
* `put(key, value)` inserts or updates.
* Least recently used item is evicted when full.
* Aim for `O(1)` average operations.

### Hint

* Use `Map` cleverly or implement hash map + doubly linked list.

---

## Problem 48: Priority-Based Task Scheduler

### Interview Framing

Tasks enter a scheduler with priorities. Higher-priority tasks should run first.

### Problem Statement

Implement `TaskScheduler` with:

* `add(taskFn, priority)`
* `runNext()`
* `runAll()`

### Requirements

* Higher priority runs first.
* Stable ordering within same priority.
* Tasks may be sync or async.

### Function Signature

```js
class TaskScheduler {}
```

---

## Problem 49: Flatten a Deeply Nested Array

### Interview Framing

Normalize nested API payload arrays.

### Problem Statement

Implement `flattenArray(arr)`.

### Requirements

* Convert `[1, [2, [3, [4]]]]` to `[1, 2, 3, 4]`.
* Do not use `.flat(Infinity)`.
* Provide recursive solution.
* Bonus: provide iterative stack-based solution.

### Function Signature

```js
function flattenArray(arr) {}
```

---

## Problem 50: Implement groupBy

### Interview Framing

Group records by a key or mapping function.

### Problem Statement

Implement `groupBy(items, keyOrFn)`.

### Requirements

* If `keyOrFn` is a string, group by that property.
* If `keyOrFn` is a function, group by returned key.
* Return object mapping group key to array of items.

### Function Signature

```js
function groupBy(items, keyOrFn) {}
```

### Example

```js
groupBy(users, 'age');
groupBy(users, user => user.age >= 18 ? 'adult' : 'minor');
```

---

# How to Use This Sheet

A good interview-practice order:

1. Polyfills
2. Closures and function manipulation
3. Deep object problems
4. Prototype and class internals
5. Async control flow
6. Design patterns and LLD utilities

