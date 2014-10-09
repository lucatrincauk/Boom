'use strict';

angular.module('Boom')

    .factory('Users', function(Restangular) {
        return Restangular.service('api/users');
    })

    .factory('Cars', function(Restangular) {
        return Restangular.service('api/cars');
    })

    .factory('Things', function(Restangular) {
        return Restangular.service('api/things');
    });