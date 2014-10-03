angular.module('boom.repositories')

.factory('Categories', ['$http', 'Dishes',
    function($http, dishRepo) {
        'use strict';

        function getAllCategories() {
            return $http.get('test_data/categories.json').then(joinDishesToCategories);
        }

        function joinDishesToCategories(categories) {

            dishRepo.all().then(function(dishes) {
                angular.forEach(categories.data, function(category) {
                    category.dishes = [];

                    angular.forEach(dishes.data, function(dish) {
                        if (dish.categoryId === category.id) {
                            category.dishes.push(dish);
                        }
                    });
                });
            });

            return categories;
        }

        return {
            all: getAllCategories
        };
    }
]);