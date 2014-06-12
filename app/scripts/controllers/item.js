'use strict';
var distant_url = 'http://oenologie.epf.fr/RpiProject/db.json';
var local_url = './db.json';


angular.module('responsiveApp')
    .controller('ItemCtrl', function ($scope, $http, $routeParams, $sce) {

        console.log($routeParams.title);

        console.log("Loading Data from LocalStorage.");
        $scope.items = JSON.parse(localStorage.getItem('items'));

            $scope.items.forEach(function(item) {
                if (item.title == $routeParams.title) {

                    $scope.item = item;
                    if (item.type == "Movie") {
                        $scope.item.description = item.description.split('+').join(' ').split('%2C').join(', ');
                        item.link = $sce.trustAsResourceUrl(item.link);
                    }
                    if (item.type == "Music") {
                        item.musics.forEach(function(music) {
                            music.link = $sce.trustAsResourceUrl(music.link);
                        });
                    }
                }
            });
    });


