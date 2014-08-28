'use strict';

/**
 * @ngdoc function
 * @name menueAppApp.controller:ControllerCtrl
 * @description
 * # ControllerCtrl
 * Controller of the menueAppApp
 */
angular.module('menueAppApp')
  .controller('ControllerCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
