angular.module('Boom')
    .controller('adminAddDishController', ['$scope', 'categories', 'dishes', 'core', '$filter', '$state', '$ionicPopup', '$timeout',
        function($scope, categories, dishes, core, $filter, $state, $ionicPopup, $timeout) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.dishes = dishes;
            $scope.reset = function() {
                $scope.dish = {};
                $scope.dish.extraAddons = [];
                $scope.dish.extraWith = [];
                $scope.dish.week = {};
                $scope.dish.week.one = [];
                $scope.dish.week.two = [];
                $scope.dish.week.three = [];
                $scope.dish.week.four = [];
                $scope.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
                $scope.weeks = core.weeks;

            };
            $scope.reset();
            $scope.addExtraAddonInput = function() {
                $scope.dish.extraAddons.push({
                    title: ''
                });
            };
            $scope.addExtraWithInput = function() {
                $scope.dish.extraWith.push({
                    title: ''
                });
            };


            $scope.save = function() {
                $scope.dish.id = $filter('dashify')($scope.dish.slug);
                $scope.dishes.$add($scope.dish).then(function() {
                    $scope.saveDialog();
                }, function(error) {
                    console.log('Error:', error);
                });
            };
            $scope.saveDialog = function() {
                var saveDialog = $ionicPopup.show({
                    template: 'What would you like to do now?',
                    title: 'Dish saved successfully',
                    scope: $scope,
                    buttons: [{
                        text: 'Go back'
                    }, {
                        text: '<b>Add more</b>',
                        type: 'button-positive',
                        onTap: function() {
                            return true;
                        }
                    }, ]
                });
                saveDialog.then(function(res) {
                    if (res) {
                        $scope.reset();
                        $timeout.cancel(timeout);
                    } else {
                        $state.go('app.admin.dishes');
                    }
                });
                var timeout = $timeout(function() {
                    saveDialog.close();
                    $state.go('app.admin.dishes');

                }, 3000);
            };
            $scope.toggleWeekInput = function(week, day) {

                var weekName = $scope.weeks[week];
                // retrieving index of given day in the saved array
                var index = $scope.dish.week[weekName].indexOf(day);
                // if this item exists
                if (index > -1) {
                    // remove it from the array
                    $scope.dish.week[weekName].splice(index, 1);
                } else {
                    // otherwise, add it to the array
                    $scope.dish.week[weekName].push(day);
                }

            };



        }
    ]);