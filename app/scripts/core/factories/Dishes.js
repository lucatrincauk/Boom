angular.module('Boom')

.factory('Dishes', ['$http',
	function($http) {
		'use strict';

		var getAllDishes = function() {
			return $http.get('test_data/dishes.json');
		};

		return {
			all: getAllDishes
		};
	}
]);