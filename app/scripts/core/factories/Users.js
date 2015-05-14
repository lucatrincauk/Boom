'use strict';
angular.module('Boom')
	.factory('Users', ['$firebase', 'FirebaseUrl', '$state', '$firebaseAuth', '$rootScope', 'Core', 'ngNotify',
		function($firebase, FirebaseUrl, $state, $firebaseAuth, $rootScope, Core, ngNotify) {
			var ref = new Firebase(FirebaseUrl);
			var auth = $firebaseAuth(ref);
			var createUser = function(data) {
				$rootScope.$broadcast('loading:show');
				ref.createUser({
					username: data.username,
					email: data.email,
					password: data.password
				}, function(error) {
					if (error === null) {
						ngNotify.set('Your account has been created', 'success');
						loginUser(data);
					} else {
						$rootScope.$broadcast('loading:hide');
						ngNotify.set(error.message, 'warn');
					}
				});
			};
			var loginUser = function(data) {
				$rootScope.$broadcast('loading:show');

				ref.authWithPassword({
					email: data.email,
					password: data.password
				}, function(error) {
					if (error) {
						ngNotify.set(error.message, 'warn');
					} else {
						$state.go('app.home');
						ngNotify.set('You are now logged in', 'success');
					}
					$rootScope.$broadcast('loading:hide');

				});
				ref.onAuth(function(authData) {
					if (authData) {
						// save the user's profile into Firebase so we can list users,
						// use them in Security and Firebase Rules, and show profiles
						ref.child('users').child(authData.uid).update(authData);
					}
				});
			};
			var resetPassword = function(data) {
				ref.resetPassword({
					email: data.email
				}, function(error) {
					if (error === null) {
						$rootScope.$apply(function() {
							$state.go('app.user.login');
							ngNotify.set('Instructions on how to reset your password have been sent to your email address');
						});
					} else {
						ngNotify.set('Error sending password reset email:' + error.message, 'warn');
					}
				});
			};

			var changeEmail = function(data) {
				ref.changeEmail({
					oldEmail: data.password.email,
					newEmail: data.newEmail,
					password: data.newEmailPassword
				}, function(error) {
					if (error === null) {
						ngNotify.set('Your email address has been updated');
						ref.child('users').child(data.uid).child('password').update({
							email: data.newEmail
						});
					} else {
						ngNotify.set('Error updating email address: ' + error.message, 'warn');
					}
				});
			};
			var changePassword = function(data) {
				ref.changePassword({
					email: data.password.email,
					oldPassword: data.currentPassword,
					newPassword: data.newPassword
				}, function(error) {
					if (error === null) {
						ngNotify.set('Your password has been updated');
					} else {
						ngNotify.set('Error updating your password:' + error.message, 'warn');
					}
				});
			};
			var logoutUser = function() {
				console.log('User logged out');
				$state.go('app.home');
				auth.$unauth();
				ngNotify.set('You are now logged out', 'success');
			};
			var getUser = function() {
				var user = ref.getAuth();
				// If no current user send to register page
				if (!user) {
					console.log('User is not registered');
					ngNotify.set('Create an account or login to access more features!');
					//$state.go('app.user.login');
					return;
				}

				console.log('User is logged in');
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
				}, function(error) {
					if (error) {
						ngNotify.set(error.message, 'error');

					} else {
						ngNotify.set('Dish added to your favourites.', 'success');
					}
				});
			};
			var removeFavourite = function($id) {
				ref.child('users/' + $rootScope.user.uid + '/favourites/' + $id).remove(function(error) {
					if (error) {
						ngNotify.set(error.message, 'error');
					} else {
						ngNotify.set('Dish removed from your favourites.', 'success');

					}
				});
			};

			var registerVote = function($id, vote) {
				ref.child('users/' + $rootScope.user.uid + '/ratings/' + $id).update({
					'vote': vote
				});

			};

			var changeCanteen = function(canteen) {
				ref.child('users/' + $rootScope.user.uid + '/canteen/').update({
					'name': canteen
				});

			};


			ref.onAuth(function() {
				$rootScope.user = getUser();
				Core.checkUser();


			});
			return {
				createUser: createUser,
				loginUser: loginUser,
				resetPassword: resetPassword,
				changeEmail: changeEmail,
				changePassword: changePassword,
				logoutUser: logoutUser,
				auth: auth,
				getUser: getUser,
				addFavourite: addFavourite,
				removeFavourite: removeFavourite,
				registerVote: registerVote,
				changeCanteen: changeCanteen
			};
		}
	]);