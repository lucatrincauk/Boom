angular.module('Boom')
    .controller('adminController', ['$scope', 'Categories', 'Dishes', '$filter',
        function($scope, Categories, Dishes, $filter) {
            'use strict';

            // Load categories
            Categories.$loaded().then(function() {
                $scope.categories = Categories;
            });

            // Load dishes
            Dishes.getAll().$loaded().then(function(data) {
                $scope.dishes = data;
            });


            $scope.addDish = {};

            $scope.save = function() {
                $scope.addDish.id = $filter('dashify')($scope.addDish.title);

                Dishes.saveDish($scope.addDish);
            };


        }
    ]);