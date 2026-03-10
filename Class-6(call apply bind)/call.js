// function greet() {
//     console.log("Hello " + this.name);
//   }
  
//   const user = { name: "Mrinal" };
  
//   greet(); 
// greet.call(user)

// function greet(city, country) {
//     console.log(this.name + " from " + city + ", " + country);
//   }
  
//   const user = {
//     name: "Mrinal"
//   };
  
// greet.call(user, "Bangalore", "India");



//-xx--//

const person1 = {
    name: "Mrinal"
  };
  
  const person2 = {
    name: "Rahul"
  };
  
  function greet() {
    console.log("Hello " + this.name);
  }
  
  greet.call(person1);
  greet.call(person2);


  Function.prototype.myCall = function (context, ...args) {
    context.tempFn = this;
    const result = context.tempFn(...args);
    delete context.tempFn;
    return result;
  };


  Function.prototype.myCall = function (context, ...args) {
    // Handle null or undefined
    context = context || globalThis;
  
    // Convert primitives to objects
    context = Object(context);
  
    // Temporary property
    const tempKey = "__tempFn__";
  
    // Attach function
    context[tempKey] = this;
  
    // Call function
    const result = context[tempKey](...args);
  
    // Cleanup
    delete context[tempKey];
  
    return result;
  };




//   user.tempFn = introduce;
//   user.tempFn("Bangalore", "India");
//   delete user.tempFn;