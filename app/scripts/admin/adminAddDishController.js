angular.module('Boom')
    .controller('adminAddDishController', ['$scope', 'categories', 'dishes', '$filter', '$state', 'Dishes', '$ionicPopup', '$timeout',
        function($scope, categories, dishes, $filter, $state, Dishes, $ionicPopup, $timeout) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.dishes = dishes;
            $scope.dish = {};


            $scope.save = function() {
                $scope.dish.id = $filter('dashify')($scope.dish.slug);

                Dishes.saveDish($scope.dish);
                $scope.saveDialog();
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
            $scope.reset = function() {
                $scope.dish = {};

            };
        }
    ]);