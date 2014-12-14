angular.module('Boom')
	.controller('adminDishesController', ['$scope', 'categories', 'dishes', '$timeout',
		function($scope, categories, dishes) {
			'use strict';

			// Load categories
			$scope.categories = categories;
			$scope.dishes = dishes;



		}
	]);