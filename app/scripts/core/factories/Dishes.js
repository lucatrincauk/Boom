'use strict';
angular.module('Boom')

.factory('Dishes', ['$firebase', 'FirebaseUrl',
	function($firebase, FirebaseUrl) {

		var ref = new Firebase(FirebaseUrl).child('dishes');

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
			ref.child(data.$id).update({
					category: data.category,
					day: data.day,
					id: data.id,
					images: data.images,
					slug: data.slug,
					thumb: data.thumb,
					week: data.week
				},
				function(error) {
					if (error) {
						console.log('Data could not be saved.' + error);
					} else {
						console.log('Data saved successfully.');
					}
				}
			);
		};

		return {
			getAll: getAll,
			getOne: getOne,
			saveDish: saveDish
		};

	}
]);