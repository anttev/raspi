var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var tokenSchema = mongoose.Schema({
    token      : String,
    created_at : {type : Date, default:Date.now }	
});

// methods ======================
// generating a hash
tokenSchema.methods.generateHash = function(token) {
    return bcrypt.hashSync(token, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
tokenSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(token, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('token', tokenSchema);
