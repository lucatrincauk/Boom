angular.module('Boom')
    .controller('homeController', ['$scope', 'Categories', 'Menu', 'Categories',
        function($scope, Categories, Menu) {
            'use strict';

            // Load dishes
            Menu.$loaded().then(function() {
                $scope.dishes = Menu;
                $scope.init();
            });
            // Load categories
            Categories.$loaded().then(function() {
                $scope.categories = Categories;
            });


            var day, today;

            $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

            $scope.init = function() {
                // get today's date and remove sunday
                today = new Date();
                day = today.getDay() - 1;

                // if it's weekend
                if (day > 4) {
                    // show closed message
                    $scope.closed = true;
                    // set view to Monday
                    $scope.activeDay = 0;
                } else {
                    // otherwise set view to current day
                    $scope.activeDay = day;
                }

                $scope.nameDays();

            };

            $scope.nameDays = function() {

                switch (day - $scope.activeDay) {
                    // If view is same as current day, set it as Today
                    case 0:
                        $scope.dayName = 'Today';
                        break;
                        // If view is 1 day behind current day, set it as Yesterday
                    case -1:
                        $scope.dayName = 'Tomorrow';
                        break;
                        // If view is 1 day ahead current day, set it as Tomorrow
                    case 1:
                        $scope.dayName = 'Yesterday';
                        break;
                        // Otherwise retrieve day's name
                    default:
                        $scope.dayName = $scope.days[$scope.activeDay];
                }
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


        }
    ]);