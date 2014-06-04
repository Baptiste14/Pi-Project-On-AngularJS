'use strict';
//var url = 'http://pibaptiste.no-ip.biz/piproject/app/db.json';
var url = './db.json';


angular.module('responsiveApp')
    .controller('MainCtrl', function ($scope, $http, $location) {
        $scope.location = null;

        $scope.location = $location.path();

        $scope.items =
        [
                {title: "1", author: "2", year: "1989", type: "movie"},
                {title: "2", author: "3", year: "1994", type: "movie"},
                {title: "7", author: "2", year: "1993", type: "music"},
                {title: "8", author: "3", year: "1994", type: "music"}
        ];

        $scope.addContent = function() {
            console.log("--> Adding content");
            var newPost = {
                title: $scope.newTitle, 
                author: $scope.newAuthor, 
                year: $scope.newYear, 
                type: $scope.newType, 
                track: $scope.newTrack
            };

            $scope.items.push(newPost);
            //$http.post(url_movies, newPost);

            $scope.newTitle = null;
            $scope.newAuthor = null;
            $scope.newYear=null;
            $scope.newTrack=null;
            $scope.newType=null;

            $location.path("/");
        };

        $scope.remove = function(id, index) {
            //$http.delete(url_movies+ "/" + id);
            $scope.items.splice(index, 1);
        }

        $http({method: 'GET', url: url})
           .success(function(data){
               $scope.items = data.items;
               console.log(data);
           })
           .error(function(data) {
                console.log(data);
           });

    });
