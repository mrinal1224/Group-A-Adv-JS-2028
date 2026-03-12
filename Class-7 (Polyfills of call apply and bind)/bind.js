const user = {
  name: "Adam",
};

function greet(city, country) {
  console.log(`Hello  ${this.name} ${city} ${country} `);
}


// console.log(greetFn);

// greetFn("Chicago", "US");

// polyfill for Bind

Function.prototype.myBind = function (context, ...boundArgs) {
  //console.log(this) -> greet
  const orginalFn = this;

  return function (...laterArgs) {
    return orginalFn.apply(context, [...boundArgs, ...laterArgs]);
  };
};

let greetFn = greet.myBind(user,'Chicago' , 'US' );
console.log(greetFn)

greetFn("Mumbai" , "India")
