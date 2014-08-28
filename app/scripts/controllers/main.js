'use strict';

/**
 * @ngdoc function
 * @name boomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the boomApp
 */
angular.module('boomApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
