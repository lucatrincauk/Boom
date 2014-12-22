angular.module('Boom').controller('adminListingReportsController', ['$scope', '$rootScope', 'listingReports', 'Dishes',
    function ($scope, $rootScope, listingReports, Dishes) {
        'use strict';

        $scope.reportedDishes = [];

        Dishes.getAll().$loaded().then(function(data) {
            console.log(data);
        });

        console.log(listingReports);
    }
]);