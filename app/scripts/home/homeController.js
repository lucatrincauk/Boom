angular.module('Boom')
    .controller('homeController', ['$scope', '$rootScope', 'core', 'categories', 'dishes', '$filter', 'messageCenterService', '$timeout', 'Dishes',
        function($scope, $rootScope, core, categories, dishes, $filter, messageCenterService, $timeout, Dishes) {
            'use strict';

            // Assign data to scope
            $scope.dishes = dishes;
            $scope.categories = categories;
            $scope.canteenName = core.canteenName();
            $scope.cycle = core.cycle(true);
            // Updating view when canteen changes
            $rootScope.$on('canteenChanged', function() {
                $scope.cycle = core.cycle(true);
                $scope.dishes = Dishes.getWeekly();
                $timeout(function() {
                    $scope.canteenName = core.canteenName();
                });

            });
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

            $scope.dayFilter = function(dish) {
                return dish.week[$scope.cycle][core.days[$scope.activeDay]];
            };

            $scope.init = (function() {
                // if it's weekend (sat: day = 5, sun: day = -1)

                if (core.isClosed()) {
                    $timeout(function() {
                        messageCenterService.add('danger', $scope.canteenName + ' is closed today. Showing next week');
                    });
                    // set view to Monday
                    $scope.activeDay = 0;
                } else {
                    // otherwise set view to current day
                    $scope.activeDay = core.day;
                }

                $scope.nameDays();

            })();


        }
    ]);