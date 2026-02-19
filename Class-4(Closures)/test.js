function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}


let c1 = createCounter();
let c2 = createCounter()

console.log(c1()) // 1
console.log(c1()) // 2
console.log(c2()) // 1
