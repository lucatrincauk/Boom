angular.module('Boom')
    .controller('adminEditDishController', ['$scope', 'categories', 'dish', '$filter', 'Dishes', '$state',

        function($scope, categories, dish, $filter, Dishes, $state) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.dish = dish;

            $scope.save = function() {
                $scope.dish.id = $filter('dashify')($scope.dish.slug);
                Dishes.saveDish($scope.dish);
                $state.go('app.admin.dishes');

            };
            $scope.removeDish = function(dishId) {
                Dishes.removeDish(dishId);
                $state.go('app.admin.dishes');

            };


        }
    ]);