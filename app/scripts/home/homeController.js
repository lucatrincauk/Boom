angular.module('Boom')
	.controller('homeController', ['$scope', 'Categories',
		function($scope, Categories, $state) {
			'use strict';

			$scope.categories = [];

            $scope.categories = [];
            /* Get data from the factory Categories
             * getList() is a restangular method
             * Passing response to scope once promise is successful
             */
            (function init() {
                Categories.getList().then(function(categories) {
                    $scope.categories = computeAverageDishRatings(categories);
                });
            })();

            /**
             * Returns the average rating from all dish comments.
             */
            $scope.getAverageRating = function(comments) {
                var ratingAcc = 0;

                angular.forEach(comments, function(comment) {
                    ratingAcc += comment.star_rating;
                });

                return ratingAcc / comments.length;
            };

            /**
             * Computes and assigns average ratings for all dishes in each category.
             */
            function computeAverageDishRatings(categories) {
                angular.forEach(categories, function(category) {
                    angular.forEach(category.dishes, function(dish) {
                        dish.averageRating = $scope.getAverageRating(dish.comments);
                    });
                });

                return categories;
            }
        }
    ]);
