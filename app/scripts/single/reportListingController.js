angular.module('Boom')
    .controller('reportListingController', ['$scope', '$stateParams', 'dish', '$state', 'ListingReports',
        function($scope, $stateParams, dish, $state, ListingReports) {
            'use strict';

            $scope.single = dish;

            $scope.reportData = {
                dishId: dish.$id,
                incorrectImage: false,
                incorrectDescription: false,
                incorrectDate: false,
                rudeComments: false
            };

            $scope.reportListing = function() {
                ListingReports.add($scope.reportData);
                $state.go('app.home');
            };

            (function init() {
                ListingReports.getAll().then(function(data) {
                    console.log(data);
                });
            })();
        }
    ]);