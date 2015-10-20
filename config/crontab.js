var crontab = require('crontab');

module.exports = {
    setAlarm: function (time) {
        crontab.load(function (err, cron) {
            var job = cron.create('~/shuteTest.py', null, 'alarm');
            var res = time.split(":");
            var hour = res[0]
            var minute = res[1];
            job.minute().at(minute);
            job.hour().at(hour);

            cron.save();
        });
    },

    removeAlarm: function () {
        crontab.load(function (err, cron) {
            cron.remove({
                command: '~/shuteTest.py',
                comment: /alarm/
            });
            cron.save();
        });
    },

    getAlarm: function (cb) {
        crontab.load(function (err, cron) {
            var jobs = cron.jobs({
                command: '~/shuteTest.py',
                comment: /alarm/
            });
            if (jobs.length > 0) {
                return cb({
                    time: jobs[0].hour() + ':' + jobs[0].minute(),
                    status: true
                });
            }
            return cb({
                status: false
            });
        });
    }
}
