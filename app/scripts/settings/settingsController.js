angular.module('Boom')
    .controller('settingsController', ['$scope', 'Core', 'categories', 'Users',
        function($scope, Core, categories, Users) {
            'use strict';
            $scope.canteen = {
                name: Core.canteenName()
            };

            categories.$loaded(function() {
                $scope.categories = categories;
            });

            $scope.$watch('canteen.name', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                if ($scope.user) {
                    Users.changeCanteen(newValue);
                }
                Core.canteenName(newValue);
            }, true);


            $scope.moveItem = function(category, fromIndex, toIndex) {
                $scope.categories.splice(fromIndex, 1);
                $scope.categories.splice(toIndex, 0, category);
            };


        }
    ]);