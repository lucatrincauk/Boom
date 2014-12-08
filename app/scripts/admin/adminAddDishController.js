angular.module('Boom')
    .controller('adminAddDishController', ['$scope', 'categories', 'dishes', '$filter', '$state', 'Dishes', '$ionicPopup', '$timeout',
        function($scope, categories, dishes, $filter, $state, Dishes, $ionicPopup, $timeout) {
            'use strict';

            // Load categories
            $scope.categories = categories;
            $scope.dishes = dishes;
            $scope.addDish = {};


            $scope.save = function() {
                $scope.addDish.id = $filter('dashify')($scope.addDish.slug);

                Dishes.saveDish($scope.addDish);
                $scope.saveDialog();
            };
            $scope.$watch('addDishForm');
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
                        $scope.addDish = {};
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