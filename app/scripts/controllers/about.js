'use strict';

/**
 * @ngdoc function
 * @name boomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the boomApp
 */
angular.module('boomApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
