// reduce takes a callback
// callback(acc , curr) -> InitalValue
// itearte
// perfrom operations

Array.prototype.myReduce = function (callback, initialValue) {
  let acc;
  let firstIndex;

  if (arguments.length == 1) {
    acc = this[0];
    firstIndex = 1;
  } else {
    acc = initialValue;
    firstIndex = 0;
  }

  // this - working array

  for (let i = firstIndex; i < this.length; i++) {
    acc = callback(acc, this[i]);
  }

  return acc;
};

let arr = [1, 2, 3, 4, 5];

let sum = arr.myReduce(function (acc, curr) {
  acc = acc + curr;
  return acc;
}, 0);

console.log(sum);

// 0 = 0+1 = 1
// 1 = 1+2 = 3
// 3 = 3+3 = 6
// 6= 6+4= 10
// 10 = 10+5 = 15
