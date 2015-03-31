angular.module('Boom')
	.controller('userProfileController', ['$scope', 'users', '$firebase', '$rootScope', 'messageCenterService',
		function($scope, users, $firebase, $rootScope, messageCenterService) {
			'use strict';

			$scope.save = function() {
				$rootScope.user.$save().then(function() {
					console.log('Saved successfully');

					messageCenterService.add('success', 'Profile saved successfully.', {
						timeout: 3000
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
			$scope.changeEmail = function() {
				users.changeEmail($scope.user);
			};
			$scope.changePassword = function() {
				users.changePassword($scope.user);
				$scope.user.currentPassword = '';
				$scope.user.newPassword = '';
			};


		}

	]);