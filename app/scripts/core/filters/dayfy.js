'use strict';

angular.module('Boom').filter('dayfy', ['$rootScope', function($rootScope) {
	/* Transform numbers into days
	 * E.g. 0 > Monday
	 */

	var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
		dayName;


	return function(activeDay) {
		// prevent undefined while running filters for the first time
		if (!activeDay || !activeDay.length) {
			return;
		}
		switch ($rootScope.day - activeDay) {
			// If view is same as current day, set it as Today
			case 0:
				dayName = 'Today';
				break;
				// If view is 1 day behind current day, set it as Yesterday
			case -1:
				dayName = 'Tomorrow';
				break;
				// If view is 1 day ahead current day, set it as Tomorrow
			case 1:
				dayName = 'Yesterday';
				break;
				// Otherwise retrieve day's name
			default:
				dayName = days[activeDay];
		}
		return dayName;
	};
}]);