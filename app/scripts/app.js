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
        .when('/Upload_movie', {
            templateUrl: 'views/upload_movie.html',
            controller: 'MainCtrl'
        })
        .when('/Upload_music', {
            templateUrl: 'views/upload_music.html',
            controller: 'MainCtrl'
        })
        .when('/Upload_other', {
            templateUrl: 'views/upload_other.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
