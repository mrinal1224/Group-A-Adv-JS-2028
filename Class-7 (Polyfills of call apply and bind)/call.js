// What is the call method?

console.log(globalThis)




// we do not have native call

// we want to write our own version of the call method

// Polyfill for call method

Function.prototype.myCall = function (context, ...args) {

    context = context || globalThis
     
    // this -> sayHello
    // context -> obj2
    context.tempFn = this;
    const result = context.tempFn(...args);
     delete context.tempFn;
    return result;
  };


let obj1 = {
    name: "Mark",
    sayHello(city, country) {
        console.log(`Hi ${this.name} ${city}  ${country}`);
    }
   
  };

let obj2 = {
    name: "Steve",
  };




// console.log(typeof null)

obj1.sayHello.myCall(undefined, 'Mumbai' , 'India'); 
