const user = {
  name: "Adam",

  greet(city, country) {
    console.log("Hello " + this.name + " " + city + " " + country);
  },
};

const user2 = {
  name: "Steve",
};

// call

// greet.call(user, "Mumbai", "India");
user.greet.call(user2, "Bengaluru", "India");
