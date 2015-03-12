'use strict';

angular.module('Boom').filter('dayfy', ['$rootScope', 'Core', function($rootScope, Core) {
	/* Transform numbers into days
	 * E.g. 0 > Monday
	 */

	var dayName;



	return function(activeDay, originalDay) {
		// return name of the day not related to the active view
		// e.g. not 'Today', but 'Monday'
		if (originalDay) {
			dayName = Core.days[activeDay];
		} else {

			switch (Core.day - activeDay) {
				// If view is same as current day, set it as Today
				case 0:
					dayName = 'Today';
					break;
					// If view is 1 day behind current day, set it as Yesterday
				case -1:
					dayName = 'Tomorrow';
					break;
					// If the day is Sunday (6), the current view is set to Monday, so set it as Tomorrow		
				case 6:
					dayName = 'Tomorrow';
					break;
					// If view is 1 day ahead current day, set it as Tomorrow
				case 1:
					dayName = 'Yesterday';
					break;
					// Otherwise retrieve day's name
				default:
				 	if (activeDay == -1) {
				 		dayName = Core.days[6];
				 	} else {
						dayName = Core.days[activeDay];
				 	}
			}
		}

		return dayName;
	};
}]);