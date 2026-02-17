// Classes
class Pizaa {
  constructor(size, toppings, prefrence, crust) {
    this.size = size;
    this.toppings = toppings;
    this.preference = prefrence;
    this.crust = crust;
  }

  serve() {
    console.log(`This is a ${this.size} Pizza`);
  }
}

class StuffedPizza extends Pizaa {
  constructor(size, toppings, prefrence, crust, stuffing) {
    super(size, toppings, prefrence, crust);
    this.stuffing = stuffing;
  }
}

let pizza1 = new Pizaa("Medium", ["cheese", "tomato"], "Veg", "Thin");

let pizza2 = new StuffedPizza(
  "Large",
  ["cheese", "tomato", "Mushrooms"],
  "Veg",
  "Thick",
  "Mozarella"
);

console.log(pizza1);
console.log(pizza2)
// pizza1.serve(); //

// Classical Inheritance - Not present in JS
// Prototypal Inheritance

// Encapuslation
// abstraction

// Polymorphism
