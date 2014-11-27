angular.module('Boom')
    .controller('homeController', ['$scope', 'Categories',
        function($scope, Categories, $state) {
            'use strict';

            var day, today, activeDay;

            Categories.success(function(data) {
                today = new Date();
                day = today.getDay() - 1;
                $scope.data = data;
                $scope.categories = $scope.data[day];
                activeDay = day;
                $scope.nameDays();
            });


            $scope.nameDays = function() {
                console.log($scope.categories.day);
                if ($scope.categories.day == "Thursday") {
                    $scope.categories.day = "Today";
                } else if ($scope.categories.day == "Friday") {
                    $scope.categories.day = "Tomorrow";
                } else if ($scope.categories.day == "Wednesday") {
                    $scope.categories.day = "Yesterday";
                }
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