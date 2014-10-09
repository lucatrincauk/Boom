angular.module('Boom')
	.controller('dishController', ['$scope', '$stateParams', 'Dishes',
		function($scope, $stateParams, Dishes) {
			'use strict';

            Dishes.byId($stateParams.id).then(function (dish) {
                $scope.dish = dish;
            });

		}
	]);