angular.module('Boom')
	.controller('adminStatsController', ['$scope', 'dishes', 'categories', 'core',
		function($scope, dishes, categories, core) {
			'use strict';

			$scope.dishes = dishes;
			$scope.categories = categories;
			$scope.closed = core.isClosed();
			$scope.closedText = ($scope.closed ? 'Closed' : 'Open');

			//$scope.canteenName = core.canteenName();

			$scope.$watch(function() {
				return core.canteenName();
			}, function(newVal, oldVal) {
				if (typeof newVal !== 'undefined') {
					$scope.canteenName = core.canteenName();
					$scope.cycle = core.cycle();


					console.log('bo')
				}
			});


			$scope.day = core.day;
			//$scope.cycle = core.cycle();
			$scope.week = core.week();
		}
	]);