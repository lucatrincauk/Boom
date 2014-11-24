'use strict';

angular.module('Boom').filter('dashify', function() {
	/* Transform spaces into dashes
	 * In use for the Dish title URL
	 * E.g. /sausage-with-mash/
	 */
	return function(item) {
		return item.replace(/\s+/g, '-').toLowerCase();
	};
});