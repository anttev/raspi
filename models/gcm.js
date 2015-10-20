var gcm = require('node-gcm');
var Token = require('../models/token');

module.exports = function(){
    var message = new gcm.Message();

        message.addData('message', 'raspb');
	var regIds = [];
	Token.findOne({}, {}, {sort:{'created_at':-1}}, function(err, token) {
		if(err)
			return console.log(err);
		if(!token)
			return console.log('token not found');
		regIds.push(token.token);

        // Set up the sender with you API key
        var sender = new gcm.Sender('AIzaSyCLveIqP3Qn15jD6dBaXJW2llzuz-tpcJs');

        // ... or retrying a specific number of times (10)
        sender.send(message, { registrationIds: regIds }, 3, function (err, result) {
          if(err) console.error(err);
          else    console.log(result);
        });

	});
}

