angular.module('Boom')
    .controller('homeController', ['$scope', '$rootScope', 'categories', 'dishes', '$filter',
        function($scope, $rootScope, categories, dishes, $filter) {
            'use strict';

            // Assign data to scope
            $scope.dishes = dishes;
            $scope.categories = categories;


            $scope.nameDays = function() {

                $scope.dayName = $filter('dayfy')($scope.activeDay);
            };


            $scope.prev = function() {
                // Don't let browse behind Monday
                if ($scope.activeDay < 1) {
                    return false;
                } else {
                    // Set view to day before
                    $scope.activeDay = $scope.activeDay - 1;

                    $scope.nameDays();
                }
                return $scope.activeDay;
            };

            $scope.next = function() {
                // Don't let browse ahead of Friday
                if ($scope.activeDay > 3) {
                    return false;
                } else {
                    // Set view to day after
                    $scope.activeDay = $scope.activeDay + 1;
                    $scope.nameDays();
                }
                return $scope.activeDay;
            };


            $scope.init = (function() {
                // if it's weekend (sat: day = 5, sun: day = -1)

                if ($rootScope.day > 4 || $rootScope.day < 0) {
                    // show closed message
                    $rootScope.closed = true;
                    // set view to Monday
                    $scope.activeDay = 0;
                } else {
                    $rootScope.closed = false;

                    // otherwise set view to current day
                    $scope.activeDay = $rootScope.day;
                }

                $scope.nameDays();

            })();


        }
    ]);