angular.module('Boom')
	.controller('adminCategoriesController', ['$scope', 'categories', 'dishes',
		function($scope, categories, dishes) {
			'use strict';

			// Load categories
			$scope.categories = categories;
			$scope.dishes = dishes;


		}
	]);