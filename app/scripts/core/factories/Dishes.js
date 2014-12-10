'use strict';
angular.module('Boom')

.factory('Dishes', ['$firebase', 'FirebaseUrl', '$rootScope',
	function($firebase, FirebaseUrl, $rootScope) {



		var ref = new Firebase(FirebaseUrl).child('dishes');

		var getAll = function() {
			var sync = $firebase(ref);
			return sync.$asArray();
		};
		var getWeekly = function() {
			var ref = new Firebase(FirebaseUrl).child('dishes').orderByChild('week').equalTo($rootScope.cycle);
			var sync = $firebase(ref);
			return sync.$asArray();
		};
		var getOne = function(dishId) {
			var refSingle = ref.child(dishId);
			var sync = $firebase(refSingle);

			return sync.$asObject();
		};

		var saveDish = function(data) {
			debugger;
			ref.child(data.id).update({
					category: data.category || '',
					day: data.day || '',
					id: data.id || '',
					images: data.images || 'http://placehold.it/375x375&text=default+image',
					slug: data.slug || '',
					thumb: data.thumb || 'http://placehold.it/375x113&text=default+image',
					week: data.week || '',
					title: data.title || '',
					with: data.with || '',
					addons: data.addons || ''
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
			getWeekly: getWeekly,
			getOne: getOne,
			saveDish: saveDish,
		};

	}
]);