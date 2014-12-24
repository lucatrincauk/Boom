angular.module('Boom')
	.controller('userProfileController', ['$scope', 'users', '$state',
		function($scope, users, $state) {
			'use strict';


			$scope.user = users.getUser();

			console.log($scope.user);

			$scope.save = function() {
				$scope.user.$save().then(function() {
					console.log('Saved successfully');


				}, function(error) {
					console.log('Error:', error);
				});
			};

		}

	]);