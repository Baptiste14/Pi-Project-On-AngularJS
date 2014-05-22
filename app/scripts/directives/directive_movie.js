'use strict';

angular.module('responsiveApp').directive('movieDisplay', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/objects/movie.html'
    };
});