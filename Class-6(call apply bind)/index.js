// const user = {
//     name: "Mrinal",
//     sayHi() {
//       console.log(this.name);
//     }
//   };
  
//   user.sayHi(); // Mrinal


  ///

//   const obj = {
//     prefix: "Hello"
//   };
  
//   const names = ["A", "B", "C"];
  
//   names.forEach(function(name) {
//     console.log(this.prefix, name);
//   },obj );


  // use

//   const calculator = {
//     multiplier: 2,
//     numbers: [1, 2, 3],
  
//     multiply() {
//       return this.numbers.map(function(num) {
//         console.log(num)
//         return num * this.multiplier;
//       });
//     }
//   };
  
//   console.log(calculator.multiply());


  const calculator = {
    multiplier: 2,
    numbers: [1, 2, 3],
  
    multiply() {
      return this.numbers.map((num)=> {
        console.log(num)
        return num * this.multiplier;
      });
    }
  };
  
  console.log(calculator.multiply());





