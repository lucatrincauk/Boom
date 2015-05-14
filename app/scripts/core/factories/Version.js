'use strict';
angular.module('Boom')

.factory('Version', ['$firebase', 'FirebaseUrl',
	function($firebase, FirebaseUrl) {

		var ref = new Firebase(FirebaseUrl).child('version').child('id');



		var getVersion = function() {
			var sync = $firebase(ref);
			return sync.$asObject();
		};

		return {
			getVersion: getVersion			
		};
	}



]);