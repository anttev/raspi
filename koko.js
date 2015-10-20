var password = "test";
var User = require("./models/user");
console.log(password);

var user = new User({username: "test",password: password});

console.log(user.generateHash(password));

//console.log(user.validPassword(password));
