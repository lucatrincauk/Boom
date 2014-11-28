angular.module('Boom')
    .controller('homeController', ['$scope', 'Categories',
        function($scope, Categories) {
            'use strict';

            var day, today, activeDay;

            Categories.success(function(data) {
                $scope.init(data);
            });

            $scope.init = function(data) {
                today = new Date();
                day = today.getDay() - 1;
                $scope.data = data;
                $scope.categories = $scope.data[day];

                activeDay = day;

                $scope.nameDays();

            };

            $scope.nameDays = function() {
                switch (day - activeDay) {
                    case 0:
                        $scope.categories.day = 'Today';
                        break;
                    case -1:
                        $scope.categories.day = 'Tomorrow';
                        break;
                    case 1:
                        $scope.categories.day = 'Yesterday';
                        break;
                }
            };


            $scope.prev = function() {
                if (activeDay < 1) {
                    return false;
                } else {
                    activeDay = activeDay - 1;
                    $scope.categories = $scope.data[activeDay];
                    $scope.nameDays();
                }
                return activeDay;
            };

            $scope.next = function() {

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