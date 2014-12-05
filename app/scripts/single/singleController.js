angular.module('Boom')
	.controller('singleController', ['$scope', '$stateParams', 'dish',
		function($scope, $stateParams, dish) {
			'use strict';

			$scope.single = dish;

		}

	]);