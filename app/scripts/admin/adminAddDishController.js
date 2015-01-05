angular.module('Boom')
    .controller('adminAddDishController', ['$scope', 'categories', 'dishes', 'core', '$filter', '$state', '$ionicPopup', '$timeout',
        function($scope, categories, dishes, core, $filter, $state, $ionicPopup, $timeout) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.dishes = dishes;
            $scope.reset = function() {
                $scope.dish = {};
                $scope.dish.addons = [];
                $scope.dish.with = [];
                $scope.dish.week = {};
                $scope.days = core.days;
                $scope.weeks = core.weeks;

            };
            $scope.reset();

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

            $scope.save = function() {
                if (!$scope.dish.thumb) {
                    $scope.dish.thumb = 'http://placehold.it/375x113&text=default+image';
                }
                if (!$scope.dish.images) {
                    $scope.dish.images = 'http://placehold.it/375x375&text=default+image';
                }
                //  $scope.dish.id = $filter('dashify')($scope.dish.slug);
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



        }
    ]);