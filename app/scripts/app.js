'use strict';

angular
  .module('responsiveApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/movies', {
            templateUrl: 'views/movies.html',
            controller: 'MainCtrl'
        })
        .when('/musics', {
            templateUrl: 'views/musics.html',
            controller: 'MainCtrl'
        })
        .when('/upload', {
            templateUrl: 'views/upload.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
