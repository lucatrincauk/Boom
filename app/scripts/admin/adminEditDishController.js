angular.module('Boom')
    .controller('adminEditDishController', ['$scope', 'categories', 'dish', 'core', '$filter', 'Dishes', '$state', 'ngNotify',

        function($scope, categories, dish, core, $filter, Dishes, $state, ngNotify) {
            'use strict';

            // Wait for dish to be loaded from Firebase
            dish.$loaded(function() {
                // Assign data to scope
                $scope.dish = dish;
                if (typeof $scope.dish.week === 'string') {
                    // if the week is a string (legacy), make it an array
                    $scope.dish.week = {};
                }
            });
            //Wait for categories to be loaded from Firebase
            categories.$loaded(function() {
                // Assign data to scope
                $scope.categories = categories;
            });

            $scope.weeks = core.weeks;
            $scope.days = core.days;

            // Add empty Addon input
            $scope.addExtraInput = function(type) {
                // if it's a legacy input
                if (typeof $scope.dish[type] === 'string' || !$scope.dish[type]) {
                    $scope.dish[type] = [];

                }
                // push empty object
                $scope.dish[type].push({
                    title: ''
                });
            };

            $scope.removeExtraInput = function(index, type) {
                $scope.dish[type].splice(index, 1);
            };

            $scope.save = function(preview) {
                $scope.dish.$save().then(function() {
                    ngNotify.set('The dish has been updated', 'success');
                    if (preview) {
                        $state.go('app.dish', {
                            id: (dish.$id),
                            category: (dish.category)
                        });
                    } else {
                        $state.go('app.admin.dishes');
                    }
                }, function(error) {
                    ngNotify.set('Error: ' + error, 'error');
                });

            };
            $scope.remove = function() {
                //$scope.dish.$remove($scope.dish.$id)
                Dishes.removeDish($scope.dish.$id);
                $state.go('app.admin.dishes');

            };



        }
    ]);