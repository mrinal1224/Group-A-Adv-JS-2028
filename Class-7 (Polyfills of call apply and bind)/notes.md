# Class-7 (Polyfills of call, apply, bind) Notes

## 1) Why Polyfills for Function Methods?

In this class, goal is to understand how native `call`, `apply`, and `bind` work internally by creating custom versions.

Why this matters:
- improves understanding of `this` binding deeply,
- sharpens interview problem-solving,
- helps reason about older environments and JS internals.

---

## 2) Core Internal Idea Behind `call/apply`

If function `fn` must run with `this = obj`, one classic internal trick is:
1. temporarily attach function to object (`obj.tempFn = fn`)
2. call as method (`obj.tempFn(...)`) so `this` becomes `obj`
3. delete temporary property
4. return result

This is exactly what your class polyfill demonstrates.

---

## 3) `myCall` Polyfill (Class Code Understanding)

Current class approach:
- defined on `Function.prototype` so every function can use it
- default context fallback to `globalThis` for null/undefined
- invoke with spread args
- cleanup temporary attached function

Conceptual flow:
```js
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  context.tempFn = this;
  const result = context.tempFn(...args);
  delete context.tempFn;
  return result;
};
```

---

## 4) `myApply` Polyfill (How It Differs)

`apply` differs only in argument passing style:
- second parameter should be array/array-like list of arguments
- function invoked with unpacked list

Conceptual signature:
`myApply(context, argsArray)`

Your current class version is very close to `call`, so the key enhancement is:
- accept a single array as arguments container
- spread that array during invocation.

---

## 5) `myBind` Polyfill Concept

`bind` should:
- not execute immediately,
- return a new wrapper function,
- call original function later with bound context,
- combine bound-time args + call-time args.

From previous class implementation style:
```js
Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFn = this;
  return function (...lateArgs) {
    return originalFn.apply(context, [...boundArgs, ...lateArgs]);
  };
};
```

---

## 6) Important Edge Cases for Interview-Level Polyfills

1. `context` is `null` or `undefined`.
2. `context` is primitive (`"abc"`, `10`, `true`) -> convert to object wrapper.
3. Temporary property name collision -> use `Symbol` instead of `"tempFn"`.
4. `apply` second argument missing/null -> treat as empty argument list.
5. `bind` used with `new` (advanced behavior) in full spec implementation.

---

## 7) Safer Polyfill Pattern (Collision-Free)

Instead of `context.tempFn`, use:
- `const key = Symbol("fn")`
- `context[key] = this`

This avoids accidentally overwriting existing properties and is cleaner for production-quality interview answers.

---

## 8) `call` vs `apply` in Polyfill Terms

Internal algorithm mostly same:
- set context,
- attach function,
- invoke,
- cleanup.

Only real difference:
- `call`: receives individual args
- `apply`: receives one array-like arg list

---

## 9) Common Mistakes in Polyfill Implementations

1. Typo/variable mismatch (e.g., `cb` vs `callback` style mistakes).
2. Not returning function result.
3. Forgetting cleanup temporary property.
4. Not handling null/undefined context.
5. Not validating `argsArray` shape in `apply`.
6. Using arrow function where `this` needs dynamic binding.

---

## 10) Real-World Relevance

Even if browsers already support these methods:
- interviews test your thinking depth via polyfills,
- frameworks/util libraries use similar context-binding mechanics,
- understanding helps debug tricky callback bugs.

---

## 11) Suggested Improvement Tasks for Students

1. Upgrade `myCall` to use `Symbol`.
2. Rewrite `myApply` to accept exactly one args array.
3. Add validation in `myApply` for non-array second input.
4. Implement `myBind` and support partial application.
5. Attempt advanced `new` behavior support in `myBind`.

---

## 12) Quick Revision Checklist

- [ ] I can explain internal temp-attach-call-delete trick.
- [ ] I can differentiate call/apply arg style clearly.
- [ ] I can write basic polyfills on `Function.prototype`.
- [ ] I can discuss collision and `Symbol` improvement.
- [ ] I can explain bind partial application behavior.

---

## Interview Questions (Real-Life + Project Based)

1. Implement `myCall` without using native `call/apply/bind`.  
   How will you prevent property name collision on context object?

2. You are writing a utility library for legacy environment where `apply` is unavailable.  
   Design `myApply` and explain handling for invalid second argument.

3. Build `myBind` for an event system:
   - context fixed at setup time,
   - event args passed at trigger time.
   How do you combine both argument sets?

4. A production bug appears: temporary function key overwrote an existing object property.  
   How would you redesign polyfill safely?

5. In a multi-tenant backend, shared formatter function must run with tenant-specific context.  
   Which method/polyfill pattern would you use and why?

6. Explain with implementation why `bind` returns function but `call/apply` execute immediately.

7. Your teammate sets `context = context || globalThis`; what issue can occur for valid falsy values?  
   How would you write safer fallback logic?

8. Extend `myApply` so it accepts array-like object (`{0:'a',1:'b',length:2}`).  
   What conversion strategy would you use?

9. Build a mini middleware runner that borrows same handler for different request contexts.  
   Demonstrate where polyfilled `call` helps.

10. How would you test your polyfills against native behavior for:
    - null context,
    - primitive context,
    - return values,
    - thrown errors?
