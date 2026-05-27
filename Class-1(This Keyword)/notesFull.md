# JavaScript OOPs – Class 1 Notes

# Understanding the `this` Keyword

---

# What is `this` in JavaScript?

`this` is one of the most important and confusing concepts in JavaScript.

Most beginners think:

> `this` means “the current object”

This is **not fully correct**.

The value of `this` changes depending on **how a function is called**.

---

# Core Definition

`this` is a special keyword in JavaScript whose value is decided at runtime.

This means:

* Its value is NOT fixed
* Its value is NOT decided when writing the code
* Its value is decided when the function executes

---

# The Golden Rule of `this`

> `this` depends on HOW a function is called, not WHERE it is written.

This is the most important rule of the entire topic.

---

# Very Important Mental Model

Think of functions as independent blocks of code.

The function itself does not permanently belong to any object.

Whoever calls the function becomes the owner temporarily.

That temporary owner becomes `this`.

---

# Global `this`

---

# Browser Environment

```js
console.log(this);
```

## Output

```js
window
```

---

# Why?

In browsers, the global object is called:

```js
window
```

At the global level:

```js
this === window
```

---

# Example

```js
console.log(this === window);
```

## Output

```js
true
```

---

# Node.js Environment

```js
console.log(this);
```

## Output

```js
{}
```

---

# Why?

Node.js treats every file as a module.

At the top level in Node.js:

```js
this === module.exports
```

Initially:

```js
module.exports = {}
```

So output becomes:

```js
{}
```

---

# Important Difference

| Environment | Global `this`           |
| ----------- | ----------------------- |
| Browser     | `window`                |
| Node.js     | `{}` / `module.exports` |

---

# `this` Inside a Regular Function

---

# Browser Non-Strict Mode

```js
function fn() {
  console.log(this);
}

fn();
```

## Output

```js
window
```

---

# Why?

The function is called like this:

```js
fn();
```

There is NO object before the function.

So JavaScript uses default binding.

In browser non-strict mode:

```js
this = window
```

---

# Important Point

This:

```js
fn();
```

is different from:

```js
obj.fn();
```

The way the function is called changes `this`.

---

# Node.js Non-Strict Mode

```js
function fn() {
  console.log(this);
}

fn();
```

## Output

```js
global
```

---

# Why?

In Node.js non-strict mode, default binding points to:

```js
global
```

which is Node’s global object.

---

# Summary

| Scenario             | Browser  | Node.js  |
| -------------------- | -------- | -------- |
| Normal function call | `window` | `global` |

---

# `this` Inside an Object Method

```js
const obj = {
  name: "JavaScript",
  showName: function () {
    console.log(this.name);
  }
};

obj.showName();
```

## Output

```js
JavaScript
```

---

# Why?

Look carefully at the call-site:

```js
obj.showName();
```

The object before the dot is:

```js
obj
```

So:

```js
this === obj
```

Therefore:

```js
this.name
```

becomes:

```js
obj.name
```

which is:

```js
"JavaScript"
```

---

# Important Rule

> In `obj.method()`, `this` points to the object before the dot.

---

# Prediction Exercise 1

Predict the output BEFORE running.

```js
const user = {
  name: "Mrinal",
  greet: function () {
    console.log(this.name);
  }
};

user.greet();
```

## Output

```js
Mrinal
```

---

# Explanation

Call-site:

```js
user.greet();
```

Object before dot:

```js
user
```

So:

```js
this === user
```

---

# Nested Functions

This is where beginners usually get confused.

---

# Example

```js
const obj = {
  name: "JS",
  fn: function () {
    console.log(this.name);

    function innerFn() {
      console.log(this.name);
    }

    innerFn();
  }
};

obj.fn();
```

---

# Output

```js
JS
undefined
```

---

# Step-by-Step Explanation

---

# First Function Call

```js
obj.fn();
```

Object before dot:

```js
obj
```

So inside `fn`:

```js
this === obj
```

Therefore:

```js
console.log(this.name);
```

prints:

```js
JS
```

---

# Second Function Call

```js
innerFn();
```

This is NOT:

```js
obj.innerFn();
```

It is just:

```js
innerFn();
```

So JavaScript uses default binding.

In browser non-strict mode:

```js
this === window
```

Now JavaScript checks:

```js
window.name
```

which usually gives:

```js
undefined
```

---

# Most Important Learning

> `this` does NOT automatically flow into nested functions.

Even though `innerFn` is written inside `fn`, it does not inherit `this`.

Again:

> `this` depends on HOW a function is called.

---

# Browser vs Node.js Summary

| Scenario         | Browser           | Node.js           |
| ---------------- | ----------------- | ----------------- |
| Global `this`    | `window`          | `{}`              |
| Regular function | `window`          | `global`          |
| Object method    | object before dot | object before dot |
| Nested function  | `window`          | `global`          |

---

# Strict Mode

JavaScript has a special mode called strict mode.

Enable it using:

```js
"use strict";
```

Strict mode removes dangerous JavaScript behavior.

---

# Most Important Strict Mode Rule

> Strict mode removes default `this` binding.

---

# Example

```js
"use strict";

function fn() {
  console.log(this);
}

fn();
```

## Output

```js
undefined
```

---

# Why?

The function is called like this:

```js
fn();
```

There is no object before the function.

In non-strict mode, JavaScript would guess:

```js
this = window
```

But strict mode says:

> I will not guess.

So:

```js
this = undefined
```

---

# Why Strict Mode Exists

Strict mode prevents accidental global pollution.

---

# Dangerous Example

```js
function update() {
  this.count = 1;
}

update();
```

In browser non-strict mode:

```js
this === window
```

So this line:

```js
this.count = 1;
```

actually becomes:

```js
window.count = 1;
```

This silently creates a global variable.

That is dangerous.

---

# Strict Mode Fix

```js
"use strict";

function update() {
  this.count = 1;
}

update();
```

Now:

```js
this === undefined
```

So JavaScript throws an error instead of silently polluting globals.

---

# Important Clarification

Students often ask:

> If strict mode blocks globals, why is global `this` still `window`?

Example:

```js
"use strict";

console.log(this);
```

## Output in Browser

```js
window
```

---

# Why?

Strict mode does NOT block `window`.

Strict mode blocks JavaScript from automatically assigning:

```js
this = window
```

during plain function calls.

At the global level, you are already explicitly inside global execution context.

No guessing is happening.

---

# Arrow Functions and `this`

Arrow functions behave differently.

---

# Most Important Rule

> Arrow functions do NOT have their own `this`.

Instead:

> Arrow functions borrow `this` from their surrounding scope.

This is called:

# Lexical `this`

---

# Regular Function Example

```js
const obj = {
  name: "JS",
  fn: function () {
    console.log(this.name);
  }
};

obj.fn();
```

## Output

```js
JS
```

---

# Arrow Function Example

```js
const obj = {
  name: "JS",
  fn: () => {
    console.log(this.name);
  }
};

obj.fn();
```

## Output

```js
undefined
```

---

# Why?

Arrow functions ignore the call-site.

Even though the function was called like this:

```js
obj.fn();
```

the arrow function does NOT care.

It checks the surrounding scope and borrows `this` from there.

That surrounding scope is global/module scope, not `obj`.

---

# Important Rule

> Avoid using arrow functions as object methods when you need object-based `this`.

---

# Arrow Functions Solve Nested Function Problems

---

# Problem

```js
const obj = {
  name: "JS",
  fn: function () {
    function innerFn() {
      console.log(this.name);
    }

    innerFn();
  }
};

obj.fn();
```

## Output

```js
undefined
```

---

# Solution Using Arrow Function

```js
const obj = {
  name: "JS",
  fn: function () {
    const innerFn = () => {
      console.log(this.name);
    };

    innerFn();
  }
};

obj.fn();
```

## Output

```js
JS
```

---

# Why?

Inside `fn`:

```js
this === obj
```

Arrow function borrows `this` from `fn`.

So inside `innerFn`:

```js
this === obj
```

---

# Why Arrow Functions Became Popular

Before arrow functions, developers faced callback `this` issues constantly.

---

# Example

```js
const obj = {
  name: "JS",
  fn: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
};

obj.fn();
```

## Output

```js
undefined
```

---

# Why?

The callback function is called later as a plain function.

So it loses object ownership.

---

# Old Solution

```js
const obj = {
  name: "JS",
  fn: function () {
    const self = this;

    setTimeout(function () {
      console.log(self.name);
    }, 1000);
  }
};

obj.fn();
```

---

# Modern Solution

```js
const obj = {
  name: "JS",
  fn: function () {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

obj.fn();
```

## Output

```js
JS
```

---

# Why?

Arrow function borrows `this` from `fn`.

Inside `fn`:

```js
this === obj
```

So inside callback also:

```js
this === obj
```

---

# Reference Loss

This is one of the most important interview concepts.

---

# Example

```js
const user = {
  name: "Mrinal",
  greet: function () {
    console.log(this.name);
  }
};

user.greet();
```

## Output

```js
Mrinal
```

---

# Now Change the Code

```js
const user = {
  name: "Mrinal",
  greet: function () {
    console.log(this.name);
  }
};

const hello = user.greet;

hello();
```

## Output

```js
undefined
```

---

# Why?

This line:

```js
const hello = user.greet;
```

copies only the function reference.

The function does NOT permanently remember `user`.

Now the call-site becomes:

```js
hello();
```

There is no object before the dot.

So ownership is lost.

---

# Most Important Rule

> A function does not permanently belong to an object.

Ownership exists only during the function call.

---

# `setTimeout` Reference Loss

```js
const user = {
  name: "Mrinal",
  greet: function () {
    console.log(this.name);
  }
};

setTimeout(user.greet, 1000);
```

## Output

```js
undefined
```

---

# Why?

This:

```js
setTimeout(user.greet, 1000);
```

passes only the function reference.

It does NOT call:

```js
user.greet();
```

So when executed later, the function loses object ownership.

---

# Fix

```js
setTimeout(() => {
  user.greet();
}, 1000);
```

Now the call-site becomes:

```js
user.greet();
```

So `this === user`.

---

# Event Listeners and `this`

---

# Example

```html
<button id="btn">Click</button>
```

```js
const button = document.getElementById("btn");

button.addEventListener("click", function () {
  console.log(this);
});
```

---

# Output

The clicked button element.

---

# Why?

In regular function event handlers:

```js
this === element receiving the event
```

---

# Example

```js
button.addEventListener("click", function () {
  this.textContent = "Clicked";
});
```

Works because `this` refers to the button.

---

# Arrow Function Event Handler

```js
button.addEventListener("click", () => {
  console.log(this);
});
```

---

# Why Different?

Arrow functions do not get `this` from the event system.

They borrow `this` from surrounding scope.

---

# Interview Trap 1

```js
const obj = {
  name: "A",
  a: function () {
    return function () {
      console.log(this.name);
    };
  }
};

obj.a()();
```

## Output

```js
undefined
```

---

# Why?

First:

```js
obj.a();
```

Inside `a`:

```js
this === obj
```

But `a` returns a regular function.

That returned function is later called like this:

```js
();
```

Plain function call.

So ownership is lost.

---

# Arrow Version

```js
const obj = {
  name: "A",
  a: function () {
    return () => {
      console.log(this.name);
    };
  }
};

obj.a()();
```

## Output

```js
A
```

---

# Why?

Arrow function remembers `this` from `a`.

Inside `a`:

```js
this === obj
```

So returned arrow function also uses `obj`.

---

# Final Mental Model

Whenever you see `this`, ask:

# “How is this function being called?”

NOT:

# “Where is this function written?”

That is the entire game of `this`.

---

# Final Cheat Sheet

| Case                        | `this`               |
| --------------------------- | -------------------- |
| Global browser              | `window`             |
| Global Node.js              | `{}`                 |
| Regular function non-strict | global object        |
| Regular function strict     | `undefined`          |
| `obj.method()`              | object before dot    |
| Nested regular function     | global / `undefined` |
| Arrow function              | lexical `this`       |
| Copied method               | ownership lost       |
| `setTimeout(obj.method)`    | ownership lost       |
| DOM regular event handler   | clicked element      |
| DOM arrow event handler     | lexical `this`       |

---

# Final Takeaways

1. `this` is decided at runtime.
2. Regular functions use call-site binding.
3. Arrow functions use lexical binding.
4. The object before the dot usually becomes `this`.
5. Strict mode removes dangerous default binding.
6. Nested regular functions often lose `this`.
7. Arrow functions help preserve surrounding `this`.
8. Passing methods as callbacks can lose ownership.
9. Always analyze the call-site.
10. Mastering `this` requires prediction practice.

