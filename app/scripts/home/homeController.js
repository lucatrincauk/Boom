angular.module('Boom')
    .controller('homeController', ['$scope', 'Categories',
        function($scope, Categories, $state) {
            'use strict';

            Categories.success(function(data) {
                $scope.categories = data[0];
            });
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