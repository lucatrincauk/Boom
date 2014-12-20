'use strict';
angular.module('Boom')

.factory('Core',
	function() {


		// get today's date and make it start on Monday
		var day = new Date().getDay() - 1,
			// bootstrapping canteen to WS
			canteenName = 'Waterside',
			cycle;

		// Setting SUN at the end of the week
		if (day === -1) {
			day = 6;
		}
		/*
		 * Gets current week number
		 * Week starts on Saturday
		 * This will show the next week menu already on Saturday
		 * e.g.Fri Dec 12 / 2014 is Day 346 and Week 50(cycle 2)
		 * e.g. Sat Dec 13/2014 is Day 347 and Week 51 (cycle 3)
		 * The script will go up to 53 weeks
		 * which is fine as 53 % 4 is the same as 1 % 4 (equals to cycle 1)
		 */
		var getWeek = function() {
			Date.prototype.getWeek = function() {
				/* 
				 * Get the full 1st day of the year
				 * e.g. Wed Jan 01 2014 00:00:00 GMT+0000 (GMT)
				 */
				var onejan = new Date(this.getFullYear(), 0, 1);
				/*
				 * returns (today's date - first day of the year) / 86400000 which is the milliseconds in one day) = current day number
				 * then, (current day number + include days of the first week) / 7 = total number of weeks
				 */
				return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
			};
			return new Date().getWeek();
		};
		var weeks = ['one', 'two', 'three', 'four'];
		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


		/*
		 * Gets current cycle
		 * Menus are split in cycles of 4, repeating across the year
		 * Getting the week number and using the modulus operator
		 * E.g. 51 % 4 = 3
		 * Cycle can be compared against this table: https://confluence.devops.mnscorp.net/display/SE/JSON+Menu
		 * MSQ is 2 weeks behind, so when WS is on Cycle 4, MSQ is on Cycle 2
		 * Cycle is required to show the current week's menu
		 */
		var getCycle = function(name) {
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
			// cycle = 1


			if (name) {
				cycle = weeks[cycle - 1];
			}
			return cycle;
		};

		var isClosed = function() {
			/*
			 * if day is ahead of Friday (4)
			 * set it as true
			 */
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
			week: getWeek,
			weeks: weeks,
			days: days

		};
	}


);