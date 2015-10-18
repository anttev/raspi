var gcm  = require('../models/gcm');

var Gpio = require('onoff').Gpio,
  led = new Gpio(18, 'out'),
  button = new Gpio(12, 'in', 'both');
 
function exit() {
  led.unexport();
  button.unexport();
  process.exit();
}
 
button.watch(function (err, value) {
  if (err) {
    throw err;
  }
gcm();
});
 
 
process.on('SIGINT', exit);
