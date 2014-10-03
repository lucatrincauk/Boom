/* global sinon */
'use strict';

describe('Controller: headerController', function() {

    // load the controller's module
    beforeEach(module('Boom'));

    var $rootScope, scope;

    /**
     * Initialize the controller and a mock scope
     */
    beforeEach(inject(function($controller, _$rootScope_) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        sinon.spy($rootScope, '$broadcast');

        $controller('headerController', {
            $scope: scope
        });
    }));

    it('should have a search object.', function() {
        scope.search.should.be.an('object');
    });

    it('should have a search object that can store search text.', function() {
        scope.search.should.have.property('text');
    });

    it('should broadcast search text once letters have been typed.', function() {
        // Run a digest cycle so $watch can evaluate scope
        scope.$digest();

        // Apply changes to scope
        scope.$apply(function() {
            scope.search.text = 'some text';
        });

        // Ensure scope bindings are updated
        $rootScope.$broadcast.calledWith('search-updated', { text: 'some text' }).should.equal(true);
    });

});