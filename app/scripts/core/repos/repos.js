'use strict';

angular.module('Boom')

.factory('Dishes', ['$firebase',
	function($firebase) {
		return {
			getAll: function() {
				var ref = new Firebase('https://mns-menu.firebaseio.com/dishes').orderByChild('week').equalTo(1);
				var sync = $firebase(ref);
				return sync.$asArray();

			},
			getOne: function(dishId) {
				var ref = new Firebase('https://mns-menu.firebaseio.com/dishes/' + dishId);
				var sync = $firebase(ref);

				return sync.$asObject();
			}
		};

	}
])

.factory('Categories', ['$firebase',
	function($firebase) {

		var ref = new Firebase('https://mns-menu.firebaseio.com/categories');
		var sync = $firebase(ref);
		return sync.$asArray();
	}
]);