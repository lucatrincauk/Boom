angular.module('Boom')
    .controller('settingsController', ['$scope', 'Core', 'categories',
        function($scope, Core, categories) {
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
                Core.canteenName(newValue);
            }, true);

            $scope.moveItem = function(category, fromIndex, toIndex) {
                $scope.categories.splice(fromIndex, 1);
                $scope.categories.splice(toIndex, 0, category);
            };


        }
    ]);