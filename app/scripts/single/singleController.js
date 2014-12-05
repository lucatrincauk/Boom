angular.module('Boom')
	.controller('singleController', ['$scope', '$stateParams', 'Dishes',
		function($scope, $stateParams, Dishes) {
			'use strict';


			Dishes.getOne($stateParams.id).$loaded().then(function(data) {
				$scope.single = data;
			});

		}

	]);