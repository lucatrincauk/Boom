angular.module('Boom')
    .controller('adminEditDishController', ['$scope', 'categories', 'dish', 'core', '$filter', 'Dishes', '$state',

        function($scope, categories, dish, core, $filter, Dishes, $state) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.dish = dish;
            $scope.weeks = core.weeks;
            $scope.days = core.days;
            dish.$loaded(function() {
                if (typeof $scope.dish.week === 'string') {
                    $scope.dish.week = {};
                }
            });

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

            // $scope.toggleWeekInput = function(week, day) {
            //     console.log(typeof $scope.dish.week);
            //     if (!$scope.dish.week || typeof $scope.dish.week === 'string') {
            //         $scope.dish.week = {};
            //     }

            //     if (!$scope.dish.week.one) {
            //         $scope.dish.week.one = [];
            //     }
            //     if (!$scope.dish.week.two) {
            //         $scope.dish.week.two = [];
            //     }
            //     if (!$scope.dish.week.three) {
            //         $scope.dish.week.three = [];
            //     }
            //     if (!$scope.dish.week.four) {

            //         $scope.dish.week.four = [];
            //     }


            //     var weekName = $scope.weeks[week];
            //     // retrieving index of given day in the saved array
            //     var index = $scope.dish.week[weekName].indexOf(day);
            //     // if this item exists
            //     if (index > -1) {
            //         // remove it from the array
            //         $scope.dish.week[weekName].splice(index, 1);
            //     } else {
            //         // otherwise, add it to the array
            //         $scope.dish.week[weekName].push(day);
            //     }



            // };


        }
    ]);