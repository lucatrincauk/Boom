'use strict';

angular.module('Boom').filter('undashify', function() {
	/* Transform spaces into dashes
	 * In use for the Dish title URL
	 * E.g. /sausage-with-mash/
	 */
	return function(item) {
		// prevent undefined while running filters for the first time
		if (!item || !item.length) {
			return;
		}
		return item.replace(/-/g, ' ').toLowerCase();
	};
});