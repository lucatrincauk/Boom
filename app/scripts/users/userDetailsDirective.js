'use strict';
angular.module('Boom')
	.directive('userDetailsDirective', function() {
		return {
			restrict: 'A',
			templateUrl: 'templates/directives/user-details.html'
		};
	});