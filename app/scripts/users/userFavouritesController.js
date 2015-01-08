angular.module('Boom')
    .controller('userFavouritesController', ['$scope', '$rootScope', 'dishes',

        function($scope, $rootScope, dishes) {
            'use strict';

            // Assign data to scope
            //$scope.dishes = dishes;
            dishes.$loaded(function() {
                $scope.dishes = dishes;
            })


        }
    ]);