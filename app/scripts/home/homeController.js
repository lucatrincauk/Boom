angular.module('Boom')
    .controller('homeController', ['$scope', 'Categories',
        function($scope, Categories, $state) {
            'use strict';

            var day, today, activeDay;

            Categories.success(function(data) {
                $scope.init(data)
            });

            $scope.init = function(data) {
                today = new Date();
                day = today.getDay() - 1;
                $scope.data = data;
                $scope.categories = $scope.data[day];
                activeDay = day;

                $scope.nameDays();

            }

            $scope.nameDays = function() {
                var activeDayName = $scope.categories.day;
                switch (activeDay) {
                    case 3:
                        activeDayName = "Today";
                        break;
                    case 4:
                        activeDayName = "Tomorrow";
                        break;
                    case 2:
                        activeDayName = "Yesterday";
                        break;
                }
                $scope.categories.day = activeDayName;

            }

            $scope.prev = function(count) {
                if (activeDay < 1) {
                    return false;
                } else {
                    activeDay = activeDay - 1;
                    $scope.categories = $scope.data[activeDay];
                    $scope.nameDays();
                }
                return activeDay;
            };

            $scope.next = function(count) {

                if (activeDay > 3) {
                    return false;
                } else {
                    activeDay = activeDay + 1;
                    $scope.categories = $scope.data[activeDay];
                    $scope.nameDays();
                }
                return activeDay;
            };

            /* Get data from the factory Categories
             * getList() is a restangular method
             * Passing response to scope once promise is successful
             */
            // (function init() {
            //     Categories.getList().then(function(categories) {
            //         $scope.categories = computeAverageDishRatings(categories);
            //     });
            // })();


        }
    ]);