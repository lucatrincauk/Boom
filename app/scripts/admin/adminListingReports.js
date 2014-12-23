angular.module('Boom').controller('adminListingReportsController', ['$scope', '$rootScope', 'ReportedDishes',
    function ($scope, $rootScope, ReportedDishes) {
        'use strict';

        $scope.reportedDishes = ReportedDishes;

        console.log(ReportedDishes);
    }
]);