angular.module('boom.repositories')

    .factory('dishRepository', ['$http', function($http) {

        var getAllDishes = function() {
            return $http.get('test_data/dishes.json');
        };

        return {
            all: getAllDishes
        }
    }]);