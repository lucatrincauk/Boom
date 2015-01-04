'use strict';
angular.module('Boom')
	.directive('userFormDirective', function() {
		return {
			restrict: 'A',
			templateUrl: 'templates/directives/user-form.html'
		};
	});