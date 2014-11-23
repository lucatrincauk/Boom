'use strict';

angular.module('Boom').filter('dashify', function() {
	return function(item) {
		return item.replace(/\s+/g, '-').toLowerCase();
	};
});