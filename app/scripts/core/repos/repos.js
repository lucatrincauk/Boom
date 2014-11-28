'use strict';

angular.module('Boom')

.factory('Users', function(Restangular) {
	return Restangular.service('api/users');
})

.factory('Categories', function($http) {
	return $http.get('test_data/document.json');
})

.factory('Single', function($http) {
	return $http.get('test_data/single.json');
})

.factory('Locations', function(Restangular) {
	return Restangular.service('api/locations');
});