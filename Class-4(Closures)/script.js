// Lexical Environment or Scope

function outer() {


  let b = 20


  return function inner() {
    let a = 10;
    return function inner2(){
        console.log(a);
        console.log(b)
    }
    
  }


}

let in1 = outer();
console.log(in1)
let in2 = in1()

in2()
