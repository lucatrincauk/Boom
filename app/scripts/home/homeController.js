angular.module('Boom')
	.controller('homeController', ['$scope', 'Cars',
		function($scope, Cars) {
			'use strict';

			$scope.cars = Cars.getList().$object;

            /*(function() {
                Cars.getList().then(function(cars) {
                    $scope.cars = cars;
                });
            })();*/
		}
	]);