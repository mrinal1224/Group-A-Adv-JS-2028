// function greet() {
//     console.log("Hello " + this.name);
//   }
  
//   const user = { name: "Mrinal" };
  
//   const greetUser = greet.bind(user);
  
//   greetUser();

 
 ///--XX--///
 
  const user = {
    name: "Mrinal",
  
    greet() {
      console.log(this.name);
    }
  };
  
//   setTimeout(user.greet, 1000);

  setTimeout(user.greet.bind(user), 1000);






//   Function.prototype.myBind = function (context, ...boundArgs) {
//     const originalFn = this;
  
//     return function (...laterArgs) {
//       return originalFn.apply(context, [...boundArgs, ...laterArgs]);
//     };
//   };


function multiply(a, b) {
    return a * b;
  }
  
  const double = multiply.myBind(null, 2);
  console.log(double(5));