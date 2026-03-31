class MyPromise {
    constructor(executor) {
      this.state = "pending";
      this.value = undefined; // Changed from string "undefined"
      this.reason = undefined;
      this.onFulfilledCallbacks = [];
      this.onFailureCallbacks = [];
  
      const resolve = (value) => {
        if (this.state !== "pending") return;
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb(value));
      };
  
      const reject = (reason) => {
        if (this.state !== "pending") return;
        this.state = "rejected";
        this.reason = reason;
        this.onFailureCallbacks.forEach((cb) => cb(reason));
      };
  
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
  
    then(onFulfilled, onRejected) {
      if (typeof onFulfilled !== "function") {
        onFulfilled = (value) => value;
      }
  
      // FIX 1: Added 'typeof' here. Previously you were comparing 
      // the function to a string, which always failed.
      if (typeof onRejected !== "function") {
        onRejected = (reason) => {
          throw reason;
        };
      }
  
      if (this.state === "fulfilled") {
        onFulfilled(this.value);
      } else if (this.state === "rejected") {
        onRejected(this.reason);
      } else {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onFailureCallbacks.push(onRejected);
      }
  
      // FIX 2: Return 'this' to allow for method chaining (.then().catch())
      return this; 
    }
  
    catch(onRejected) {
      return this.then(null, onRejected);
    }
  }
  
  // Testing the implementation
  let p1 = new MyPromise((resolve, reject) => {
    let isHeads = Math.random() > 0; // This will always be false, triggering reject
  
    if (isHeads) {
      resolve("Success");
    } else {
      reject("Failure");
    }
  });
  
  p1.then((value) => {
    console.log(value);
  }).catch((err) => {
    console.log("Caught error:", err);
  });