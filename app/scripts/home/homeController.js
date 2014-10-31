angular.module('Boom')
	.controller('homeController', ['$scope', 'Categories',
		function($scope, Categories) {
			'use strict';

			$scope.categories = [];

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