// race and any

// Weather Application
function fetchFromOpenWeather() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("NO Data"), 1000)
  );
}

function fetchFromWeatherAPI() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("NO data"), 700)
  );
}

function fetchFromAccuWeather() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("NO Data"), 1200)
  );
}

// Promise.race([
//   fetchFromOpenWeather(),
//   fetchFromWeatherAPI(),
//   fetchFromAccuWeather(),
// ]).then(function(result){
//   console.log(result)
// }).catch(function(err){
//    console.log(err)
// });


Promise.any([
    fetchFromOpenWeather(),
    fetchFromWeatherAPI(),
    fetchFromAccuWeather(),
  ]).then(function(result){
    console.log(result)
  }).catch(function(err){
     console.log(err)
  });
