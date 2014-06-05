'use strict';
var distant_url = 'http://oenologie.epf.fr/RpiProject/db.json';
var local_url = './db.json';


angular.module('responsiveApp')
    .controller('MainCtrl', function ($scope, $http, $location) {
        $scope.location = null;

        $scope.location = $location.path();

        $scope.items = [];
        $scope.albums = [];


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

        $http.get(distant_url)
           .success(function(data) {
                $scope.items = data.items;
                console.log("Managed to get the items from distant URL.");
           })
           .error(function(data) {
                console.log("Failed to get the items from distant URL. Using Local JSON.");
                $http.get(local_url)
                   .success(function(data) {
                        $scope.items = data.items;
                        console.log("Managed to get the items from local URL.");
                   })
                   .error(function(data) {
                        console.log("Failed to get the items. Fatal.");
                   }); 
           }); 
    });



