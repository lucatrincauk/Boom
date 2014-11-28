angular.module('Boom')
	.controller('singleController', ['$scope', '$stateParams', 'Single',
		function($scope, $stateParams, Single) {
			'use strict';


			Single.success(function(data) {
				$scope.single = data;

			});



		}
	]);