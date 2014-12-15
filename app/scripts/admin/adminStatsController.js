angular.module('Boom')
	.controller('adminStatsController', ['$scope', 'dishes', 'categories', 'core',
		function($scope, dishes, categories, core) {
			'use strict';

			$scope.dishes = dishes;
			$scope.categories = categories;
			$scope.closed = core.isClosed();
			$scope.closedText = ($scope.closed ? 'Closed' : 'Open');

			$scope.canteenName = core.canteenName;
			$scope.day = core.day;
			$scope.cycle = core.cycle();
			$scope.week = core.week();
		}
	]);