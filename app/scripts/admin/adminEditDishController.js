angular.module('Boom')
    .controller('adminEditDishController', ['$scope', 'categories', 'dish', '$filter', 'Dishes', '$state',

        function($scope, categories, dish, $filter, Dishes, $state) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.dish = dish;


            $scope.addExtraAddonInput = function() {
                if (!$scope.dish.extraAddons) {
                    $scope.dish.extraAddons = [];

                }
                $scope.dish.extraAddons.push({
                    title: ''
                });
            };
            $scope.addExtraWithInput = function() {
                if (!$scope.dish.extraWith) {
                    $scope.dish.extraWith = [];

                }
                $scope.dish.extraWith.push({
                    title: ''
                });
            };


            $scope.save = function() {
                $scope.dish.id = $filter('dashify')($scope.dish.slug);
                $scope.dish.$save().then(function() {
                    console.log('Saved successfully');
                    $state.go('app.admin.dishes');
                }, function(error) {
                    console.log('Error:', error);
                });

            };
            $scope.remove = function(dishId) {
                Dishes.removeDish(dishId);
                $state.go('app.admin.dishes');

            };


        }
    ]);