angular.module('Boom')
	.controller('userProfileController', ['$scope', 'users', '$firebase', '$firebaseAuth', 'FirebaseUrl',
		function($scope, users, $firebase, $firebaseAuth, FirebaseUrl) {
			'use strict';
			var ref = new Firebase(FirebaseUrl);

			ref.onAuth(function() {
				$scope.user = users.getUser();
			});

			$scope.save = function() {
				$scope.user.$save().then(function() {
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