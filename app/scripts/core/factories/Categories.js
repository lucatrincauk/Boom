'use strict';
angular.module('Boom')

.factory('Categories', ['$firebase', 'FirebaseUrl',
	function($firebase, FirebaseUrl) {

		var ref = new Firebase(FirebaseUrl).child('categories').orderByChild('priority');
		var sync = $firebase(ref);
		return sync.$asArray();
	}
]);