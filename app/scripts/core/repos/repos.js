'use strict';

angular.module('Boom')

.factory('Users', function(Restangular) {
	return Restangular.service('api/users');
})

.factory('Categories', function($http) {
	return $http.get('test_data/document.json');
})

.factory('Single', function($http) {
	return $http.get('test_data/single.json');
})

.factory('Locations', function(Restangular) {
	return Restangular.service('api/locations');
})

.factory('Menu', ['$firebase', '$rootScope',
		function($firebase) {
			// create a reference to the Firebase where we will store our data
			//	var ref = new Firebase("https://mns-menu.firebaseio.com/menu/0");
			var ref = new Firebase("https://mns-menu.firebaseio.com/dishes").orderByChild("week").equalTo(1);
			// this uses AngularFire to create the synchronized array
			var sync = $firebase(ref);

			// ref.orderByChild("week").equalTo(1).on("child_added", function(snapshot) {
			// 	console.log(snapshot.val())
			// });
			return sync.$asArray();
		}
	])
	.factory('Categories', ['$firebase',
		function($firebase) {
			// create a reference to the Firebase where we will store our data
			//	var ref = new Firebase("https://mns-menu.firebaseio.com/menu/0");
			var ref = new Firebase("https://mns-menu.firebaseio.com/categories");
			// this uses AngularFire to create the synchronized array
			var sync = $firebase(ref);

			// ref.orderByChild("week").equalTo(1).on("child_added", function(snapshot) {
			// 	console.log(snapshot.val())
			// });
			return sync.$asArray();
		}
	]);