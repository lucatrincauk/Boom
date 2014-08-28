'use strict';

describe('Controller: ControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('menueAppApp'));

  var ControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ControllerCtrl = $controller('ControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
