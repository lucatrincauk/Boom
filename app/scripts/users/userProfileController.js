angular.module('Boom')
	.controller('userProfileController', ['$scope', 'users', '$firebase', '$rootScope',
		function($scope, users, $firebase, $rootScope) {
			'use strict';


			$scope.save = function() {
				$rootScope.user.$save().then(function() {
					console.log('Saved successfully');

				}, function(error) {
					console.log('Error:', error);
				});
			};
			$scope.logout = function() {
				users.logoutUser();

			};


		}

	]);