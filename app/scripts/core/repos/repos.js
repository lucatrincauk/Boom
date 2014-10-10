'use strict';

angular.module('Boom')

    .factory('Users', function(Restangular) {
        return Restangular.service('api/users');
    })

    .factory('Categories', function(Restangular) {
        return Restangular.service('api/categories');
    })

    .factory('Locations', function(Restangular) {
        return Restangular.service('api/locations');
    });