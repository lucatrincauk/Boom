'use strict';
angular.module('Boom')

.factory('Categories', ['$firebase',
    function($firebase) {

        var ref = new Firebase('https://mns-menu.firebaseio.com/categories');
        var sync = $firebase(ref);
        return sync.$asArray();
    }
]);