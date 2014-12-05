'use strict';
angular.module('Boom')

.factory('Dishes', ['$firebase',
	function($firebase) {

		var ref = new Firebase('https://mns-menu.firebaseio.com/dishes');

		var getAll = function() {
			ref.orderByChild('week').equalTo('1');
			var sync = $firebase(ref);
			return sync.$asArray();
		};

		var getOne = function(dishId) {
			var refSingle = ref.child(dishId);
			var sync = $firebase(refSingle);

			return sync.$asObject();
		};

		var saveDish = function(data) {
			ref.child(data.id).update(data);
		};

		return {
			getAll: getAll,
			getOne: getOne,
			saveDish: saveDish
		};

	}
]);