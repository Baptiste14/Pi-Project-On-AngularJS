'use strict';
var first = 0;
angular.module('responsiveApp')
    .controller('MainCtrl', function ($scope, $http, $location) {
        var local_url = './db.json';

        $scope.location = null;
        $scope.location = $location.path();
        $scope.items = [];

        getItems($scope, $http, local_url, first);

        $scope.newAlbum = {
            "type" : "Music",
            "musics":[
                {
                    "title":"",
                    "track":1,
                    "link":""
                }
            ]
        };

        $scope.addMovie = function () {
            var newPost = null;
            $.ajax({
                url:"http://imdb.wemakesites.net/api/1.0/get/title/",
                data:{
                    q:$scope.title
                },
                dataType:"jsonp",
                crossDomain:true,
                success:function (data) {
                    newPost = data.data;
                    newPost.postDate = new Date();
                    newPost.link = $scope.link;
                    newPost.type = "Movie";

                    $scope.items.push(newPost);
                    console.log("Added movie : " + newPost.title);
                    localStorage.setItem('items', JSON.stringify($scope.items));
                    console.log(JSON.stringify($scope.items));
                },
                error:function () {
                    console.log("Failed getting back IMDB infos on Movie");
                }
            });

            $scope.title = null;
            $scope.link = null;

            $location.path("/Movies");
        };
        $scope.addMusic = function(){
            console.log($scope.newAlbum.musics.length);
            $scope.newAlbum.musics.push({
                "title":"",
                "track": $scope.newAlbum.musics.length + 1,
                "link":""
            });
        };
        $scope.addAlbum = function() {
            $scope.newAlbum.postDate = new Date();
            $scope.items.push($scope.newAlbum);
            console.log("Added movie : " + JSON.stringify($scope.newAlbum));
            localStorage.setItem('items', JSON.stringify($scope.items));
            $location.path("/Musics");
        };
        $scope.removeMusic = function(index) {
            $scope.newAlbum.musics.splice(index, 1);

            $scope.newAlbum.musics.forEach(function (music) {
                if (music.track > index){
                    music.track -= 1;
                }
            });
        };
    });

function getItems($scope, $http, local_url){
    if (first == 0) {
        console.log("Loading Data from JSON.");
        $http.get(local_url)
            .success(function (data) {
                $scope.items = data.items;
                localStorage.setItem('items', JSON.stringify(data.items));
                console.log("Managed to get the items from distant URL.");
            })
            .error(function (data) {
                console.log("Failed to get the items. Fatal.");
            }).then(function () {
                first = 1;

            });
    }
    else {
        console.log("Loading Data from LocalStorage.");
        $scope.items = JSON.parse(localStorage.getItem('items'));
    }
}



