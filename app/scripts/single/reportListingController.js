angular.module('Boom')
    .controller('reportListingController', ['$scope', '$stateParams', 'dish', 'core', '$state',
        function($scope, $stateParams, dish, core, $state) {
            'use strict';

            $scope.single = dish;
            $scope.canteenName = core;

            $scope.reportData = {
                incorrectImage: false,
                incorrectDescription: false,
                rudeComments: false
            };

            $scope.reportListing = function() {
                console.log($scope.single);
                console.log($scope.reportData);

                //$scope.dish.id = $filter('dashify')($scope.dish.slug);
                //Dishes.saveDish($scope.dish);

                $state.go('app.home');
            };
        }
    ]);