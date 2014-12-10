angular.module('Boom')
	.controller('adminStatsController', ['$scope', 'dishes', 'categories', '$rootScope',
		function($scope, dishes, categories, $rootScope) {
			'use strict';

			$scope.dishes = dishes;
			$scope.categories = categories;
			$scope.day = $rootScope.day;
			$scope.canteen = $rootScope.canteenName;
			$scope.closed = ($rootScope.closed ? 'Closed' : 'Open');
			$scope.cycle = $rootScope.cycle;
			$scope.week = $rootScope.week;


		}

	]);