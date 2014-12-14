'use strict';
angular.module('Boom')

.factory('Core',
	function() {


		// get today's date and remove sunday
		var day = new Date().getDay() - 1,
			canteenName = 'Waterside',
			cycle;

		// Setting SUN at the end of the week
		if (day === -1) {
			day = 6;
		}

		var getWeek = function() {
			Date.prototype.getWeek = function() {
				var onejan = new Date(this.getFullYear(), 0, 1);
				return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
			};
			return new Date().getWeek();
		};
		var getCycle = function() {
			if (canteenName === 'Waterside') {
				switch (getWeek() % 4) {
					case 0:
						cycle = '4';
						break;
					case 1:
						cycle = '1';
						break;
					case 2:
						cycle = '2';
						break;
					case 3:
						cycle = '3';
						break;
				}
			} else if (canteenName === 'Merchant Square') {
				switch (getWeek % 4) {
					case 0:
						cycle = '2';
						break;
					case 1:
						cycle = '3';
						break;
					case 2:
						cycle = '4';
						break;
					case 3:
						cycle = '1';
						break;
				}
			}

			return cycle;
		};

		var isClosed = function() {

			if (day > 4) {
				return true;
			} else {
				return false;

			}
		};


		return {
			day: day,
			canteenName: canteenName,
			isClosed: isClosed,
			cycle: getCycle,
			week: getWeek

		};
	}


);