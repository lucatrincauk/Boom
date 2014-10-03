'use strict';

angular.module('Boom').controller('headerController', ['$scope', '$ionicSideMenuDelegate', '$rootScope',

    function ($scope, $ionicSideMenuDelegate, $rootScope) {

        $scope.search = {
            text: ''
        };

        $scope.$watch('search.text', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                $rootScope.$broadcast('search-updated', { text: newVal });
            }
        });

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }]);