angular.module('Boom')
    .controller('userFavouritesController', ['$scope', '$rootScope', 'dishes', 'Users',

        function($scope, $rootScope, dishes, Users) {
            'use strict';

            // Assign data to scope
            //$scope.dishes = dishes;
            dishes.$loaded(function() {
                $scope.dishes = dishes;
            });

            $scope.removeFavourite = function($id) {
                Users.removeFavourite($id);

            };


        }
    ]);