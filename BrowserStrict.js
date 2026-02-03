'use strict'


// browser - non-srict

// This keyword -
// This refers to the current function execution

// globally

this.name = "Ayush"

console.log(this);

// function

function test() {
  this.name = 'Ayush'

}

test();

// object

let obj = {
  name: "Adam",
  greet: function () {
    console.log(this);
  },
};

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
  