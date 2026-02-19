// checkBalance , deposit , withdraw

class BankAccount {
  constructor(balance) {
    let _balance = balance; // Private Property


    function showDetails(){
       return _balance
    }

    this.deposit = function () {
      return (_balance += amount);
    };

    this.withdraw = function () {
      return (_balance -= amount);
    };

    this.checkBalance = function () {
         return showDetails()
    };


  }
}

let acc = new BankAccount(1000);

console.log(acc.showDetails());
