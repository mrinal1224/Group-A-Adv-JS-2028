# Class-7 (Polyfills of call, apply, bind) - Detailed Notes with Code and Solutions

## 1) Polyfill idea

To simulate `call/apply`:
1. attach function temporarily on context object,
2. call it as object method,
3. remove temporary property.

Using `Symbol` avoids key collisions.

---

## 2) `myCall` solution

```js
Function.prototype.myCall = function (context, ...args) {
  const ctx = context == null ? globalThis : Object(context);
  const key = Symbol("fn");
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

function greet(city, country) {
  return `${this.name} ${city} ${country}`;
}
const p = { name: "Steve" };
console.log(greet.myCall(p, "Bengaluru", "India"));
```

### Output
`Steve Bengaluru India`

---

## 3) `myApply` solution

```js
Function.prototype.myApply = function (context, argsArray) {
  const ctx = context == null ? globalThis : Object(context);
  const key = Symbol("fn");
  ctx[key] = this;
  const args = argsArray == null ? [] : argsArray;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

function add(a, b, c) {
  return `${this.name}: ${a + b + c}`;
}
const obj = { name: "Calc" };
console.log(add.myApply(obj, [10, 20, 30]));
```

### Output
`Calc: 60`

---

## 4) `myBind` solution

```js
Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFn = this;
  return function (...lateArgs) {
    return originalFn.myApply(context, [...boundArgs, ...lateArgs]);
  };
};

function greet(city, country) {
  return `Hi ${this.name} from ${city}, ${country}`;
}
const user = { name: "Adam" };
const g = greet.myBind(user, "Mumbai");
console.log(g("India"));
```

### Output
`Hi Adam from Mumbai, India`

---

## 5) Edge cases and fixes

1. `context` null/undefined -> fallback to `globalThis`
2. primitive context -> `Object(context)`
3. property collision -> use `Symbol`
4. `apply` second arg null -> `[]`

---

## 6) Practice with answers

1. Why `Symbol` in polyfill?  
   **Answer:** Prevent overwriting existing properties.

2. How is `call` different from `apply` internally?  
   **Answer:** Same core logic; only argument intake differs.

3. Why does `bind` return function?  
   **Answer:** It stores context now and executes later.
