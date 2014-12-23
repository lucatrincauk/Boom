angular.module('Boom')
    .controller('reportListingController', ['$scope', '$stateParams', 'dish', '$state', 'FirebaseUrl',
        function($scope, $stateParams, dish, $state, FirebaseUrl) {
            'use strict';

            $scope.single = dish;

            $scope.reportData = {
                incorrectImage:       false,
                incorrectDescription: false,
                incorrectDate:        false,
                rudeComments:         false
            };

            $scope.reportListing = function() {
                $scope.single = addReportToDish($scope.reportData, $scope.single);

                $scope.single.$save().then(function() {
                    $state.go('app.home');
                });
            };

            function addReportToDish(report, dish) {
                if (!dish.reports) {
                    dish.reports = [report];
                } else {
                    dish.reports.push(report);
                }

                return dish;
            }
        }
    ]);