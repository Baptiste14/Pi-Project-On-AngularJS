'use strict';

var distant_url = 'http://oenologie.epf.fr/RpiProject/db.json';
var local_url = './db.json';
var first = 0;

angular.module('responsiveApp')
    .controller('MainCtrl', function ($scope, $http, $location) {
        $scope.location = null;

        $scope.location = $location.path();
        $scope.items = [];

        $scope.addContent = function() {
            var newPost =null;

            $.ajax({
                url: "http://imdb.wemakesites.net/api/1.0/get/title/",
                data: {
                    q: $scope.title
                },
                dataType : "jsonp",
                crossDomain: true,
                success: function(data) {
                    newPost = data.data,
                    newPost.postDate = new Date(),
                    newPost.link = $scope.link
                },
                error: function(){
                    console.log("Error while getting back IMDB infos");
                }
            });

            $scope.items.push(JSON.stringify(newPost));

            localStorage.setItem('items',JSON.stringify($scope.items));

            $scope.title = null;
            $scope.link = null;

            $location.path("/");
        };

        $scope.remove = function(id, index) {
            //$http.delete(url_movies+ "/" + id);
            $scope.items.splice(index, 1);
        }

        if (first == 0 ) {
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
                })
                .then(function(){
                    first = 1;
                });
        }
        else {
            $scope.items = localStorage.getItem('items');
        }
    });



