'use strict';
var url_movies = 'db.json';

angular.module('responsiveApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.items =
        [
                {title: "1", author: "2", year: "1989", type: "movie"},
                {title: "2", author: "3", year: "1994", type: "movie"},
                {title: "3", author: "2", year: "1960", type: "movie"},
                {title: "4", author: "3", year: "1994", type: "movie"},
                {title: "5", author: "2", year: "1960", type: "movie"},
                {title: "6", author: "3", year: "1994", type: "movie"},
                {title: "7", author: "2", year: "1993", type: "movie"},
                {title: "8", author: "3", year: "1994", type: "movie"},
                {title: "1", author: "2", year: "1989", type: "music"},
                {title: "2", author: "3", year: "1994", type: "music"},
                {title: "3", author: "2", year: "1993", type: "music"},
                {title: "4", author: "3", year: "1960", type: "music"},
                {title: "5", author: "2", year: "1993", type: "music"},
                {title: "6", author: "3", year: "1960", type: "music"},
                {title: "7", author: "2", year: "1993", type: "music"},
                {title: "8", author: "3", year: "1994", type: "music"}
        ];

        $scope.add = function() {
            var newPost = {quote: $scope.newQuote, author: $scope.newAuthor, date: new Date()};

            $scope.quotes.push(newPost);
            $http.post(url_movies, newPost);

            $scope.newQuote = "";
            $scope.newAuthor = "";
        };

        $scope.remove = function(id, index) {
            $http.delete(url_movies+ "/" + id);
            $scope.movies.splice(index, 1);
        }

//        $http.get(url_movies).success(function(data){
//            console.log(data);
//            $scope.movies = data;
//        });
    });

