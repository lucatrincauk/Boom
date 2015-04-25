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
                        $scope.canteenName = core.canteenName();
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
            var popovers = {
                canteen: '<ion-popover-view><ion-header-bar><h1 class="title">My Canteen</h1></ion-header-bar><ion-content><ion-list><ion-radio ng-model="canteen.name" ng-value="\'Merchant Square\'">Merchant Square</ion-radio><ion-radio ng-model="canteen.name" ng-selected ng-value="\'Waterside\'">Waterside</ion-radio></ion-list></ion-content></ion-popover-view>',
                notification: '<ion-popover-view><ion-header-bar> <h1 class="title">Notifications</h1> </ion-header-bar> <ion-content>  <div class="item item-divider">    Tomorrow at Waterside  </div><div class="item item-thumbnail-left item-icon-right">                    <img ng-src="images/dishes/theatre-bar/fish-chips.jpg" src="images/dishes/theatre-bar/fish-chips.jpg">                    <h2 class="ng-binding" href="#/dishes/theatre-bar/-JdgxGTB1JeMg_AX6bY_">Fish and Chips</h2>                    <p class="ng-binding">Battered Haddock or Breaded Whole Tail Scampi</p>                    <spa class="icon ion-heart positive"></span>                </div><div class="item item-divider">    Friday at Waterside  </div> <div class="item item-thumbnail-left item-icon-right">                    <img ng-src="images/dishes/theatre-bar/fish-chips.jpg" src="images/dishes/theatre-bar/fish-chips.jpg">                    <h2 class="ng-binding" href="#/dishes/theatre-bar/-JdgxGTB1JeMg_AX6bY_">Fish and Chips</h2>                    <p class="ng-binding">Battered Haddock or Breaded Whole Tail Scampi</p>                    <spa class="icon ion-heart positive"></span>                </div>  <div class="item item-thumbnail-left item-icon-right">                    <img ng-src="images/dishes/theatre-bar/fish-chips.jpg" src="images/dishes/theatre-bar/fish-chips.jpg">                    <h2 class="ng-binding" href="#/dishes/theatre-bar/-JdgxGTB1JeMg_AX6bY_">Fish and Chips</h2>                    <p class="ng-binding">Battered Haddock or Breaded Whole Tail Scampi</p>                    <spa class="icon ion-heart positive"></span>                </div></ion-content></ion-popover-view>'
            };

            $scope.popovers = {};
            $scope.popovers.canteen = $ionicPopover.fromTemplate(popovers.canteen, {
                scope: $scope
            });

            $scope.popovers.notifications = $ionicPopover.fromTemplate(popovers.notification, {
                scope: $scope
            });



            $scope.openPopover = function($event, type) {
                $scope.popovers[type].show($event);
            };


            $scope.$watch('canteen.name', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                if ($scope.user) {
                    Users.changeCanteen(newValue);
                }
                Core.canteenName(newValue);
            }, true);

        }
    ]);