'use strict';
angular.module('Boom')

.factory('Reports', ['$firebase', 'FirebaseUrl',
	function($firebase, FirebaseUrl) {

		var ref = new Firebase(FirebaseUrl).child('reports');

		var getAll = function() {
			var sync = $firebase(ref);
			return sync.$asArray();
		};

		var getOne = function(id) {
			var refSingle = ref.child(id);
			var sync = $firebase(refSingle);

			return sync.$asObject();
		};

		var saveCategory = function(data) {
			ref.child(data.id).update({
					title: data.title || '',
					priority: data.priority || 0

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
		var removeCategory = function(data) {
			ref.child(data).remove();
		};

		return {
			getAll: getAll,
			getOne: getOne,
			saveCategory: saveCategory,
			removeCategory: removeCategory
		};
	}



]);