'use strict';

/**
 * @ngdoc filter
 * @name menueAppApp.filter:filter
 * @function
 * @description
 * # filter
 * Filter in the menueAppApp.
 */
angular.module('menueAppApp')
  .filter('filter', function () {
    return function (input) {
      return 'filter filter: ' + input;
    };
  });
