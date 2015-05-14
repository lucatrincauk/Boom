angular.module('Boom')
	.controller('userProfileController', ['$scope', 'users', '$firebase', '$rootScope', 'ngNotify',
		function($scope, users, $firebase, $rootScope, ngNotify) {
			'use strict';

			$scope.save = function() {
				$rootScope.user.$save().then(function() {
					ngNotify.set('Your profile has been updated', 'success');


				}, function(error) {
					ngNotify.set('Error updating your profile: ' + error, 'error');

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