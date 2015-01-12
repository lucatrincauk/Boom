angular.module('Boom')
    .controller('settingsController', ['$scope', 'Core', 'categories', 'messageCenterService', '$timeout',
        function($scope, Core, categories, messageCenterService, $timeout) {
            'use strict';
            $scope.canteen = {
                name: Core.canteenName()
            };

            categories.$loaded(function() {
                $scope.categories = categories;
            });
            $timeout(function() {

                messageCenterService.add('info', 'The functionalities on this page are work in progress', {
                    timeout: 3000
                });
            });
            // $timeout(function() {
            //     messageCenterService.add('success', 'Profile saved successfully.', {
            //         timeout: 3000
            //     });
            // });
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