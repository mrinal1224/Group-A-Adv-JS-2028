# Class-6 (thisArg, call, apply, bind) - Detailed Notes with Code and Solutions

## 1) `thisArg` in array callbacks

`forEach`, `map`, `filter` can take second parameter: `thisArg`.

```js
const context = { prefix: "Hello" };
const names = ["Adam", "Bob"];

names.forEach(function (name) {
  console.log(this.prefix, name);
}, context);
```

### Solution / Output
- `Hello Adam`
- `Hello Bob`

---

## 2) `call` - invoke now, args separately

```js
function greet(city, country) {
  console.log(`Hi ${this.name} from ${city}, ${country}`);
}

const user = { name: "Steve" };
greet.call(user, "Bengaluru", "India");
```

### Output
`Hi Steve from Bengaluru, India`

---

## 3) `apply` - invoke now, args as array

```js
function greet(city, country) {
  console.log(`Hi ${this.name} from ${city}, ${country}`);
}

const user = { name: "Steve" };
greet.apply(user, ["Mumbai", "India"]);
```

### Output
`Hi Steve from Mumbai, India`

---

## 4) `bind` - returns new bound function

```js
function greet(city, country) {
  console.log(`Hi ${this.name} from ${city}, ${country}`);
}

const user = { name: "Steve" };
const greetUser = greet.bind(user, "Delhi");
greetUser("India");
```

### Output
`Hi Steve from Delhi, India`

---

## 5) Why `Math.max(numbers)` fails

```js
const numbers = [10, 30, 40, 50];
console.log(Math.max(numbers)); // NaN
console.log(Math.max(...numbers)); // 50
console.log(Math.max.apply(null, numbers)); // 50
```

### Explanation
`Math.max` expects separate arguments, not one array.

---

## 6) Lost `this` bug and fix

```js
const user = {
  name: "Adam",
  show() {
    console.log(this.name);
  }
};

setTimeout(user.show, 0); // undefined (or global value)
setTimeout(user.show.bind(user), 0); // Adam
```

---

## 7) Mini practice with answers

1. Borrow method from object A to B.  
   **Answer:** `A.method.call(B, ...)`

2. Function args are in array already.  
   **Answer:** `fn.apply(ctx, arrArgs)` or `fn.call(ctx, ...arrArgs)`

3. Event handler losing `this`.  
   **Answer:** `handler.bind(this)`
