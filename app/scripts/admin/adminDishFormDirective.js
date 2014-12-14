'use strict';
angular.module('Boom')
	.directive('adminDishFormDirective', function() {
		return {
			restrict: 'A',
			templateUrl: 'templates/directives/dish-form.html'

		};
	});