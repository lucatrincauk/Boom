angular.module('Boom')
	.controller('userProfileController', ['$scope', 'users', '$firebase', '$rootScope', 'messageCenterService', '$timeout',
		function($scope, users, $firebase, $rootScope, messageCenterService, $timeout) {
			'use strict';


			$scope.save = function() {
				$rootScope.user.$save().then(function() {
					console.log('Saved successfully');

					$timeout(function() {
						messageCenterService.add('success', 'Profile saved successfully.', {
							timeout: 3000
						});
					});

				}, function(error) {
					console.log('Error:', error);
					messageCenterService.add('danger', error.message, {
						timeout: 6000
					});
				});
			};
			$scope.logout = function() {
				users.logoutUser();

			};


		}

	]);