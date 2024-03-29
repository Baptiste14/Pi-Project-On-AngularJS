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
        .when('/movie/:title', {
            templateUrl: 'views/movie.html',
            controller: 'ItemCtrl'
        })
        .when('/musics/:title', {
            templateUrl: 'views/album.html',
            controller: 'ItemCtrl'
        })
        .when('/musics', {
            templateUrl: 'views/albums.html',
            controller: 'MainCtrl'
        })
        .when('/Upload_movie', {
            templateUrl: 'views/upload/upload_movie.html',
            controller: 'MainCtrl'
        })
        .when('/Upload_music', {
            templateUrl: 'views/upload/upload_music.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
