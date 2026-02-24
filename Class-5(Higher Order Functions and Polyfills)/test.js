// What are Higher order Methods
// Map , Filter and Reduce

// Map ->
// callback
// iteration
// return the result in a new Array
// This exists inside the Array Prototype

// let arr = [1 ,2 ,3 ,4]

// let sqaure = arr.map(function(num){
//    return num*num
// })
// console.log(arr)
// console.log(sqaure)

// Polyfill for Map

Array.prototype.myMap = function (callback) {
  // this -> working array
  // callback should be a function

  if(this==null || this==undefined){
    throw new Error(`No array Found`)
  }

  if (Array.isArray(this)) {
    if (typeof callback !== "function") {
      throw new Error(`The callback is not a function`);
    }

    let results = [];

    for (let i = 0; i < this.length; i++) {
      results.push(callback(this[i]));
    }

    return results;
  }

  else{
     throw new Error(`No array Found`)
  }
};

let nums = [];



let ans = nums.myMap(function (num) {
  return num * num;
});

console.log(ans);
