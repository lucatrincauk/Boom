angular.module('Boom')
	.controller('adminStatsController', ['$scope', 'dishes', 'categories',
		function($scope, dishes, categories) {
			'use strict';

			$scope.dishes = dishes;
			$scope.categories = categories;

			$scope.closedText = ($scope.closed ? 'Closed' : 'Open');
		}


	]);