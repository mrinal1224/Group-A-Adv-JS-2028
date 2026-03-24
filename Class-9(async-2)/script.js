// Promise Combinators
// all , allSettled , race , any

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

// fetchUserData().then((result) => {
//   console.log(result); // User Data
// });

// fetchUserPosts().then((result) => {
//   console.log(result); // Post Data
// });

// fetchUserComments().then((result) => {
//   console.log(result); // Commnets Data
// });

// is this parallel? - No -- Concurrent - Yes

// How are these promises executing?
// order depends on which promise takes less time that will exeucte first

// fetchUserData()
//   .then(function (result) {
//     console.log(result);
//     return fetchUserPosts();
//   })
//   .then(function (posts) {
//     console.log(posts);
//     return fetchUserComments();
//   })
//   .then(function (comments) {
//     console.log(comments);
//   });

// Promise.all([fetchUserData(),fetchUserPosts() , fetchUserComments()])
//   .then(function (results) {
//     console.log(results);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

  Promise.allSettled([fetchUserData(),fetchUserPosts() , fetchUserComments()])
  .then(function (results) {
    console.log(results[0].value);
  })
  .catch(function (err) {
    console.log(err);
  });

//   write theri Polyfills

// allSettled , any 
// we will create or construct our own Promise