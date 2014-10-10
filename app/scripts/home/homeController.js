angular.module('Boom')
	.controller('homeController', ['$scope', 'Categories',
		function($scope, Categories) {
			'use strict';

			$scope.categories = Categories.getList().$object;

            /*(function() {
                Cars.getList().then(function(cars) {
                    $scope.cars = cars;
                });
            })();*/
		}
	]);