// Pizza Shop - Toppings , Crust , Size , preference

// Constructor Function

function Pizaa(size, toppings, prefrence, crust) {
  // this -> Pizza {}
  this.size = size;
  this.toppings = toppings;
  this.preference = prefrence;
  this.crust = crust;
}

Pizaa.prototype.serve = function () {
  console.log(`A ${this.size} Pizaa with ${this.toppings} Is served`);
};


let pizza1 = new Pizaa("Medium", ["cheese", "tomato"], "Veg", "Thin");

let pizza2 = new Pizaa("Small", ["cheese", "onion"], "Veg", "Thick");

let pizza5 = new Pizaa("Small", ["cheese", "onion"], "Veg", "Thick");
console.log(pizza1);
console.log(pizza2);
console.log(pizza5);

pizza1.serve();
pizza2.serve()

// 2nd way

// function createPizza(size, toppings, crust, preference) {
//   let obj = {};

//   obj.size = size;
//   obj.toppings = toppings;
//   obj.crust = crust;
//   obj.preference = preference;
//   obj.serve2 = function () {
//     console.log("pizza Served");
//   };

//   return obj;
// }

// let pizza3 = createPizza("small", ["cheese", "onion"], "Veg", "Thick");

// let pizza4 = createPizza("Medium", ["cheese", "tomato"], "Veg", "Thin");

// console.log(pizza3);
// console.log(pizza4);

// let car = {
//     name : "Merceded S Class",
//     color : 'White'
// }

// car.serve()
