angular.module('Boom')
    .controller('adminEditDishController', ['$scope', 'categories', 'dish', '$filter', 'Dishes',

        function($scope, categories, dish, $filter, Dishes) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.editDish = dish;

            $scope.save = function() {
                $scope.editDish.id = $filter('dashify')($scope.editDish.slug);
                Dishes.saveDish($scope.editDish);
            };

        }
    ]);