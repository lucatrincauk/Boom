angular.module('Boom')
    .controller('adminEditDishController', ['$scope', 'categories', 'dish', '$filter', 'Dishes', '$state',

        function($scope, categories, dish, $filter, Dishes, $state) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.editDish = dish;

            $scope.save = function() {
                $scope.editDish.id = $filter('dashify')($scope.editDish.slug);
                Dishes.saveDish($scope.editDish);
            };
            $scope.removeDish = function(dishId) {
                Dishes.removeDish(dishId);
                $state.go('app.admin.dishes');

            };


        }
    ]);