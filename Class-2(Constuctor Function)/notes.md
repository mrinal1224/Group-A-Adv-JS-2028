

---

# ✅ JavaScript OOPs – Class 2

## Constructor Functions & Prototypes (Master Notes)

---

## Agenda of the Lecture

### What we will cover today

1. **Object Creation Patterns** – Why we need constructor functions
2. **Constructor Functions** – Definition, syntax, and how they work
3. **The `new` Keyword** – Step-by-step execution (CRITICAL)
4. **`this` in Constructor Context** – What `this` refers to
5. **Prototype & Prototype Chain** – Memory efficiency and shared behavior
6. **Adding Methods** – Constructor vs Prototype (when to use which)
7. **Factory Pattern** – Alternative approach (manual object creation)
8. **Prototype Pollution & Shadowing** – Dangers of modifying built-in prototypes
9. **Constructor vs Factory** – Comparison and use cases

> 💡 *Goal of this class: You should understand how JavaScript creates reusable object blueprints and how the prototype chain enables inheritance.*

---

## 1. Why Do We Need Constructor Functions?

### The Problem: Creating Multiple Similar Objects

Imagine you run a **Pizza Shop**. You need to create many pizza objects, each with:
- `size` (Small, Medium, Large)
- `toppings` (array of toppings)
- `preference` (Veg/Non-Veg)
- `crust` (Thin/Thick)
- A `serve()` method to serve the pizza

### ❌ Naive Approach (Repetitive & Error-Prone)

```js
let pizza1 = {
  size: "Medium",
  toppings: ["cheese", "tomato"],
  preference: "Veg",
  crust: "Thin",
  serve: function () {
    console.log(`A ${this.size} Pizza with ${this.toppings} is served`);
  }
};

let pizza2 = {
  size: "Small",
  toppings: ["cheese", "onion"],
  preference: "Veg",
  crust: "Thick",
  serve: function () {
    console.log(`A ${this.size} Pizza with ${this.toppings} is served`);
  }
};

// ... and so on for pizza3, pizza4, pizza5...
```

**Problems:**
- **Code duplication** – Same structure repeated for every pizza
- **Memory waste** – Each object has its own copy of `serve` function
- **Maintenance nightmare** – Change `serve` logic? Update every single object!
- **No consistency** – Easy to miss a property or typo

---

### ✅ Solution: Constructor Functions

A **constructor function** is a blueprint/template that:
1. Defines the **structure** of objects
2. Allows **creating multiple instances** with the `new` keyword
3. Shares **methods** via the prototype (saving memory)

---

## 2. Constructor Functions – Definition & Syntax

### What is a Constructor Function?

A constructor function is a **regular function** that:
- Is **invoked with the `new` keyword**
- Uses `this` to assign properties to the newly created object
- By convention, is named with **PascalCase** (e.g., `Pizza`, `User`, `Car`)

### Basic Syntax

```js
function Pizza(size, toppings, preference, crust) {
  // this -> refers to the new object being created
  this.size = size;
  this.toppings = toppings;
  this.preference = preference;
  this.crust = crust;
}
```

### Creating Instances

```js
let pizza1 = new Pizza("Medium", ["cheese", "tomato"], "Veg", "Thin");
let pizza2 = new Pizza("Small", ["cheese", "onion"], "Veg", "Thick");
let pizza3 = new Pizza("Large", ["pepperoni", "olives"], "Non-Veg", "Thin");

console.log(pizza1);  // Pizza { size: "Medium", toppings: [...], ... }
console.log(pizza2);  // Pizza { size: "Small", toppings: [...], ... }
```

Each call to `new Pizza(...)` creates a **new, independent object** with its own property values.

---

## 3. The `new` Keyword – Step-by-Step Execution (CRITICAL)

### What Happens When You Write `new Pizza(...)`?

When JavaScript executes `new Pizza("Medium", ["cheese", "tomato"], "Veg", "Thin")`, it performs **4 steps** in order:

---

### Step 1: Create an Empty Object

```js
// JavaScript internally does something like:
let newObj = {};
```

A brand new, empty object is created in memory.

---

### Step 2: Set the Prototype

```js
// JavaScript sets:
newObj.__proto__ = Pizza.prototype;
// OR (modern way): Object.setPrototypeOf(newObj, Pizza.prototype);
```

The new object's **prototype** is set to `Pizza.prototype`. This links the object to the constructor's prototype chain.

---

### Step 3: Execute the Constructor with `this` Bound to the New Object

```js
// JavaScript calls:
Pizza.call(newObj, "Medium", ["cheese", "tomato"], "Veg", "Thin");
```

Inside the constructor:
- `this` refers to `newObj` (the newly created object)
- All assignments like `this.size = size` add properties to `newObj`

---

### Step 4: Return the Object (if no explicit return)

```js
// If the constructor doesn't return an object, JavaScript returns newObj
return newObj;
```

**Important:** If the constructor explicitly returns a non-primitive (object/array), that value is returned instead of `newObj`. Returning a primitive (number, string, etc.) is ignored.

---

### Visual Summary

```
new Pizza("Medium", ["cheese"], "Veg", "Thin")
    │
    ├─► 1. Create {} 
    ├─► 2. {}.__proto__ = Pizza.prototype
    ├─► 3. Run Pizza() with this = {}
    │       → this.size = "Medium"
    │       → this.toppings = ["cheese"]
    │       → this.preference = "Veg"
    │       → this.crust = "Thin"
    └─► 4. Return the object
```

---

## 4. `this` in Constructor Context

### What Does `this` Refer To?

Inside a constructor function **when called with `new`**:

> 🧠 **`this` refers to the newly created object** (the instance being constructed)

```js
function Pizza(size, toppings, preference, crust) {
  console.log(this);  // Pizza {}  (empty at start, then gets properties)
  this.size = size;
  this.toppings = toppings;
  this.preference = preference;
  this.crust = crust;
  console.log(this);  // Pizza { size: "...", toppings: [...], ... }
}

let pizza1 = new Pizza("Medium", ["cheese"], "Veg", "Thin");
```

### ⚠️ What if You Forget `new`?

```js
let pizza1 = Pizza("Medium", ["cheese"], "Veg", "Thin");  // No 'new'!
```

- `this` will be `window` (browser, non-strict) or `undefined` (strict mode)
- No new object is created
- Properties get assigned to the wrong place
- `pizza1` will be `undefined` (constructor returns nothing explicitly)

**Best Practice:** Use PascalCase for constructors so you remember to use `new`. Some patterns (e.g., checking `!(this instanceof Pizza)`) can enforce `new`, but ES6 classes do this automatically.

---

## 5. Prototype & Prototype Chain

### Why Add Methods on Prototype?

If you add methods **inside** the constructor:

```js
function Pizza(size, toppings, preference, crust) {
  this.size = size;
  this.toppings = toppings;
  this.preference = preference;
  this.crust = crust;
  this.serve = function () {  // ❌ BAD: New function for EVERY instance
    console.log(`A ${this.size} Pizza with ${this.toppings} is served`);
  };
}

let p1 = new Pizza("M", [], "Veg", "Thin");
let p2 = new Pizza("L", [], "Veg", "Thick");
// p1.serve !== p2.serve  → Each has its own copy!
```

**Problem:** Every instance gets its **own copy** of `serve`. 1000 pizzas = 1000 identical functions in memory.

---

### ✅ Solution: Add Methods on Prototype

```js
function Pizza(size, toppings, preference, crust) {
  this.size = size;
  this.toppings = toppings;
  this.preference = preference;
  this.crust = crust;
}

Pizza.prototype.serve = function () {
  console.log(`A ${this.size} Pizza with ${this.toppings} is served`);
};

let p1 = new Pizza("M", [], "Veg", "Thin");
let p2 = new Pizza("L", [], "Veg", "Thick");

p1.serve();  // Works!
p2.serve();  // Works!
// p1.serve === p2.serve  → Same function, shared!
```

**Benefit:** All instances **share** the same `serve` function. One copy in memory, referenced by all.

---

### How Does `p1.serve()` Work? (Prototype Chain)

1. JavaScript looks for `serve` on `p1` → **Not found**
2. JavaScript looks on `p1.__proto__` (i.e., `Pizza.prototype`) → **Found!**
3. `serve` is called with `this = p1` (the object before the dot)

```
p1  →  { size, toppings, preference, crust }
        │
        └── __proto__  →  Pizza.prototype  →  { serve: function }
```

This is the **prototype chain**. If a property isn't on the object, JS looks up the chain.

---

### Prototype Chain Diagram

```
Instance (pizza1)              Constructor (Pizza)           Built-in
     │                              │
     │  __proto__                   │  .prototype
     └─────────────────────────────┘
                    │
                    │  __proto__
                    └──────────────────► Object.prototype
                                              │
                                              │  __proto__
                                              └──────────────────► null
```

---

## 6. Adding Methods – Constructor vs Prototype

| Aspect | In Constructor | On Prototype |
|--------|----------------|--------------|
| **When to use** | Rarely for methods | Almost always for methods |
| **Memory** | Each instance gets a copy | Shared across all instances |
| **Access to constructor args** | Yes (closure) | Yes (via `this`) |
| **Override per instance** | Possible | Possible (shadowing) |

**Rule of Thumb:**
- **Properties** (data) → Constructor (`this.size = size`)
- **Methods** (behavior) → Prototype (`Pizza.prototype.serve = function() {}`)

---

## 7. Factory Pattern – Alternative Approach

### What is the Factory Pattern?

Instead of `new`, you use a **regular function** that:
1. Creates an empty object
2. Assigns properties
3. Returns the object

```js
function createPizza(size, toppings, crust, preference) {
  let obj = {};

  obj.size = size;
  obj.toppings = toppings;
  obj.crust = crust;
  obj.preference = preference;
  obj.serve = function () {
    console.log("Pizza Served");
  };

  return obj;
}

let pizza3 = createPizza("small", ["cheese", "onion"], "Veg", "Thick");
let pizza4 = createPizza("Medium", ["cheese", "tomato"], "Veg", "Thin");

console.log(pizza3);
console.log(pizza4);
pizza3.serve();
pizza4.serve();
```

### Constructor vs Factory

| Aspect | Constructor | Factory |
|--------|-------------|---------|
| **Keyword** | `new` required | No `new` |
| **`this`** | Refers to new object | Not used (or explicit object) |
| **`instanceof`** | Works | Doesn't work |
| **Prototype** | Uses prototype chain | Each object can have own methods |
| **Memory** | Methods shared via prototype | Methods duplicated per object (if defined inside) |

---

## 8. Prototype Pollution & Shadowing

### What is Prototype Shadowing?

Every object in JavaScript has a prototype. **Built-in objects** (like `Array`, `Object`) have prototypes that all instances share.

### ⚠️ DANGER: Modifying Built-in Prototypes

```js
let person = { name: 'Adam', age: 28, phone: 1234567 };
let arr = [1, 2, 3, 4];

console.log(person);
console.log(arr);

// ❌ DANGEROUS: Overwriting Array.prototype.map
Array.prototype.map = function () {
  console.log("This is my Map Function");
};

// Now EVERY array in the entire application is affected!
let myArr = [5, 6, 7];
myArr.map();  // "This is my Map Function" - Original map is GONE!
```

**What happened?**
- `Array.prototype.map` is the **shared** `map` function for all arrays
- By reassigning it, you **broke** the native `map` for every array everywhere
- This is called **prototype pollution** or **monkey patching** (when done intentionally for polyfills)

### Why is This Bad?

1. **Breaks existing code** – Libraries and your own code expect `map` to work
2. **Unpredictable** – Other developers (or you in 6 months) won't know why `map` behaves oddly
3. **Global side effects** – Affects the entire runtime

### When is Modifying Prototypes Acceptable?

- **Polyfills** – Adding a method that doesn't exist yet (e.g., `Array.prototype.includes` in old browsers)
- **Your own constructors** – `Pizza.prototype.serve` is fine; you own that

**Rule:** Never modify built-in prototypes in production unless you have a very good reason (e.g., official polyfill).

---

## 9. Constructor vs Factory – When to Use Which?

### Use Constructor When:
- You want **inheritance** (prototype chain)
- You need `instanceof` checks
- You're building a **class-like** hierarchy
- You want **memory efficiency** (shared methods)

### Use Factory When:
- You don't need `instanceof`
- You want **flexibility** (return different object types)
- You're in a **functional** style codebase
- You want to **encapsulate** creation logic

---

## 10. Interview Cheat Sheet

| Concept | Key Point |
|---------|-----------|
| Constructor | Function + `new` → creates object, `this` = new object |
| `new` steps | 1. Create {} 2. Set prototype 3. Run constructor 4. Return |
| Prototype | Shared storage for methods; saves memory |
| Prototype chain | Object → Constructor.prototype → Object.prototype → null |
| Methods | Prefer prototype over constructor (memory) |
| Factory | Function that returns object; no `new` |
| Prototype pollution | Modifying Array.prototype etc. = dangerous |

---

## 11. Final Takeaways

1. **Constructor + `new`** = Blueprint for creating similar objects
2. **`this`** in constructor = the new object being created
3. **Prototype** = Shared methods; use it for behavior, not per-instance data
4. **Factory** = Alternative without `new`; no prototype chain by default
5. **Never** modify built-in prototypes (Array, Object, etc.) in production

---

## Related Interview Questions (Class 2)

### Basic Level

**Q1. What is a constructor function in JavaScript?**
- A constructor function is a regular function used with the `new` keyword to create objects. It uses `this` to assign properties to the newly created instance. By convention, it's named in PascalCase.

**Q2. What happens when you use the `new` keyword?**
- Four steps: (1) Create empty object, (2) Set its prototype to Constructor.prototype, (3) Execute constructor with `this` bound to new object, (4) Return the object (unless constructor returns another object).

**Q3. What does `this` refer to inside a constructor function?**
- `this` refers to the newly created object (the instance) when the constructor is called with `new`.

**Q4. Why should we add methods on the prototype instead of inside the constructor?**
- Methods on the prototype are shared across all instances, saving memory. Methods inside the constructor create a new copy for each instance.

### Intermediate Level

**Q5. What is the prototype chain?**
- When you access a property, JavaScript first looks on the object. If not found, it looks on `object.__proto__` (the constructor's prototype). This continues until `Object.prototype` and then `null`. This lookup path is the prototype chain.

**Q6. What is the difference between constructor pattern and factory pattern?**
- Constructor uses `new`, creates objects linked to a prototype, and supports `instanceof`. Factory is a function that creates and returns objects manually, without `new` or prototype linkage.

**Q7. What happens if you call a constructor without `new`?**
- `this` will be `window` (non-strict) or `undefined` (strict). No new object is created. The "instance" variable will be `undefined` if the constructor doesn't return anything.

**Q8. What is prototype pollution?**
- Modifying built-in object prototypes (e.g., `Array.prototype.map`) affects all instances globally. It can break existing code and cause unpredictable behavior.

### Advanced Level

**Q9. How would you implement the `new` keyword from scratch?**
```js
function myNew(Constructor, ...args) {
  let obj = Object.create(Constructor.prototype);
  let result = Constructor.apply(obj, args);
  return (typeof result === 'object' && result !== null) ? result : obj;
}
```

**Q10. What is the difference between `__proto__` and `prototype`?**
- `prototype` is a property of the constructor function; it's the object that will be used as the prototype for instances. `__proto__` is a property of an instance; it points to its constructor's `prototype`. (In other words: `instance.__proto__ === Constructor.prototype`)

---

## End of Class 2 Notes
