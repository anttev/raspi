var gcm = require('node-gcm');

var message = new gcm.Message();

message.addData('key1', 'msg1');

var regIds = ['629599979753'];

// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyCLveIqP3Qn15jD6dBaXJW2llzuz-tpcJs');

// ... or retrying a specific number of times (10)
sender.send(message, { registrationIds: registrationIds }, 3, function (err, result) {
  if(err) console.error(err);
  else    console.log(result);
});

function test(){
    var message = new gcm.Message();

        message.addData('key1', 'msg1');

        var regIds = ['629599979753'];

        // Set up the sender with you API key
        var sender = new gcm.Sender('AIzaSyCLveIqP3Qn15jD6dBaXJW2llzuz-tpcJs');

        // ... or retrying a specific number of times (10)
        sender.send(message, { registrationIds: registrationIds }, 3, function (err, result) {
          if(err) console.error(err);
          else    console.log(result);
        });
}