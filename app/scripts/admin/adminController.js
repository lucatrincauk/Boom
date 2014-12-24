angular.module('Boom')
    .controller('adminController', ['$scope', 'users',
        function($scope, users) {
            'use strict';

            $scope.user = users.getUser();

        }
    ]);