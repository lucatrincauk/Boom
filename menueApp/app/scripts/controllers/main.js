'use strict';

/**
 * @ngdoc function
 * @name menueappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the menueappApp
 */
angular.module('menueappApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
