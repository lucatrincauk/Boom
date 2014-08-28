'use strict';

/**
 * @ngdoc function
 * @name menueappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the menueappApp
 */
angular.module('menueappApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
