const user = {
    name: "Adam",
  };
  
function greet() {
    console.log("Hello " + this.name);
  }
  
  
let greetFn = greet.bind(user)

// greetFn()

let button = document.getElementById('showName')


button.addEventListener('click', greetFn)