angular.module('Boom')
	.controller('singleController', ['$scope', 'dish', 'core', 'Users',
		function($scope, dish, core, Users) {
			'use strict';


			dish.$loaded(function() {
				// assign data to scope
				$scope.single = dish;

				// if dish has a week assigned
				if ($scope.single.week) {
					// retrieve which set days are assigned to the current cycle
					// core.cycle(true) will return a word e.g. four
					$scope.single.days = $scope.filterFalseDays($scope.single.week[core.cycle(true)]);

					// if a dish is assigned to all days, replace days with 'Everyday'
					if ($scope.single.days.length >= 5) {
						$scope.single.days = ['Everyday'];
					}
				}

				$scope.viewCount();

			});

			// filter out days that are set to false (due to checkbox)
			$scope.filterFalseDays = function(day) {
				var keys = Object.keys(day);

				var filtered = keys.filter(function(key) {
					return day[key];
				});
				return filtered;
			};

			// increase dish views count
			$scope.viewCount = function() {
				if ($scope.single.views) {
					$scope.single.views = ++$scope.single.views;
				} else {
					// or initialise it to 1
					$scope.single.views = 1;
				}
				// save to server
				$scope.single.$save().then(function() {
					console.log('Saved successfully');
				}, function(error) {
					console.log('Error:', error);
				});
			};
			$scope.addFavourite = function() {
				Users.addFavourite($scope.single.$id);
			};

			$scope.canteenName = core.canteenName();

		}

	]);