'use strict';

angular.module('Boom').controller('headerController', ['$scope', '$ionicSideMenuDelegate',
    function ($scope, $ionicSideMenuDelegate) {

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
}]);