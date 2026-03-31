// Promise.any

// 1. Takes an Array as argument
// 2. Executor Promise
// 3. [] - Error - Aggregate Error
// 4. Tries to execute the fastest Promise
//  - if Successfull - you get the result
// else - moves on to the next fastest promise
// if all promises are rejected we need to produce and aggregate Error
// - [All Errors] - new array
// - Result - variable

function fetchFromOpenWeather() {
    return new Promise((resolve, reject) =>
      setTimeout(() => reject("No Data"), 1000)
    );
  }
  
  function fetchFromWeatherAPI() {
    return new Promise((resolve, reject) =>
      setTimeout(() => reject("No Data"), 700)
    );
  }
  
  function fetchFromAccuWeather() {
    return new Promise((resolve, reject) =>
      setTimeout(() => reject("NO Data"), 1200)
    );
  }

function myPromiseAny(items) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(items)) {
      return reject(new TypeError("Input is not an Array"));
    }

    if (items.length === 0) {
      return reject(new Error("No Promises found"));
    }

    const errors = new Array(items.length);
    let rejectedCount = 0;

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then(resolve)
        .catch((error) => {
          errors[index] = error;
          rejectedCount++;
          if (rejectedCount === items.length) {
            reject(errors);
          }
        });
    });
  });
}

myPromiseAny([
    fetchFromOpenWeather(),
    fetchFromWeatherAPI(),
    fetchFromAccuWeather(),
  ]).then(function(result){
    console.log(result)
  }).catch(function(error){
     console.log("Aggregate Error" , error)
  });
