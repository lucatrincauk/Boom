angular.module('Boom')
    .controller('adminController', ['$scope', 'categories', 'dishes', '$filter', '$state', 'Dishes',
        function($scope, categories, dishes, $filter, $state, Dishes) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.dishes = dishes;

            $scope.addDish = {};

            $scope.save = function() {
                $scope.addDish.id = $filter('dashify')($scope.addDish.title);

                Dishes.saveDish($scope.addDish);
                $state.go('app.admin.dishes');
            };


        }
    ]);