angular.module('Boom')
    .controller('adminEditDishController', ['$scope', 'categories', 'dish', 'core', '$filter', 'Dishes', '$state',

        function($scope, categories, dish, core, $filter, Dishes, $state) {
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
            $scope.addExtraAddonInput = function() {
                // if it's a legacy 'addon'
                if (typeof $scope.dish.addons === 'string' || !$scope.dish.addons) {
                    $scope.dish.addons = [];
                }
                // push empty object
                $scope.dish.addons.push({
                    title: ''
                });
            };
            $scope.addExtraWithInput = function() {
                // if it's a legacy 'with'
                if (typeof $scope.dish.with === 'string' || !$scope.dish.with) {
                    $scope.dish.with = [];

                }
                // push empty object
                $scope.dish.with.push({
                    title: ''
                });
            };


            $scope.save = function(preview) {
                //  $scope.dish.id = $filter('dashify')($scope.dish.slug);

                $scope.dish.$save().then(function() {
                    console.log('Saved successfully');

                    if (preview) {
                        $state.go('app.dish', {
                            id: (dish.$id),
                            category: (dish.category)
                        });
                    } else {
                        $state.go('app.admin.dishes');
                    }
                }, function(error) {
                    console.log('Error:', error);
                });

            };
            $scope.remove = function() {
                //$scope.dish.$remove($scope.dish.$id)
                Dishes.removeDish($scope.dish.$id);
                $state.go('app.admin.dishes');

            };



        }
    ]);