'use strict';
var distant_url = 'http://oenologie.epf.fr/RpiProject/db.json';
var local_url = './db.json';


angular.module('responsiveApp')
    .controller('ItemCtrl', function ($scope, $http, $routeParams) {

        console.log($routeParams.title);

        $http.get(distant_url)
            .success(function(data) {
                $scope.items = data.items;
                console.log("Managed to get the items from distant URL.");

                $scope.items.forEach(function(item) {
                    if (item.title == $routeParams.title) {
                        $scope.item = item;
                    }
                });
            })
            .error(function(data) {
                console.log("Failed to get the items from distant URL. Using Local JSON.");
                $http.get(local_url)
                    .success(function(data) {
                        $scope.items = data.items;
                        console.log("Managed to get the items from local URL.");

                        $scope.items.forEach(function(item) {
                            if (item.title == $routeParams.title) {
                                $scope.item = item;
                            }
                        });
                    })
                    .error(function(data) {
                        console.log("Failed to get the items. Fatal.");
                    });
            });




    });




