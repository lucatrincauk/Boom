angular.module('Boom')
    .controller('reportListingController', ['$scope', '$stateParams', 'dish', '$state', 'reports',
        function($scope, $stateParams, dish, $state, reports) {
            'use strict';

            $scope.single = dish;
            $scope.reports = reports;
            $scope.report = {};
            $scope.report.dishId = $scope.single.$id;

            $scope.reportListing = function() {
                $scope.report.timestamp = new Date().toString();
                $scope.reports.$add($scope.report).then(function() {
                    console.log('Saved successfully');
                }, function(error) {
                    console.log('Error:', error);
                });

            };


        }
    ]);