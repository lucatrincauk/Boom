angular.module('Boom')
	.controller('userLoginController', ['$scope', 'Users',
		function($scope, Users) {
			'use strict';
			$scope.user = {};

			$scope.register = function() {
				Users.createUser($scope.user);
			};
			$scope.login = function() {
				Users.loginUser($scope.user);
			};
			$scope.removeUser = function() {
				Users.removeUser($scope.user);
			}
			$scope.resetPassword = function() {
				Users.resetPassword($scope.user);
			}

		}

	]);