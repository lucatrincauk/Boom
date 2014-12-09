'use strict';
angular.module('Boom')

.factory('Dishes', ['$firebase', 'FirebaseUrl',
	function($firebase, FirebaseUrl) {

		var weekCycle = function() {
			Date.prototype.getWeek = function() {
				var onejan = new Date(this.getFullYear(), 0, 1);
				return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
			};
			var today = new Date();
			var weekYear = today.getWeek();

			var menuNo = weekYear % 4;

			switch (menuNo) {
				case 1:
					menuNo = '1';
					break;
				case 2:
					menuNo = '2';
					break;
				case 3:
					menuNo = '3';
					break;
				case 0:
					menuNo = '4';
					break;
			}

			return menuNo;
		};

		var ref = new Firebase(FirebaseUrl).child('dishes');

		var getAll = function() {
			var sync = $firebase(ref);
			return sync.$asArray();
		};
		var getWeekly = function() {
			var ref = new Firebase(FirebaseUrl).child('dishes').orderByChild('week').equalTo(weekCycle());
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
					images: data.images || '',
					slug: data.slug || '',
					thumb: data.thumb || '',
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