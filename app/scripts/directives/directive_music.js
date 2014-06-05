'use strict';
angular.module('responsiveApp').directive('musicDisplay', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/objects/music.html'
    };
});