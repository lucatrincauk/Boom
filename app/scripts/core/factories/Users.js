'use strict';
angular.module('Boom')

.factory('Users', ['$firebase', 'FirebaseUrl',
	function($firebase, FirebaseUrl) {

		var ref = new Firebase(FirebaseUrl);

		var createUser = function(data) {
			console.log(data);


			ref.createUser({
				email: data.email,
				password: data.password
			}, function(error) {
				if (error === null) {
					console.log('User created successfully');
				} else {
					console.log('Error creating user:', error);
				}
			});
		};

		var loginUser = function(data) {
			ref.authWithPassword({
				email: data.email,
				password: data.password
			}, function(error, authData) {
				if (error) {
					console.log('Login Failed!', error);
				} else {
					console.log('Authenticated successfully with payload:', authData);
				}
			});
			ref.onAuth(function(authData) {
				if (authData) {
					// save the user's profile into Firebase so we can list users,
					// use them in Security and Firebase Rules, and show profiles
					ref.child('users').child(authData.uid).set(authData);
				}
			});

		};
		var removeUser = function(data) {
			ref.removeUser({
				email: data.email,
				password: data.password
			}, function(error) {
				if (error === null) {
					console.log('User removed successfully');
				} else {
					console.log('Error removing user:', error);
				}
			});
		};

		return {
			createUser: createUser,
			loginUser: loginUser,
			removeUser: removeUser
		};
	}



]);