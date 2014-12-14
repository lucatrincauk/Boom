angular.module('Boom')
	.controller('adminStatsController', ['$scope', 'dishes', 'categories', '$rootScope',
		function($scope, dishes, categories, $rootScope) {
			'use strict';

			$scope.dishes = dishes;
			$scope.categories = categories;
			$scope.closed = ($rootScope.closed ? 'Closed' : 'Open');

		}

	]);