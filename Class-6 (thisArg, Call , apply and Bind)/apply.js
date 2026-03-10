const user = {
  name: "Adam",
};

function greet(city, country) {
  console.log("Hello " + this.name + " " + city + " " + country);
}


greet.apply(user , ['Bengaluru' , 'India'])


// 

let numbers = [10 ,20 ,50 ,60]



// Math.max

let max = Math.min.apply(null , numbers)

console.log(max)
