// function greet(city, country) {
//     console.log(this.name + " from " + city + ", " + country);
//   }
  
//   const user = { name: "Mrinal" };
  
//   greet.apply(user, ["Bangalore", "India"]);


const numbers = [10, 20, 30];

// const max = Math.max.apply(null, numbers);

// console.log(max);


let max = Math.max(...numbers)

console.log(max)