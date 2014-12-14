angular.module('Boom')
    .controller('adminAddCategoryController', ['$scope', 'Categories', '$filter', '$state', '$ionicPopup', '$timeout',
        function($scope, Categories, $filter, $state, $ionicPopup, $timeout) {
            'use strict';

            // Load categories
            $scope.category = {};


            $scope.save = function() {
                $scope.category.id = $filter('dashify')($scope.category.title);

                Categories.saveCategory($scope.category);
                $scope.saveDialog();
            };
            $scope.saveDialog = function() {
                var saveDialog = $ionicPopup.show({
                    template: 'What would you like to do now?',
                    title: 'Category saved successfully',
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
                        $state.go('app.admin.categories');
                    }
                });
                var timeout = $timeout(function() {
                    saveDialog.close();
                    $state.go('app.admin.categories');

                }, 3000);
            };
            $scope.reset = function() {
                $scope.category = {};

            };
        }
    ]);