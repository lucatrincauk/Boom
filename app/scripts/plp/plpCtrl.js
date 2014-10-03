angular.module('boom.plp')

.controller('plpCtrl', ['$scope', 'Categories',
	function($scope, Categories) {
		'use strict';

		$scope.categories = [];


		(function() {
			Categories.all().then(function(categories) {
				$scope.categories = categories.data;
			});
		})();
	}
]);