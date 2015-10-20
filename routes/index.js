var exec = require('child_process').exec; //käytä execfile
var gcm = require('node-gcm');
var Token = require('../models/token');
var crontab = require('../config/crontab');
var temp = require('../config/temp');
module.exports = function (app, passport) {

    app.get('/', isLoggedIn, function (req, res) {
        res.render('index');
    });

    app.get('/login', function (req, res) {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });


    app.post('/test', function (req, res) {
        console.log("TOKEN:" + req.body.token);
        var tokenMessage = req.body.token;
        var newToken = new Token();
        newToken.token = tokenMessage;
        newToken.save(function (err) {
            if (err) {
                console.log(err);
            }
            console.log('done');
            res.send('kikki hiiri');
        });
    });


    app.post('/login', passport.authenticate('local', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));;

    app.get('/partials/main.html', isLoggedIn, function (req, res) {
        res.render('main');
    });

    app.get('/tuner/volume/:status', isLoggedIn, function (req, res) {
        if (req.params.status === 'up') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_VOLUME_UP --count 2', function () {});
        } else if (req.params.status === 'down') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_VOLUME_DOWN --count 2', function () {});
        } else if (req.params.status === 'off') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_MUTING --count 2', function () {});
        }
        res.send(req.params.status);
    });

    app.get('/tuner/mode/:status', isLoggedIn, function (req, res) {
        if (req.params.status === 'tuner') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_TUNER --count 2', function () {});
        } else if (req.params.status === 'sacd') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_SA_CD --count 2', function () {});
        } else if (req.params.status === 'sat') {
            exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_SAT --count 2', function () {});
        }
        res.send(req.params.status);
    });

    app.get('/tuner/:status', isLoggedIn, function (req, res) {
        exec('irsend SEND_ONCE SONY_RM-AAU014 BTN_POWER --count 2', function () {});
    });

    app.get('/light/mode/:status', isLoggedIn, function (req, res) {
        if (req.params.status === 'on') {
            exec('sudo ~/433Utils/RPi_utils/codesend 1135932')
        } else if (req.params.status === 'off') {
            exec('sudo ~/433Utils/RPi_utils/codesend 1135923')
        }
        res.send(req.params.status);
    });

    app.post('/alarm/time', isLoggedIn, function (req, res) {
        console.log(req.body);
        crontab.setAlarm(req.body.time);
        res.send('ok');
    });
    app.get('/alarm/off', isLoggedIn, function (req, res) {
        crontab.removeAlarm();
        res.send('ok');
    });
    app.get('/alarmstatus', isLoggedIn, function (req, res) {
        crontab.getAlarm(function (alarm) {
            res.json(alarm);
        });
    });
app.get('/temp', isLoggedIn, function (req, res) {
            temp(function(value){
		res.json({temp: value});
        });
    });


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }

}
