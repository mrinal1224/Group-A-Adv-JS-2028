// Classes
class Pizaa {
    constructor(size, toppings, prefrence, crust){
        this.size = size;
        this.toppings = toppings;
        this.preference = prefrence;
        this.crust = crust;
    }

    serve(){
        console.log(`This is a ${this.size} Pizza`)
    }
} 


let pizza1 = new Pizaa("Medium", ["cheese", "tomato"], "Veg", "Thin");

console.log(pizza1)
pizza1.serve()







