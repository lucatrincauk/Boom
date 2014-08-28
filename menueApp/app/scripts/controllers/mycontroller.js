'use strict';

/**
 * @ngdoc function
 * @name menueAppApp.controller:MycontrollerCtrl
 * @description
 * # MycontrollerCtrl
 * Controller of the menueAppApp
 */
angular.module('menueAppApp')
  .controller('MycontrollerCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
