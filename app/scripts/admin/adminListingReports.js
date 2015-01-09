angular.module('Boom').controller('adminListingReportsController', ['$scope', '$rootScope', 'reports',
	function($scope, $rootScope, reports) {
		'use strict';

		$scope.reports = reports;

		console.log(reports);
	}
]);