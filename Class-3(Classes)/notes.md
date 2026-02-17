

---

# ✅ JavaScript OOPs – Class 3

## ES6 Classes, Inheritance & Encapsulation (Master Notes)

---

## Agenda of the Lecture

### What we will cover today

1. **ES6 Classes** – Syntactic sugar over constructor functions
2. **Class Syntax** – Constructor, properties, methods
3. **Static Properties & Methods** – Class-level, not instance-level
4. **Private Fields** – `#` syntax for true encapsulation
5. **Private Methods** – `#methodName()` for internal logic
6. **Inheritance** – `extends` and `super`
7. **Method Overriding** – Polymorphism in action
8. **Classical vs Prototypal Inheritance** – JavaScript's model
9. **Abstraction & Polymorphism** – OOP concepts in JS

> 💡 *Goal of this class: You should understand modern class-based OOP in JavaScript and how it maps to the underlying prototype system.*

---

## 1. ES6 Classes – Introduction

### What Are ES6 Classes?

ES6 (ECMAScript 2015) introduced the **`class`** keyword. Classes provide:
- A cleaner, more readable syntax for creating object blueprints
- Built-in support for inheritance
- Static members
- Private fields (with `#`)

### Important: Classes Are Syntactic Sugar

> 🧠 **Under the hood, JavaScript classes still use prototypes.** There is no "classical" class system like in Java or C++. The `class` keyword is syntactic sugar over constructor functions and the prototype chain.

```js
// These are conceptually the same:
function Pizza(size) { this.size = size; }
Pizza.prototype.serve = function() {};

// vs

class Pizza {
  constructor(size) { this.size = size; }
  serve() {}
}
```

Both create a constructor and attach methods to the prototype.

---

## 2. Class Syntax – Constructor, Properties, Methods

### Basic Class Structure

```js
class Pizza {
  constructor(size, toppings, preference, crust) {
    this.size = size;
    this.toppings = toppings;
    this.preference = preference;
    this.crust = crust;
  }

  serve() {
    console.log(`This is a ${this.size} Pizza (normal Pizza)`);
  }
}
```

### Breakdown

| Part | Purpose |
|------|---------|
| `class Pizza` | Declares a class named `Pizza` |
| `constructor(...)` | Special method run when `new Pizza(...)` is called. Sets up instance properties. |
| `serve()` | Instance method. Automatically added to `Pizza.prototype`. |

### Creating Instances

```js
let pizza1 = new Pizza("Medium", ["cheese", "tomato"], "Veg", "Thin");
pizza1.serve();  // "This is a Medium Pizza (normal Pizza)"
```

### Key Rules

1. **Constructor is mandatory** if you need to initialize properties. (You can omit it if the class has no initial state.)
2. **Methods are not comma-separated** – unlike object literals, you don't use commas between methods.
3. **Classes are not hoisted** – you cannot use a class before it's declared (unlike functions).
4. **Classes run in strict mode** – always, by default.

---

## 3. Static Properties & Methods

### What Are Static Members?

**Static** properties and methods belong to the **class itself**, not to instances. They are shared across all instances and are accessed via the class name.

### Static Property

```js
class Pizza {
  static totalPizza = 0;  // Class-level counter

  constructor(size, toppings, preference, crust) {
    this.size = size;
    this.toppings = toppings;
    this.preference = preference;
    this.crust = crust;
    Pizza.totalPizza++;   // Increment on each new pizza
  }
}
```

- `totalPizza` is stored on `Pizza`, not on each instance.
- Every time a new `Pizza` is created, `Pizza.totalPizza` increases.

### Static Method

```js
class Pizza {
  static totalPizza = 0;

  constructor(size, toppings, preference, crust) {
    // ...
    Pizza.totalPizza++;
  }

  static showTotalPizza() {
    console.log(Pizza.totalPizza);
  }
}

let p1 = new Pizza("M", [], "Veg", "Thin");
let p2 = new Pizza("L", [], "Veg", "Thick");

Pizza.showTotalPizza();  // 2  (called on class, not instance)
// p1.showTotalPizza();  // ❌ Error - instances don't have this method
```

### When to Use Static

- **Utility functions** – e.g., `Date.now()`, `Math.random()`
- **Factory methods** – e.g., `Pizza.createDefault()`
- **Counters / shared state** – e.g., `totalPizza`
- **Constants** – e.g., `Pizza.MAX_TOPPINGS = 10`

---

## 4. Private Fields (`#`)

### The Problem: No True Privacy in Plain Objects

In a normal object or constructor, all properties are "public":

```js
let pizza = new Pizza("M", [], "Veg", "Thin");
pizza.size = "Hacked";  // Anyone can change it
```

### Solution: Private Fields

Private fields use the `#` prefix. They are **truly private** – not accessible from outside the class.

```js
class Pizza {
  #size;  // Private field declaration

  constructor(size, toppings, preference, crust) {
    this.#size = size;      // Assign to private field
    this.toppings = toppings;
    this.preference = preference;
    this.crust = crust;
  }

  serve() {
    console.log(`This is a ${this.#size} Pizza`);  // ✅ Can access inside class
  }
}

let pizza = new Pizza("Medium", [], "Veg", "Thin");
console.log(pizza.#size);   // ❌ SyntaxError: Private field '#size' must be declared in an enclosing class
pizza.serve();              // ✅ "This is a Medium Pizza"
```

### Rules for Private Fields

1. **Must be declared** at the top of the class (e.g., `#size;`) before use.
2. **Cannot be accessed** from outside the class – not even by subclasses (unless re-declared).
3. **Naming** – `#` is part of the name; `#size` and `size` are different.
4. **No default value** in declaration – you assign in the constructor.

### ⚠️ Common Mistake: Mixing `this.size` and `this.#size`

If you use `#size` in the constructor but `this.size` in a method, you'll get `undefined`:

```js
serve() {
  console.log(`This is a ${this.size} Pizza`);  // ❌ undefined (property doesn't exist)
}
// Should be:
serve() {
  console.log(`This is a ${this.#size} Pizza`);  // ✅ Correct
}
```

---

## 5. Private Methods (`#methodName`)

### What Are Private Methods?

Private methods are only callable from within the class. They're useful for internal logic you don't want exposed.

```js
class Pizza {
  #size;

  constructor(size, toppings, preference, crust) {
    this.#size = size;
    this.toppings = toppings;
    this.preference = preference;
    this.crust = crust;
  }

  #describe() {
    console.log("Description of the Pizza");
  }

  test() {
    this.#describe();  // ✅ Can call from another method in the same class
  }
}

let pizza = new Pizza("M", [], "Veg", "Thin");
pizza.test();           // "Description of the Pizza"
pizza.#describe();      // ❌ SyntaxError: Private field '#describe' must be declared...
```

### Use Cases

- **Internal helpers** – Validation, formatting, calculations
- **Encapsulation** – Hide implementation details
- **Refactoring** – Change internal logic without breaking external API

---

## 6. Inheritance – `extends` and `super`

### What is Inheritance?

Inheritance allows a **child class** to reuse and extend a **parent class**:
- Child gets all properties and methods of the parent
- Child can add its own properties and methods
- Child can override parent methods

### Syntax: `extends`

```js
class StuffedPizza extends Pizza {
  constructor(size, toppings, preference, crust, stuffing) {
    super(size, toppings, preference, crust);  // MUST call super first!
    this.stuffing = stuffing;
  }
}
```

### The `super` Keyword

`super` has two uses:

1. **`super(...args)`** – Calls the parent constructor. **Must be called before using `this`** in the child constructor.
2. **`super.methodName()`** – Calls a parent method (used when overriding).

### Why Must `super()` Be Called First?

JavaScript does not create `this` until the parent constructor runs. So:

```js
constructor(size, toppings, preference, crust, stuffing) {
  this.stuffing = stuffing;  // ❌ Error: Must call super() before using 'this'
  super(size, toppings, preference, crust);
}
```

```js
constructor(size, toppings, preference, crust, stuffing) {
  super(size, toppings, preference, crust);  // ✅ Correct
  this.stuffing = stuffing;
}
```

### Creating Instances of Child Class

```js
let pizza2 = new StuffedPizza(
  "Large",
  ["cheese", "tomato", "Mushrooms"],
  "Veg",
  "Thick",
  "Mozzarella"
);

console.log(pizza2.size);       // "Large" (from parent)
console.log(pizza2.stuffing);   // "Mozzarella" (from child)
pizza2.serve();                 // Uses parent's serve (or overridden version)
```

---

## 7. Method Overriding – Polymorphism

### What is Method Overriding?

When a child class defines a method with the **same name** as the parent, the child's version **overrides** the parent's for instances of the child.

```js
class Pizza {
  serve() {
    console.log(`This is a ${this.size} Pizza (normal Pizza)`);
  }
}

class StuffedPizza extends Pizza {
  serve() {
    console.log(`This is a ${this.size} Pizza (stuffed)`);
  }
}

let normal = new Pizza("M", [], "Veg", "Thin");
let stuffed = new StuffedPizza("L", [], "Veg", "Thick", "Cheese");

normal.serve();   // "This is a M Pizza (normal Pizza)"
stuffed.serve();  // "This is a L Pizza (stuffed)"
```

### Calling Parent Method from Override

Use `super.methodName()` to call the parent's implementation:

```js
class StuffedPizza extends Pizza {
  serve() {
    super.serve();  // Call parent's serve first
    console.log(`With stuffing: ${this.stuffing}`);
  }
}
```

---

## 8. Classical vs Prototypal Inheritance

### Classical Inheritance (e.g., Java, C++)

- Classes are **blueprints**
- Objects are **instances** of classes
- Inheritance is **class-based** – you extend a class
- No direct prototype chain in the language model

### Prototypal Inheritance (JavaScript)

- **No classes** at the language level (before ES6) – only objects
- Objects inherit from other objects via the **prototype chain**
- `class` and `extends` are **syntactic sugar** – they still create a prototype chain

### What JavaScript Actually Does

```js
class StuffedPizza extends Pizza { }
```

Under the hood:
- `StuffedPizza.prototype.__proto__ === Pizza.prototype`
- So `StuffedPizza` instances can use `Pizza`'s methods via the chain

```
stuffedPizzaInstance
    → __proto__ → StuffedPizza.prototype
    → __proto__ → Pizza.prototype
    → __proto__ → Object.prototype
    → __proto__ → null
```

> 📌 **JavaScript uses Prototypal Inheritance.** The `class` keyword makes it look classical, but the engine still uses prototypes.

---

## 9. Abstraction & Polymorphism (OOP Concepts)

### Abstraction

**Abstraction** = Hiding complex implementation, exposing only what's needed.

In JavaScript:
- **Private fields/methods** (`#`) – Hide internal state and logic
- **Modules** – Export only public API
- **Interfaces** (in TypeScript) – Define contracts without implementation

Example: Users of `Pizza` don't need to know how `#describe()` works; they only call `test()`.

### Polymorphism

**Polymorphism** = Same interface, different behavior.

In JavaScript:
- **Method overriding** – Child class provides its own `serve()`
- **Duck typing** – If it has a `serve` method, we can call it, regardless of class

```js
function servePizza(pizza) {
  pizza.serve();  // Works for Pizza, StuffedPizza, or any object with serve()
}
```

---

## 10. Complete Example – Full Flow

```js
class Pizza {
  static totalPizza = 0;
  #size;

  constructor(size, toppings, preference, crust) {
    this.#size = size;
    this.toppings = toppings;
    this.preference = preference;
    this.crust = crust;
    Pizza.totalPizza++;
  }

  static showTotalPizza() {
    console.log(Pizza.totalPizza);
  }

  serve() {
    console.log(`This is a ${this.#size} Pizza (normal Pizza)`);
  }

  #describe() {
    console.log("Description of the Pizza");
  }

  test() {
    this.#describe();
  }
}

class StuffedPizza extends Pizza {
  constructor(size, toppings, preference, crust, stuffing) {
    super(size, toppings, preference, crust);
    this.stuffing = stuffing;
  }

  // serve() overridden – comment out to use parent's serve
  // serve() {
  //   console.log(`This is a ${this.size} Pizza (stuffed)`);
  // }
}

let pizza1 = new Pizza("Medium", ["cheese", "tomato"], "Veg", "Thin");
let pizza2 = new StuffedPizza("Large", ["cheese", "tomato", "Mushrooms"], "Veg", "Thick", "Mozzarella");

console.log(pizza1);
console.log(pizza2);
pizza2.test();
Pizza.showTotalPizza();  // 2
```

---

## 11. Interview Cheat Sheet

| Concept | Key Point |
|---------|-----------|
| ES6 Class | Syntactic sugar over constructor + prototype |
| Constructor | Runs on `new`, sets up `this` |
| Static | Belongs to class, not instance; use `ClassName.staticMember` |
| Private field | `#name` – only accessible inside class |
| Private method | `#method()` – same as above |
| extends | Child inherits from parent |
| super() | Must call in child constructor before `this` |
| super.method() | Call parent method when overriding |
| Overriding | Child method with same name replaces parent's |
| Prototypal | JS uses prototypes; classes are sugar |

---

## 12. Final Takeaways

1. **Classes** = Cleaner syntax for constructors and prototypes
2. **Static** = Class-level; use for utilities, counters, constants
3. **Private** = `#` for fields and methods; true encapsulation
4. **extends** = Inheritance; **super** = parent constructor or method
5. **Polymorphism** = Override methods; same interface, different behavior
6. **JavaScript** = Prototypal inheritance; classes are syntactic sugar

---

## Related Interview Questions (Class 3)

### Basic Level

**Q1. What is the difference between a class and a constructor function?**
- A class is syntactic sugar over a constructor function. Both create a constructor and use the prototype for methods. Classes add cleaner syntax, `extends`, `super`, static members, and private fields.

**Q2. What is the `constructor` method in a class?**
- The `constructor` is a special method that runs when `new ClassName()` is called. It initializes instance properties. Each class can have at most one constructor.

**Q3. What are static methods and when would you use them?**
- Static methods belong to the class, not instances. They're called as `ClassName.method()`. Use for utilities (e.g., `Date.now()`), factory methods, or shared logic that doesn't need instance data.

**Q4. What is the `extends` keyword used for?**
- `extends` creates inheritance. The child class inherits all properties and methods from the parent and can add or override them.

### Intermediate Level

**Q5. Why must we call `super()` before using `this` in a child constructor?**
- JavaScript doesn't create `this` until the parent constructor runs. The parent constructor is responsible for setting up the object. Calling `super()` invokes the parent constructor and initializes `this`.

**Q6. What are private fields (`#`) and how do they work?**
- Private fields use the `#` prefix. They're only accessible inside the class that declares them. They provide true encapsulation – not accessible from outside or from subclasses (unless re-declared).

**Q7. How do you override a method in a child class?**
- Define a method with the same name in the child class. The child's method will be used for child instances. Use `super.methodName()` to call the parent's version from within the override.

**Q8. Does JavaScript have classical or prototypal inheritance?**
- JavaScript has **prototypal** inheritance. Objects inherit from other objects via the prototype chain. The `class` and `extends` keywords are syntactic sugar – they still create a prototype chain under the hood.

### Advanced Level

**Q9. How would you implement a private field using closures (pre-ES2022)?**
```js
const Pizza = (function() {
  const privateData = new WeakMap();
  return class Pizza {
    constructor(size) {
      privateData.set(this, { size });
    }
    getSize() {
      return privateData.get(this).size;
    }
  };
})();
```

**Q10. What is the difference between `super()` and `super.method()`?**
- `super()` calls the parent constructor; it must be used in the child constructor before accessing `this`. `super.method()` calls a parent method, typically when overriding that method in the child and wanting to reuse or extend the parent's behavior.

**Q11. Can a class extend a regular function (constructor)?**
- Yes. In JavaScript, a class can `extends` any constructor function (any value with a `prototype` and that works with `new`). The parent doesn't have to be a class.

**Q12. What happens if you don't call `super()` in a child constructor?**
- You'll get a `ReferenceError: Must call super constructor in derived class before accessing 'this'`. The engine enforces that the parent constructor runs first.

---

## End of Class 3 Notes
