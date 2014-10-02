angular.module('boom.repositories')

    .factory('categoryRepository', ['$http', 'dishRepository', function($http, dishRepo) {

        var getAllCategories = function() {
            return $http.get('test_data/categories.json').then(joinDishesToCategories);
        };

        var joinDishesToCategories = function(categories) {

            dishRepo.all().then(function(dishes) {
                angular.forEach(categories.data, function(category) {
                    category.dishes = [];

                    angular.forEach(dishes.data, function(dish) {
                        if (dish.category_id === category.id) {
                            category.dishes.push(dish);
                        }
                    });
                });
            });

            return categories;
        };

        return {
            all: getAllCategories
        }
    }]);