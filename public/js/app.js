var app = angular.module('myApp', ['ui.router']);

app.directive('rangeSlider', function () {
    $('#slider-range').noUiSlider({
        start: [50],
        range: {
            'min': [0],
            'max': [100]
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('main', {
            url: "/",
            templateUrl: "/partials/main.html",
            controller: function ($scope, $http, $sce) {

                $scope.volumeOff = function () {
                    $http({
                        method: 'GET',
                        url: '/tuner/volume/off'
                    }).success(function (response) {});
                }

                $scope.volumeUp = function () {
                    $http({
                        method: 'GET',
                        url: '/tuner/volume/up'
                    }).success(function (response) {});
                }

                $scope.volumeDown = function () {
                    $http({
                        method: 'GET',
                        url: '/tuner/volume/down'
                    }).success(function (response) {});
                }

                $scope.sat = function () {
                    $http({
                        method: 'GET',
                        url: '/tuner/mode/sat'
                    }).success(function (response) {});
                }

                $scope.sacd = function () {
                    $http({
                        method: 'GET',
                        url: '/tuner/mode/sacd'
                    }).success(function (response) {});
                }

                $scope.tuner = function () {
                    $http({
                        method: 'GET',
                        url: '/tuner/mode/tuner'
                    }).success(function (response) {});
                }

                $scope.power = function () {
                    $http({
                        method: 'GET',
                        url: '/tuner/power'
                    }).success(function (response) {});
                }

                $scope.channel = function (param) {
                    if (param === 'ylex') {
                        $scope.source = $sce.trustAsResourceUrl('http://mediau.yle.fi/liveylex');
                    } else if (param === 'rock') {
                        $scope.source = $sce.trustAsResourceUrl(' 	http://rstream2.nelonenmedia.fi/Radiorock.mp3.m3u');
                    } else if (param === 'loop') {
                        $scope.source = $sce.trustAsResourceUrl(' 	 	http://rstream2.nelonenmedia.fi/Loop.mp3.m3u');
                    } else if (param === 'basso') {
                        $scope.source = $sce.trustAsResourceUrl(' 	 	http://188.117.44.132:8000/stream');
                    } else if (param === 'pause') {
                        $scope.source = 'null';
                    }
                }


                $scope.lightOn = function () {
                    $http({
                        method: 'GET',
                        url: '/light/mode/on'
                    }).success(function (response) {});
                }
                $scope.lightOff = function () {
                    $http({
                        method: 'GET',
                        url: '/light/mode/off'
                    }).success(function (response) {});
                }
                $scope.updateTime = function () {
                    $http({
                        method: 'POST',
                        url: '/alarm/time',
                        data: {
                            time: $scope.time || $('#pick-a-time').value
                        }
                    }).success(function (response) {});
                }
                $scope.updateAlarm = function () {
                    if (!$scope.alarmStatus) {
                        $scope.time = "";

                        $http({
                            method: 'GET',
                            url: '/alarm/off'
                        }).success(function (response) {});
                    }
                }

                $http({
                    method: 'GET',
                    url: '/alarmstatus/'
                }).success(function (response) {
                    $scope.alarmStatus = response.alarmStatus;
                });
            }
        });
});
