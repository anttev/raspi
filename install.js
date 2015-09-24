var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rasp');
var user = require('./models/user');
var newUser = new user();


newUser.local.username = "test";
newUser.local.password = newUser.generateHash('test');

newUser.save(function(err){
    if(err) {
        console.log(err);
        return;
    }
    console.log('done');
})