// Lexical Environment or Scope

function outer() {
  let b = 20;
  let c = 50

   function test(){
    console.log(c)
   }

  return function inner() {
    let a = 10;
    return function inner2() {
      console.log(a);
      console.log(b);
      test()
    };
  };
}

let in1 = outer();
console.log(in1);
let in2 = in1();

in2();
