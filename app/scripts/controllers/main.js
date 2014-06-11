'use strict';

var distant_url = 'http://oenologie.epf.fr/RpiProject/db.json';
var local_url = './db.json';

angular.module('responsiveApp')
    .controller('MainCtrl', function ($scope, $http, $location) {
        $scope.location = null;

        $scope.location = $location.path();

        $scope.items = [];
        $scope.albums = [];

        $scope.addMovie = function() {
            console.log("--> Adding content")
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
                    newPost.link = $scope.link,
                    newPost.type = "Movie",
                    console.log(newPost)

                    $scope.items.push(JSON.stringify(newPost));
                    localStorage.setItem('items',JSON.stringify($scope.items));
                    console.log(localStorage.getItem('items'));
                },
                error: function(){
                    console.log("Error while getting back IMDB infos");
                }
            });
            
            $http.post(distant_url, JSON.stringify(newPost))
            .error(function(){
                console.log("Error while posting the item to a distant url")
                $http.post(local_url, JSON.stringify(newPost))
                .error(function(){
                    console.log("Error while posting the item to a local url")
                })
            });

            $scope.title = null;
            $scope.link = null;

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



