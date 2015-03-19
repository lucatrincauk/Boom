angular.module('Boom')
    .controller('homeController', ['$scope', '$rootScope', 'core', 'categories', 'dishes', '$filter', 'messageCenterService', '$timeout', 'Dishes','$ionicSlideBoxDelegate',
        function($scope, $rootScope, core, categories, dishes, $filter, messageCenterService, $timeout, Dishes, $ionicSlideBoxDelegate) {
            'use strict';
            // Show initial Loading screen
            $rootScope.$broadcast('loading:show');

            // Once dishes come back from server..
            dishes.$loaded(function() {

                // Assign data to scope         
                $scope.dishes = dishes;

                // if it's weekend (sat: day = 5, sun: day = -1)
                if (core.isClosed()) {
                    // Show message "Canteen closed"
                    $timeout(function() {
                        messageCenterService.add('danger', $scope.canteenName + ' is closed today. Showing next week');
                    });
                    // Show Monday
                   $ionicSlideBoxDelegate.slide(0);
                } else {
                    // Otherwise, show Today
                    $ionicSlideBoxDelegate.slide(core.day);
                }
                // Hide Loading Screen
                $rootScope.$broadcast('loading:hide');
                // Set fancy day names
                $scope.nameDays();
            });

            categories.$loaded(function() {
                $scope.categories = categories;
            });
            $scope.canteenName = core.canteenName();
            $scope.cycle = core.cycle(true);
            $scope.days = core.days;
            // Updating view when canteen changes
            $rootScope.$on('canteenChanged', function() {
                $scope.cycle = core.cycle(true);
                $scope.dishes = Dishes.getWeekly();
                $timeout(function() {
                    $scope.canteenName = core.canteenName();
                });

            });
            $scope.nameDays = function() {
                $scope.dayName = $filter('dayfy')($ionicSlideBoxDelegate.currentIndex());
            };


            $scope.prev = function() {
                // Don't let browse behind Monday
                // if ($scope.activeDay < 1) {
                //     return false;
                // } else {
                //     // Set view to day before
                //     $scope.activeDay = $scope.activeDay - 1;

                //     $scope.nameDays();
                // }
                // return $scope.activeDay;
                $ionicSlideBoxDelegate.previous();
                 $scope.nameDays();
            };

            $scope.next = function() {
                // Don't let browse ahead of Friday
                // if ($scope.activeDay > 3) {
                //     return false;
                // } else {
                //     // Set view to day after
                //     $scope.activeDay = $scope.activeDay + 1;
                //     
                // }
                // return $scope.activeDay;
                $ionicSlideBoxDelegate.next();
                $scope.nameDays();

            };

    
           


        }
    ]);