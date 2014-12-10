'use strict';
angular.module('Boom')
	.directive('adminCategoryFormDirective', function() {
		return {
			restrict: 'A',
			templateUrl: 'templates/directives/category-form.html'

		};
	});