'use strict';
angular.module('responsiveApp').directive('albumDisplay', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/objects/album_display.html'
    };
});