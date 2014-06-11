'use strict';

var local_url = './db.json';
var first = 0;

angular.module('responsiveApp')
    .controller('MainCtrl', function ($scope, $http, $location) {
        $scope.location = null;

        $scope.location = $location.path();
        $scope.items = [];


        $scope.addMovie = function() {
            var newPost =null;

            $.ajax({
                url: "http://imdb.wemakesites.net/api/1.0/get/title/",
                data: {
                    q: $scope.title
                },
                dataType : "jsonp",
                crossDomain: true,
                success: function(data) {
                    newPost = data.data;
                    newPost.postDate = new Date();
                    newPost.link = $scope.link;
                    newPost.type = "Movie";

                    $scope.items.push(newPost);
                    console.log("Added movie : " + newPost.title);
                    localStorage.setItem('items', JSON.stringify($scope.items));
                },
                error: function(){
                    console.log("Failed getting back IMDB infos on Movie");
                }


            });

            $scope.title = null;
            $scope.link = null;

            $location.path("/");
        };

        $scope.remove = function(id, index) {
            //$http.delete(url_movies+ "/" + id);
            $scope.items.splice(index, 1);
        }

        if (first == 0 ) {
            console.log("Loading Data from JSON.");
            $http.get(local_url)
                .success(function(data) {
                    $scope.items = data.items;
                    localStorage.setItem('items', JSON.stringify(data.items));
                    console.log("Managed to get the items from distant URL.");
                })
                .error(function(data) {
                    console.log("Failed to get the items. Fatal.");
                }).then(function(){
                   first = 1;
                });
        }
        else {
            console.log("Loading Data from LocalStorage.");
            $scope.items = JSON.parse(localStorage.getItem('items'));
        }
    });



