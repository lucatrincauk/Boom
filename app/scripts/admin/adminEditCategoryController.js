angular.module('Boom')
    .controller('adminEditCategoryController', ['$scope', 'category', '$filter', 'Categories', '$state', 'Users',

        function($scope, category, $filter, Categories, $state, Users) {
            'use strict';

            // Load categories
            $scope.category = category;
            $scope.user = Users.getUser();

            $scope.save = function() {
                $scope.category.id = $filter('dashify')($scope.category.title);
                Categories.saveCategory($scope.category);
                $state.go('app.admin.categories');

            };
            $scope.remove = function(catId) {
                Categories.removeCategory(catId);
                $state.go('app.admin.categories');

            };


        }
    ]);