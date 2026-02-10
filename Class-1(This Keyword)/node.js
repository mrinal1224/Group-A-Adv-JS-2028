// 'use strict'

// node - non-srict

// This keyword -
// This refers to the current function execution

// globally

// console.log(this);

// function

// function test() {
//    console.log(this)
// }

// test();

// object

// let obj = {
//   name: "Adam",
//   greet: function () {
//     console.log(this);
//   },
// };

// obj.greet()

// function inside a method
// let obj2 = {
//     name: "Adam",
//     greet: function () {
//       function sayHi() {
//         console.log(this);
//       }
//       sayHi();
//     },
//   };

//   obj2.greet()

let random = ()=>{
    console.log(this)
  }
  
random()
