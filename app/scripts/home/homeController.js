angular.module('Boom')
    .controller('homeController', ['$scope', '$rootScope', 'core', 'categories', 'dishes', '$filter', 'messageCenterService', '$timeout', 'Dishes', '$ionicSlideBoxDelegate', '$ionicPopover', 'Core', 'Users',
        function($scope, $rootScope, core, categories, dishes, $filter, messageCenterService, $timeout, Dishes, $ionicSlideBoxDelegate, $ionicPopover, Core, Users) {
            'use strict';

            // Show initial Loading screen only once
            var init;
            if (!init) {
                $rootScope.$broadcast('loading:show');
                init = true;
            }

            // Once dishes come back from server..
            dishes.$loaded(function() {
                // Assign data to scope         
                $scope.dishes = dishes;

                // if it's weekend (sat: day = 5, sun: day = -1)
                if (core.isClosed()) {
                    // Show message "Canteen closed"
                    $timeout(function() {
                        messageCenterService.add('danger', $scope.canteen.name + ' is closed today. Showing next week');
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
            $scope.canteen = {
                name: Core.canteenName()
            };
            $scope.cycle = core.cycle(true);
            $scope.days = core.days;
            // Updating view when canteen changes
            $rootScope.$on('canteenChanged', function() {
                $scope.cycle = core.cycle(true);
                var dishesChanged = Dishes.getWeekly();
                dishesChanged.$loaded(function() {
                    $scope.dishes = dishesChanged;
                    $timeout(function() {
                        $scope.canteen.name = core.canteenName();
                    });
                });

                //});

            });
            $scope.nameDays = function() {
                $scope.activeDay = $ionicSlideBoxDelegate.currentIndex();
                $scope.dayName = $filter('dayfy')($scope.activeDay);
            };


            $scope.prev = function() {
                $ionicSlideBoxDelegate.previous();
            };

            $scope.next = function() {
                $ionicSlideBoxDelegate.next();
            };
            $scope.dayFilter = function(dayFilter) {
                return function(dish) {
                    return dish.week[$scope.cycle][core.days[dayFilter]];
                };
            };

            $ionicPopover.fromTemplateUrl('homeCanteen.html', {
                scope: $scope
              }).then(function(popover) {
                $scope.popoverCanteen = popover;
              });

            $scope.openPopover = function($event) {
                $scope.popoverCanteen.show($event);
            };


            $scope.$watch('canteen.name', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                if ($scope.user) {
                    Users.changeCanteen(newValue);
                }
                Core.canteenName(newValue);
                $scope.popoverCanteen.hide();

            }, true);

        }
    ]);