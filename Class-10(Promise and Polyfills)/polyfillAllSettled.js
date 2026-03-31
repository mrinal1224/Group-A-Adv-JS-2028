// allSettled

function fetchUserData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ userId: 1, username: "JohnDoe" }), 2000);
  });
}

function fetchUserPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 1000);
  });
}

function fetchUserComments() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = Math.random() > 1;
      if (success) {
        resolve(["Nice!", "Interesting post", "Subscribed!"]);
      } else {
        reject("Failed to fetch comments ❌");
      }
    }, 800);
  });
}

function myPromiseAllSettled(items) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(items)) {
      return reject(new TypeError("Input is not an Array"));
    }

    if (items.length === 0) {
      resolve([]);
    }

    const results = new Array(items.length);
    let completedCount = 0;

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completedCount++;
          if (items.length === completedCount) {
            resolve(results);
          }
        });
    });
  });
}

myPromiseAllSettled([fetchUserData(), fetchUserPosts(), fetchUserComments()])
  .then(function (results) {
    console.log(results);
  })
  .catch(function (err) {
    console.log(err);
  });

// 3. result order should be maintained
// 4. result - array - new Array

// 1. takes an array as argument
// 2. Executor Promise

// 5 . Settlement of promises  -
// Fulfilled - //{status , value}
// Rejection //{status , reason}

//   Edge case -
//  No Promises are passed the result is an []
// if the argument is not an array - TypeError
