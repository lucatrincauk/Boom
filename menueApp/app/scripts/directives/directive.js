'use strict';

/**
 * @ngdoc directive
 * @name menueAppApp.directive:directive
 * @description
 * # directive
 */
angular.module('menueAppApp')
  .directive('directive', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the directive directive');
      }
    };
  });
