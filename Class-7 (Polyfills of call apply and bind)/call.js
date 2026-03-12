// What is the call method?






// we do not have native call

// we want to write our own version of the call method

// Polyfill for call method

Function.prototype.myCall = function (context, ...args) {
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






obj1.sayHello.myCall(obj2 , 'Mumbai' , 'India'); 
