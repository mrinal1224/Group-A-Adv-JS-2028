const fs = require("fs");

console.log("start");

fs.readFile("f1.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("data1 -> " + data);
});

fs.readFile("f2.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("data2 -> " + data);
});

fs.readFile("f3.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("data3 -> " + data);
});

fs.readFile("f4.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("data4 -> " + data);
});

fs.readFile("f5.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("data5 -> " + data);
});

console.log("End");
