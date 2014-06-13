'use strict';
var first = 0;
angular.module('responsiveApp')
    .controller('MainCtrl', function ($scope, $http, $location) {
        var local_url = './db.json';

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

        $scope.addMovie         = function()        { addMovie( $scope, $location)   };
        $scope.addMusicToAlbum  = function()        { addMusicToAlbum($scope)       };
        $scope.removeMusic      = function(index)   { removeMusic($scope, index)    };
        $scope.addAlbum         = function()        { addAlbum($scope, $location)   };
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

function addMusicToAlbum($scope) {
    console.log("Add track" + $scope.newAlbum.musics.length);
    $scope.newAlbum.musics.push({
        "title":"",
        "track": $scope.newAlbum.musics.length + 1,
        "link":""
    });
}

function addAlbum($scope, $location) {
    $scope.newAlbum.postDate = new Date();
    $scope.items.push($scope.newAlbum);
    localStorage.setItem('items', JSON.stringify($scope.items));
    $location.path("/musics");
}

function addMovie($scope, $location) {
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
            localStorage.setItem('items', JSON.stringify($scope.items));
        },
        error:function () {
            console.log("Failed getting back IMDB infos on Movie");
        }
    });

    $scope.title = null;
    $scope.link = null;

    $location.path("/movies");
}

function removeMusic($scope, index) {
    $scope.newAlbum.musics.splice(index, 1);
    $scope.newAlbum.musics.forEach(function (music) {
        if (music.track > index){
            music.track -= 1;
        }
    });
}


