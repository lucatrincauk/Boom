angular.module('Boom')
    .controller('adminController', ['$scope', 'Categories',
        function($scope, Categories) {
            'use strict';

            // Load categories
            Categories.$loaded().then(function() {
                $scope.categories = Categories;
            });

            $scope.boom = '22';



        }
    ]);