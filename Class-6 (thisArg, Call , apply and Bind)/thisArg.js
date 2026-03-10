// const user = {
//     name : "Adam",
//     sayHi(){
//         console.log('Hello ' + this.name)
//     }
// }

// user.sayHi()

//--xx--//


const user = {
   message : 'Hello'
}


const names = ['Adam' , 'Bob' , 'Charles']

names.forEach(function(name){
    console.log(this.message +" " +  name)
} , user)


//--XX--//


const calculator = {
    multiplier : 2,
    numbers : [10 ,20 ,30],

    multiply(){
       return this.numbers.map((num)=>{
          return num * this.multiplier
       }) 
    }


}

console.log(calculator.multiply())

// call , apply and Bind
