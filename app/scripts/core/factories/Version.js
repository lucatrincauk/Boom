'use strict';
angular.module('Boom')

.factory('Version', ['$firebase', 'FirebaseUrl',
	function($firebase, FirebaseUrl) {

		var ref = new Firebase(FirebaseUrl).child('version');

		var getVersion = function() {
			var sync = $firebase(ref);
			return sync.$asArray();
		};

		return {
			getVersion: getVersion			
		};
	}



]);