angular.module('Boom')

.factory('Dishes', ['$http',
	function ($http) {
		'use strict';

		var getAllDishes = function () {
			return $http.get('test_data/dishes.json');
		};

        var getDishById = function (id) {
            return $http.get('test_data/dishes.json').then(function (dishes) {
                return _.find(dishes.data, function (dish) {
                    return dish.id === parseInt(id, 10);
                });
            });
        };

		return {
			all: getAllDishes,
            byId: getDishById
		};
	}
]);