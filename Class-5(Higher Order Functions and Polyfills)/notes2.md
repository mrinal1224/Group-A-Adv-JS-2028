# Class-5 (HOF and Polyfills) - Detailed Notes with Code and Solutions

## 1) Higher-Order Functions (HOF)

A Higher-Order Function is a function that:
- takes another function as input, or
- returns a function.

`map`, `filter`, and `reduce` are HOFs because they take callback functions.

---

## 2) `map` - Transform each element

```js
const nums = [1, 2, 3, 4];
const squares = nums.map((n) => n * n);
console.log(squares);
```

### Solution / Output
`[1, 4, 9, 16]`

`map` returns a new array of same length.

---

## 3) `filter` - Keep matching elements

```js
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter((n) => n % 2 === 0);
console.log(evens);
```

### Solution / Output
`[2, 4, 6]`

---

## 4) `reduce` - Convert array to single value

```js
const nums = [10, 20, 30];
const total = nums.reduce((acc, curr) => acc + curr, 0);
console.log(total);
```

### Solution / Output
`60`

---

## 5) Real project pipeline (`filter` + `map` + `reduce`)

```js
const cart = [
  { name: "A", price: 100, inStock: true },
  { name: "B", price: 200, inStock: false },
  { name: "C", price: 300, inStock: true }
];

const total = cart
  .filter((item) => item.inStock)
  .map((item) => item.price * 1.18) // tax
  .reduce((acc, price) => acc + price, 0);

console.log(total);
```

### Solution / Output
In-stock: A and C -> taxed: `118` and `354` -> total `472`

---

## 6) Polyfill: `myMap`

```js
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  const out = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      out.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return out;
};

const ans = [2, 3, 4].myMap((n) => n * 2);
console.log(ans);
```

### Solution / Output
`[4, 6, 8]`

---

## 7) Polyfill: `myFilter`

```js
Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  const out = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      out.push(this[i]);
    }
  }
  return out;
};

console.log([1, 2, 3, 4, 5].myFilter((n) => n > 3));
```

### Solution / Output
`[4, 5]`

---

## 8) Polyfill: `myReduce`

```js
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  if (this.length === 0 && arguments.length < 2) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let i = 0;
  let acc = initialValue;
  if (arguments.length < 2) {
    acc = this[0];
    i = 1;
  }

  for (; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};

console.log([1, 2, 3, 4].myReduce((a, b) => a + b, 0));
```

### Solution / Output
`10`

---

## 9) Practice with solutions

1. Convert `[1,2,3]` to `["#1","#2","#3"]` using `map`.  
   **Answer:** `[1,2,3].map((n) => "#" + n)`

2. Keep only words with length >= 5.  
   **Answer:** `arr.filter((w) => w.length >= 5)`

3. Count frequency of numbers with reduce.  
   **Answer:**
   ```js
   arr.reduce((acc, n) => {
     acc[n] = (acc[n] || 0) + 1;
     return acc;
   }, {});
   ```
