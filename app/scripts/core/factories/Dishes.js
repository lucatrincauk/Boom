'use strict';
angular.module('Boom')

.factory('Dishes', ['$firebase', 'FirebaseUrl', 'Core',
	function($firebase, FirebaseUrl, Core) {

		var ref = new Firebase(FirebaseUrl).child('dishes');

		var getAll = function() {
			var sync = $firebase(ref);
			return sync.$asArray();
		};
		var getWeekly = function() {
			var ref = new Firebase(FirebaseUrl).child('dishes').orderByChild('p0').equalTo(true);
			var sync = $firebase(ref);
			console.log(sync.$asArray());
			return sync.$asArray();
		};
		var getOne = function(dishId) {
			var refSingle = ref.child(dishId);
			var sync = $firebase(refSingle);

			return sync.$asObject();
		};

		var removeDish = function(data) {
			ref.child(data).remove();
		};

		return {
			getAll: getAll,
			getWeekly: getWeekly,
			getOne: getOne,
			removeDish: removeDish
		};

	}

]);