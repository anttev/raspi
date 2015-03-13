var exec = require('child_process').exec;

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');   
    });
    
    app.get('/partials/main.html', function(req, res) {
        res.render('main');
    });
    
    app.get('/tuner/volume/:status', function(req, res) {
        if (req.params.status === 'up') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_VOLUME_UP --count 2', function() {});
        }else if (req.params.status === 'down') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_VOLUME_DOWN --count 2', function() {});
        } else if (req.params.status === 'off') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_MUTING --count 2', function() {});
        }
        res.send(req.params.status);   
    });
    
    app.get('/tuner/mode/:status', function(req, res) {
        if (req.params.status === 'tuner') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_TUNER --count 2', function() {});
        } else if (req.params.status === 'sacd'){
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_SA_CD --count 2', function() {});
        } else if (req.params.status === 'sat'){
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_SAT --count 2', function() {});
        } 
        res.send(req.params.status);   
    });
    
    app.get('/tuner/:status', function(req, res) {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_POWER --count 2', function() {});
    });
    
}