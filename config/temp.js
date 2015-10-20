var spawn = require('child_process').spawn;
module.exports = function(cb) {
	var temp = spawn('/opt/vc/bin/vcgencmd', ['measure_temp']);
	var value;
	temp.stdout.on('data', function (data) {
		value = data.toString().substring(5, 9);
		
	});
	temp.stderr.on('data', function(data) {
		console.log(data);
	});
	temp.on('close', function(){cb(value)});	
}
