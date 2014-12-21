angular.module('Boom')
	.controller('singleController', ['$scope', 'dish', 'core',
		function($scope, dish, core) {
			'use strict';

			$scope.filterFalseDays = function(day) {
				var keys = Object.keys(day);

				var filtered = keys.filter(function(key) {
					return day[key];
				});
				return filtered;
			};

			dish.$loaded(function() {
				$scope.single = dish;
				$scope.single.days = $scope.filterFalseDays($scope.single.week[core.cycle(true)]);

				if ($scope.single.days.length >= 5) {
					$scope.single.days = ['Everyday'];
				}

			});


			$scope.canteenName = core.canteenName;

			//$scope.days = '';
		}

	]);