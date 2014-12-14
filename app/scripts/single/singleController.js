angular.module('Boom')
	.controller('singleController', ['$scope', '$stateParams', 'dish', 'core',
		function($scope, $stateParams, dish, core) {
			'use strict';

			$scope.single = dish;
			$scope.canteenName = core;
		}

	]);