'use strict';
angular.module('Boom')

.factory('Users', ['$firebase', 'FirebaseUrl', '$state', '$firebaseAuth', '$rootScope',
	function($firebase, FirebaseUrl, $state, $firebaseAuth, $rootScope) {

		var ref = new Firebase(FirebaseUrl);
		var auth = $firebaseAuth(ref);

		var createUser = function(data) {
			ref.createUser({
				username: data.username,
				email: data.email,
				password: data.password
			}, function(error) {
				if (error === null) {
					console.log('User created successfully');
					loginUser(data);
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
					$state.go('app.user.profile');
				}
			});
			ref.onAuth(function(authData) {
				if (authData) {
					// save the user's profile into Firebase so we can list users,
					// use them in Security and Firebase Rules, and show profiles
					ref.child('users').child(authData.uid).update(authData);
				}
			});

		};


		var logoutUser = function() {
			console.log('user _ logged out');
			$state.go('app.home');
			auth.$unauth();
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



		var getUser = function() {
			console.log('user _ checking user');

			var user = ref.getAuth();

			// If no current user send to register page
			if (!user) {
				console.log('user _ not registered');
				//$state.go('app.user.login');
				return;
			}
			console.log('user _ is logged');

			var refSingle = ref.child('users').child(user.uid);
			var sync = $firebase(refSingle);

			return sync.$asObject();

		};

		var addFavourite = function($id) {
			if (typeof $rootScope.user.favourites === 'string' || !$rootScope.user.favourites) {
				$rootScope.user.favourites = [];
			}

			ref.child('users/' + $rootScope.user.uid + '/favourites/' + $id).update({
				'id': $id
			});


			// $rootScope.user.save().then(function() {
			// 	console.log('Saved successfully');

			// }, function(error) {
			// 	console.log('Error:', error);
			// });

		};

		var removeFavourite = function($id) {
			ref.child('users/' + $rootScope.user.uid + '/favourites/' + $id).remove();
		};

		ref.onAuth(function() {
			$rootScope.user = getUser();

		});

		return {
			createUser: createUser,
			loginUser: loginUser,
			logoutUser: logoutUser,
			removeUser: removeUser,
			auth: auth,
			getUser: getUser,
			addFavourite: addFavourite,
			removeFavourite: removeFavourite
		};
	}



]);