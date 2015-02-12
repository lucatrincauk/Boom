'use strict';
angular.module('Boom')
	.factory('Users', ['$firebase', 'FirebaseUrl', '$state', '$firebaseAuth', '$rootScope', 'messageCenterService', '$timeout',
		function($firebase, FirebaseUrl, $state, $firebaseAuth, $rootScope, messageCenterService, $timeout) {
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
						messageCenterService.add('success', 'Account created successfully!', {
							status: messageCenterService.status.next,
							timeout: 3000
						});
						loginUser(data);
					} else {
						console.log('Error creating user:', error);
						$rootScope.$apply(function() {
							messageCenterService.add('danger', error.message, {
								timeout: 6000
							});
						});
					}
				});
			};
			var loginUser = function(data) {
				ref.authWithPassword({
					email: data.email,
					password: data.password
				}, function(error) {
					if (error) {
						$rootScope.$apply(function() {
							messageCenterService.add('warning', error.message, {
								timeout: 6000
							});
						});
					} else {
						$state.go('app.user.profile');
						messageCenterService.add('success', 'Logged in successfully!', {
							status: messageCenterService.status.next,
							timeout: 3000
						});
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
			var resetPassword = function(data) {
				ref.resetPassword({
					email: data.email
				}, function(error) {
					if (error === null) {
						$rootScope.$apply(function() {
							$state.go('app.user.login');

							messageCenterService.add('success', 'Password reset email sent successfully.', {
								timeout: 3000,
								status: messageCenterService.status.next,

							});
						});
					} else {
						$rootScope.$apply(function() {
							messageCenterService.add('danger', 'Error sending password reset email:' + error.message, {
								timeout: 6000
							});
						});
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
						$rootScope.$apply(function() {
							messageCenterService.add('success', 'Email address updated successfully.', {
								timeout: 3000
							});
						});
						ref.child('users').child(data.uid).child('password').update({
							email: data.newEmail
						});
					} else {
						$rootScope.$apply(function() {
							messageCenterService.add('danger', 'Error updating email address: ' + error.message, {
								timeout: 6000
							});
						});
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
						$rootScope.$apply(function() {
							messageCenterService.add('success', 'Password updated successfully.', {
								timeout: 3000
							});
						});
					} else {
						$rootScope.$apply(function() {
							messageCenterService.add('danger', 'Error updating password: ' + error.message, {
								timeout: 6000
							});
						});
					}
				});
			};
			var logoutUser = function() {
				console.log('user _ logged out');
				$state.go('app.home');
				auth.$unauth();
				messageCenterService.add('success', 'Logged out successfully!', {
					timeout: 3000
				});
			};
			var getUser = function() {
				var user = ref.getAuth();
				// If no current user send to register page
				if (!user) {
					console.log('__USER: not registered');
					$timeout(function() {
						messageCenterService.add('info', 'Create an account or login to access more features!', {
							timeout: 3000
						});
					});
					//$state.go('app.user.login');
					return;
				}

				console.log('__USER: logged in');
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
						$rootScope.$apply(function() {
							messageCenterService.add('danger', error.message, {
								timeout: 6000
							});
						});
					} else {
						$rootScope.$apply(function() {
							messageCenterService.add('success', 'Dish added to your favourites.', {
								timeout: 3000
							});
						});
					}
				});
			};
			var removeFavourite = function($id) {
				ref.child('users/' + $rootScope.user.uid + '/favourites/' + $id).remove(function(error) {
					if (error) {
						$rootScope.$apply(function() {
							messageCenterService.add('danger', error.message, {
								timeout: 6000
							});
						});
					} else {
						$rootScope.$apply(function() {
							messageCenterService.add('success', 'Dish removed from your favourites.', {
								timeout: 3000
							});
						});
					}
				});
			};
			ref.onAuth(function() {
				$rootScope.user = getUser();
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
				removeFavourite: removeFavourite
			};
		}
	]);