// Classes

class Pizaa {

   static totalPizza = 0
   #size


  constructor(size, toppings, prefrence, crust) {
    this.#size = size;
    this.toppings = toppings;
    this.preference = prefrence;
    this.crust = crust;
    Pizaa.totalPizza++
  }

  static showTotalPizza(){
    console.log(`${Pizaa.totalPizza}`)
  }


  serve() {
    console.log(`This is a ${this.size} Pizza (normal Pizza)`);
  }


  #describe(){
    console.log(`Description of the Pizza`)
  }


  test(){
    this.#describe()
  }
}

class StuffedPizza extends Pizaa {
  constructor(size, toppings, prefrence, crust, stuffing) {
    super(size, toppings, prefrence, crust);
    this.stuffing = stuffing;
  }

//   serve(){
//     console.log(`This is a ${this.size} Pizza  (stuffed)`);
//   }
}

let pizza1 = new Pizaa("Medium", ["cheese", "tomato"], "Veg", "Thin");

let pizza2 = new StuffedPizza(
  "Large",
  ["cheese", "tomato", "Mushrooms"],
  "Veg",
  "Thick",
  "Mozarella"
);

let pizza3 = new StuffedPizza(
    "Large",
    ["cheese", "tomato", "Mushrooms"],
    "Veg",
    "Thick",
    "Mozarella"
  );

  let pizza4 = new StuffedPizza(
    "Large",
    ["cheese", "tomato", "Mushrooms"],
    "Veg",
    "Thick",
    "Mozarella"
  );

console.log(pizza1);
console.log(pizza2)
 pizza2.test(); 

 Pizaa.showTotalPizza()

// Classical Inheritance - Not present in JS
// Prototypal Inheritance








// abstraction

// Polymorphism



