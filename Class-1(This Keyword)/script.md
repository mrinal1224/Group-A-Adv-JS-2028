# JavaScript OOPs – Class 1

# Understanding the `this` Keyword

## Rock Solid Classroom Script

## Lecture Duration

**2 hours**

## Class Goal

By the end of this class, students should be able to look at any JavaScript code and predict the value of `this` before running it.

This is not a syntax class. This is a mental model class.

---

# 0. Opening Hook

Start the class with this line:

> Today we are learning one of the most misunderstood keywords in JavaScript: `this`.

Most beginners think `this` means “the current object”.
That is not fully correct.

In JavaScript, `this` does not care where the function is written.
It cares about how the function is called.

That one sentence is the heart of today’s class.

---

# 1. Agenda of the Lecture

## What we will cover today

1. What is `this` in JavaScript?
2. The Golden Rule of `this`
3. Global `this`
4. `this` inside regular functions
5. `this` inside object methods
6. Nested functions and why they break expectations
7. Browser vs Node.js behavior
8. Strict mode and why `this` becomes `undefined`
9. Arrow functions and lexical `this`
10. Reference loss: when method ownership is lost
11. `this` inside callbacks and timers
12. `this` inside event listeners
13. Common mistakes and real interview traps
14. Prediction exercises
15. Final cheat sheet

---

# 2. What is `this`?

## Simple definition

`this` is a special keyword in JavaScript whose value is decided when a function is executed.

It is not fixed when the function is written.

Better way to say it:

> `this` is a runtime binding.

Even better for beginners:

> `this` usually points to the object that is responsible for calling the function.

But be careful. This is only a beginner-friendly explanation. It is not always true.

The more accurate rule is:

> `this` is decided by the call-site.

A call-site simply means:

> The place and style in which a function is called.

---

# 3. The Golden Rule of `this`

Write this on the board.

> `this` depends on HOW a function is called, not WHERE it is written.

Repeat this multiple times.

If students remember only one thing from this class, this should be it.

## Analogy

Use this analogy:

> A function is like a homeless person. Whoever calls it gives it a temporary home. That temporary home becomes `this`.

Or:

> `this` is like an owner badge given to a function at the moment of execution.

The same function can have different `this` values depending on who calls it.

---

# 4. Global `this`

## Browser: non-strict mode

```js
console.log(this);
```

### Output

```js
window
```

## Explanation

In the browser, the global object is `window`.

So at the global level:

```js
this === window
```

This means:

```js
console.log(this === window); // true
```

## Teaching note

Tell students:

> In browser JavaScript, global code belongs to the `window` object.

---

# 5. Global `this` in Node.js

```js
console.log(this);
```

### Output in Node.js

```js
{}
```

## Why?

In Node.js, each file is treated as a module.

Node does not run your file directly as a global script. It wraps your file inside a function internally.

At the top level in a Node.js module:

```js
this === module.exports
```

Since `module.exports` is initially an empty object, you see:

```js
{}
```

## Important clarification

This prevents a very common confusion.

Browser global `this` is:

```js
window
```

Node top-level `this` is:

```js
module.exports
```

But inside a normal function in Node non-strict mode, `this` can still become:

```js
global
```

We will see that next.

---

# 6. `this` Inside a Regular Function: Non-Strict Mode

## Browser example

```js
function fn() {
  console.log(this);
}

fn();
```

### Output in browser

```js
window
```

## Why?

Look at the function call:

```js
fn();
```

There is no object before the function call.

It is not:

```js
obj.fn();
```

It is just:

```js
fn();
```

So JavaScript applies default binding.

In non-strict browser JavaScript, default binding means:

```js
this = window
```

## Node.js example

```js
function fn() {
  console.log(this);
}

fn();
```

### Output in Node.js non-strict mode

```js
global
```

## Teaching note

Say this clearly:

> A normal function call with no owner defaults to the global object in non-strict mode.

---

# 7. `this` Inside an Object Method

```js
const obj = {
  name: "JavaScript",
  showName: function () {
    console.log(this.name);
  }
};

obj.showName();
```

### Output

```js
JavaScript
```

## Why?

Look at the call-site:

```js
obj.showName();
```

There is an object before the dot.

The object before the dot becomes `this`.

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

## Rule

> In `obj.method()`, `this` points to `obj`.

The object before the dot owns the function call.

---

# 8. Prediction Exercise 1

Ask students to predict before running.

```js
const user = {
  name: "Mrinal",
  greet: function () {
    console.log(this.name);
  }
};

user.greet();
```

## Expected answer

```js
Mrinal
```

## Explanation

The call-site is:

```js
user.greet();
```

Object before the dot is `user`.

So:

```js
this === user
```

---

# 9. Nested Functions: The Real Bug Generator

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

## Output in browser non-strict mode

```js
JS
undefined
```

## Step-by-step explanation

First call:

```js
obj.fn();
```

Object before the dot is `obj`.

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

Now look at the nested function call:

```js
innerFn();
```

There is no object before the dot.

So this is a plain function call.

In non-strict browser JavaScript:

```js
this === window
```

Now JavaScript tries:

```js
window.name
```

If `window.name` does not have the expected value, output becomes:

```js
undefined
```

## Key teaching point

> `this` does not automatically flow into nested functions.

Just because `innerFn` is written inside `fn`, it does not inherit `this` from `fn`.

This is where many students get confused.

Again:

> `this` depends on how the function is called, not where the function is written.

---

# 10. Prediction Exercise 2

```js
const user = {
  name: "Scaler",
  outer: function () {
    function inner() {
      console.log(this.name);
    }

    inner();
  }
};

user.outer();
```

## Ask students

What will be printed?

## Answer in browser non-strict mode

```js
undefined
```

## Explanation

`user.outer()` gives `this = user` only inside `outer`.

But `inner()` is called as a plain function.

So `inner` gets default binding.

---

# 11. Browser vs Node.js: Non-Strict Summary

| Scenario                | Browser           | Node.js                 |
| ----------------------- | ----------------- | ----------------------- |
| Global `this`           | `window`          | `{}` / `module.exports` |
| Regular function call   | `window`          | `global`                |
| Object method           | object before dot | object before dot       |
| Nested regular function | `window`          | `global`                |

## Teaching note

This table is extremely important because students run code in different environments.

Someone using browser console may see `window`.

Someone using Node may see `{}` or `global`.

The difference is not JavaScript being random.

The environment is different.

---

# 12. Strict Mode and `this`

Now introduce strict mode.

```js
"use strict";
```

Strict mode makes JavaScript less forgiving and prevents silent mistakes.

## Key change

> Strict mode removes default `this` binding.

---

# 13. Regular Function in Strict Mode

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

## Why?

The call-site is:

```js
fn();
```

There is no object before the function.

In non-strict mode, JavaScript would guess and assign:

```js
this = window
```

But strict mode says:

> I will not guess.

So `this` remains:

```js
undefined
```

---

# 14. Why Strict Mode Does This

Strict mode prevents accidental global pollution.

## Non-strict danger

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

This silently creates or modifies a global variable.

That is dangerous.

## Strict mode version

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

So this line:

```js
this.count = 1;
```

throws an error:

```js
Cannot set properties of undefined
```

## Core explanation

> Strict mode refuses to guess what `this` should be.

---

# 15. Common Confusion: Global `this` in Strict Mode

Students may ask:

> If strict mode prevents global pollution, why is global `this` still `window` in the browser?

Show this:

```js
"use strict";
console.log(this);
```

In browser global script, output is:

```js
window
```

## Explanation

Strict mode does not block access to `window`.

Strict mode blocks implicit default binding.

At global level, you are explicitly in the global execution context.

No guessing is happening.

But inside this function:

```js
"use strict";

function fn() {
  console.log(this);
}

fn();
```

There is no caller object.

So strict mode refuses to auto-assign:

```js
this = window
```

## Key line

> Strict mode does not block `window`. It blocks JavaScript from automatically assigning `this = window` during a plain function call.

---

# 16. Object Methods in Strict Mode

```js
"use strict";

const obj = {
  name: "JS",
  show: function () {
    console.log(this.name);
  }
};

obj.show();
```

## Output

```js
JS
```

## Why?

Strict mode does not break object method binding.

The call-site is still:

```js
obj.show();
```

Object before the dot is `obj`.

So:

```js
this === obj
```

Strict mode only removes default binding for plain calls.

---

# 17. Arrow Functions and Lexical `this`

Now introduce arrow functions.

## Important rule

> Arrow functions do not have their own `this`.

They take `this` from their surrounding lexical scope.

This is called lexical `this`.

Lexical means:

> Based on where it is written.

This is the exception to the Golden Rule.

Regular functions follow call-site binding.

Arrow functions follow lexical binding.

---

# 18. Regular Function as Object Method

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

## Why?

`fn` is a regular function.

Regular functions get `this` from the call-site.

The call-site is:

```js
obj.fn();
```

So:

```js
this === obj
```

---

# 19. Arrow Function as Object Method

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

Usually:

```js
undefined
```

## Why?

`fn` is an arrow function.

Arrow functions ignore the call-site.

Even though you called it like this:

```js
obj.fn();
```

The arrow function does not care.

It does not create its own `this`.

It looks outside and uses the `this` from the surrounding scope.

In this example, the surrounding scope is global/module scope, not `obj`.

So `this.name` is not `obj.name`.

## Rule of thumb

> Do not use arrow functions as object methods when you need `this` to refer to the object.

Use regular functions for object methods.

---

# 20. Arrow Function Fixes Nested Function Problem

Remember this bug:

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

Output:

```js
undefined
```

Now use an arrow function:

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

## Why?

`fn` is called as:

```js
obj.fn();
```

So inside `fn`:

```js
this === obj
```

`innerFn` is an arrow function.

Arrow functions do not have their own `this`.

So `innerFn` takes `this` from its surrounding scope.

The surrounding scope is `fn`.

Inside `fn`, `this` is `obj`.

Therefore inside `innerFn`:

```js
this === obj
```

So:

```js
this.name
```

prints:

```js
JS
```

## Teaching line

> Arrow functions are not magic. They simply borrow `this` from the place where they were created.

---

# 21. Why JavaScript Needed Arrow Functions

Before arrow functions, developers had this problem all the time:

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

## Expected by beginners

```js
JS
```

## Actual output

```js
undefined
```

## Why?

Inside `setTimeout`, this function is called later as a normal callback:

```js
function () {
  console.log(this.name);
}
```

It is not called as:

```js
obj.someFunction();
```

So it loses the object context.

## Old solution 1: Store `this` in another variable

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

Output:

```js
JS
```

Developers often used:

```js
const self = this;
```

or:

```js
const that = this;
```

## Old solution 2: Use `bind`

```js
const obj = {
  name: "JS",
  fn: function () {
    setTimeout(function () {
      console.log(this.name);
    }.bind(this), 1000);
  }
};

obj.fn();
```

Output:

```js
JS
```

## Modern solution: Arrow function

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

Output:

```js
JS
```

## Why this works

The arrow callback borrows `this` from `fn`.

Inside `fn`, `this` is `obj`.

So inside the arrow callback, `this` is also `obj`.

## Teaching line

> Arrow functions became popular because they solved the callback `this` problem.

---

# 22. Reference Loss: Very Important Concept

Now teach one of the biggest interview traps.

```js
const user = {
  name: "Mrinal",
  greet: function () {
    console.log(this.name);
  }
};

user.greet();
```

Output:

```js
Mrinal
```

Now change the code:

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

## Ask students

What will this print?

## Output in browser non-strict mode

```js
undefined
```

## Why?

This line:

```js
const hello = user.greet;
```

copies only the function reference.

It does not permanently attach `user` to the function.

Now the call-site is:

```js
hello();
```

There is no object before the dot.

So `this` is not `user` anymore.

The original ownership is lost.

## Key line

> A function does not permanently remember the object from which it came.

Object ownership exists only at the moment of the call.

---

# 23. Reference Loss with `setTimeout`

```js
const user = {
  name: "Mrinal",
  greet: function () {
    console.log(this.name);
  }
};

setTimeout(user.greet, 1000);
```

## Ask students

Will this print `Mrinal`?

## Answer

Usually:

```js
undefined
```

## Why?

This line:

```js
setTimeout(user.greet, 1000);
```

passes only the function reference to `setTimeout`.

It does not pass:

```js
user.greet()
```

It passes:

```js
user.greet
```

That means the function is called later without `user` as the owner.

The object before the dot is gone at execution time.

## Fix 1: Wrap inside another function

```js
setTimeout(function () {
  user.greet();
}, 1000);
```

Now the call-site at execution time is:

```js
user.greet();
```

So `this` becomes `user`.

## Fix 2: Use arrow wrapper

```js
setTimeout(() => {
  user.greet();
}, 1000);
```

## Fix 3: Use `bind`

```js
setTimeout(user.greet.bind(user), 1000);
```

`bind` creates a new function where `this` is permanently fixed to `user`.

---

# 24. `this` Inside Event Listeners

This is very practical for browser JavaScript.

HTML:

```html
<button id="btn">Click Me</button>
```

JavaScript:

```js
const button = document.getElementById("btn");

button.addEventListener("click", function () {
  console.log(this);
});
```

## Output when button is clicked

```js
<button id="btn">Click Me</button>
```

## Why?

In a normal function event handler, the browser sets `this` to the element that received the event.

So inside the callback:

```js
this === button
```

## Practical use

```js
button.addEventListener("click", function () {
  this.textContent = "Clicked";
});
```

This works because `this` refers to the button.

---

# 25. Arrow Function in Event Listener

```js
const button = document.getElementById("btn");

button.addEventListener("click", () => {
  console.log(this);
});
```

## Output

Usually:

```js
window
```

or in modules/strict environments:

```js
undefined
```

## Why?

The callback is an arrow function.

Arrow functions do not have their own `this`.

They do not receive `this` from the event system.

They borrow `this` from the surrounding scope.

So in event listeners:

```js
function () {}
```

and:

```js
() => {}
```

behave differently.

## Teaching rule

Use a regular function if you want `this` to refer to the DOM element.

Use an arrow function if you do not need `this` and prefer using `event.target`.

Example:

```js
button.addEventListener("click", (event) => {
  console.log(event.target);
});
```

This is usually clearer.

---

# 26. Interview Trap 1

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

## Ask students

What is the output?

## Step-by-step

Break this:

```js
obj.a()();
```

into two parts.

First:

```js
obj.a();
```

This calls `a` with:

```js
this === obj
```

But `a` returns a new regular function:

```js
function () {
  console.log(this.name);
}
```

Now the second `()` calls that returned function as a plain function.

So:

```js
this !== obj
```

In browser non-strict mode, `this` becomes `window`.

## Output

```js
undefined
```

---

# 27. Interview Trap 2: Arrow Fix

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

## Why?

First:

```js
obj.a();
```

Inside `a`:

```js
this === obj
```

Then `a` returns an arrow function.

The arrow function captures `this` from `a`.

Since `this` inside `a` is `obj`, the arrow function also uses `obj`.

So:

```js
this.name
```

prints:

```js
A
```

## Teaching line

> A returned regular function gets `this` from how it is called later. A returned arrow function remembers `this` from where it was created.

---

# 28. Interview Trap 3

```js
var name = "Global";

const obj = {
  name: "Object",
  show: function () {
    console.log(this.name);
  }
};

const show = obj.show;
show();
```

## Browser non-strict output

```js
Global
```

## Why?

`show` is called as:

```js
show();
```

Plain call.

So `this` becomes `window`.

With `var name = "Global"`, `name` becomes a property of `window` in browser scripts.

So:

```js
window.name
```

is:

```js
Global
```

## Teaching note

This is why output can sometimes be `undefined` and sometimes a global value.

It depends on whether the global object has that property.

---

# 29. Interview Trap 4

```js
const obj = {
  name: "Object",
  regular: function () {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  }
};

obj.regular();
obj.arrow();
```

## Output

```js
Object
undefined
```

## Explanation

`regular` is a normal function.

Call-site:

```js
obj.regular();
```

So:

```js
this === obj
```

`arrow` is an arrow function.

It ignores:

```js
obj.arrow();
```

It borrows `this` from the surrounding scope.

That surrounding scope is not `obj`.

So output is usually:

```js
undefined
```

---

# 30. Interview Trap 5

```js
const obj = {
  name: "Object",
  outer: function () {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  }
};

obj.outer();
```

## Output

```js
Object
```

## Why?

`outer` is a regular method.

It is called as:

```js
obj.outer();
```

So inside `outer`:

```js
this === obj
```

`inner` is an arrow function.

It borrows `this` from `outer`.

So:

```js
this === obj
```

inside `inner` also.

---

# 31. Prediction Marathon

Use this section near the end of the class.

Tell students:

> Don’t run the code. Predict first.

## Question 1

```js
function test() {
  console.log(this);
}

test();
```

### Browser non-strict answer

```js
window
```

### Strict mode answer

```js
undefined
```

---

## Question 2

```js
const obj = {
  x: 10,
  getX: function () {
    console.log(this.x);
  }
};

obj.getX();
```

### Answer

```js
10
```

---

## Question 3

```js
const obj = {
  x: 10,
  getX: function () {
    console.log(this.x);
  }
};

const fn = obj.getX;
fn();
```

### Browser non-strict answer

```js
undefined
```

---

## Question 4

```js
const obj = {
  x: 10,
  getX: () => {
    console.log(this.x);
  }
};

obj.getX();
```

### Answer

```js
undefined
```

---

## Question 5

```js
const obj = {
  x: 10,
  outer: function () {
    function inner() {
      console.log(this.x);
    }

    inner();
  }
};

obj.outer();
```

### Browser non-strict answer

```js
undefined
```

---

## Question 6

```js
const obj = {
  x: 10,
  outer: function () {
    const inner = () => {
      console.log(this.x);
    };

    inner();
  }
};

obj.outer();
```

### Answer

```js
10
```

---

## Question 7

```js
const obj = {
  x: 10,
  outer: () => {
    const inner = () => {
      console.log(this.x);
    };

    inner();
  }
};

obj.outer();
```

### Answer

```js
undefined
```

## Explanation

`outer` itself is an arrow function.

So it does not get `this` from `obj.outer()`.

It borrows `this` from the surrounding global/module scope.

Then `inner` also borrows the same `this` from `outer`.

So `this` never becomes `obj`.

---

## Question 8

```js
const person = {
  name: "Aman",
  sayHi: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
};

person.sayHi();
```

### Answer

```js
undefined
```

---

## Question 9

```js
const person = {
  name: "Aman",
  sayHi: function () {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

person.sayHi();
```

### Answer

```js
Aman
```

---

## Question 10

```js
const person = {
  name: "Aman",
  sayHi: function () {
    return function () {
      console.log(this.name);
    };
  }
};

const result = person.sayHi();
result();
```

### Browser non-strict answer

```js
undefined
```

---

## Question 11

```js
const person = {
  name: "Aman",
  sayHi: function () {
    return () => {
      console.log(this.name);
    };
  }
};

const result = person.sayHi();
result();
```

### Answer

```js
Aman
```

---

# 32. The Final Mental Model

Write this hierarchy at the end.

```txt
How is `this` decided?

1. Was the function called with `new`?
   → `this` points to the newly created object.

2. Was the function called using call/apply/bind?
   → `this` is explicitly provided.

3. Was the function called as obj.method()?
   → `this` points to the object before the dot.

4. Was the function called normally as fn()?
   → non-strict: global object
   → strict: undefined

5. Is it an arrow function?
   → It does not have its own `this`.
   → It borrows `this` from surrounding scope.
```

## Teaching note

Since this is Class 1, you can tell students:

> Today we focused mainly on default binding, implicit binding, strict mode, and arrow functions. In future classes, when we learn constructor functions, classes, call, apply, and bind, this hierarchy will become complete.

---

# 33. Final Cheat Sheet

| Case                        | Value of `this`             |
| --------------------------- | --------------------------- |
| Global in browser           | `window`                    |
| Global in Node module       | `module.exports` / `{}`     |
| Regular function non-strict | global object               |
| Regular function strict     | `undefined`                 |
| `obj.method()`              | object before the dot       |
| Nested regular function     | global / `undefined`        |
| Arrow function              | lexical `this`              |
| Method copied to variable   | original object is lost     |
| `setTimeout(obj.method)`    | original object is lost     |
| DOM regular event handler   | element receiving the event |
| DOM arrow event handler     | lexical `this`              |

---

# 34. Final Takeaways

1. `this` is decided at runtime.
2. For regular functions, `this` depends on the call-site.
3. The object before the dot becomes `this`.
4. Plain function calls use default binding.
5. Strict mode removes default global binding.
6. Arrow functions do not have their own `this`.
7. Arrow functions borrow `this` from their surrounding scope.
8. Nested functions do not automatically inherit `this`.
9. Passing a method as a callback can cause reference loss.
10. To master `this`, always ask: “How is this function being called?”

---

# 35. Closing Line

End the class with this:

> Whenever you see `this`, don’t ask where the function is written. Ask how the function is called.

That is the whole game.

---

# 36. Doubt Session Prompts

Use these to start discussion:

1. Why does `this` become `window` in normal functions?
2. Why does strict mode make `this` undefined?
3. Why should we avoid arrow functions as object methods?
4. Why do arrow functions work well inside callbacks?
5. What happens when we store an object method in a variable?
6. What is the safest way to predict `this`?

---

# 37. Optional Homework

Ask students to create a file and predict the output of 10 `this` examples before running them.

They should write answers in this format:

```txt
Code snippet number:
Predicted output:
Actual output:
Reason:
Was my prediction correct?
```

This will build real confidence.
