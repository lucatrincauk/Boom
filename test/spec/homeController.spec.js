/* global sinon */
'use strict';

describe('Controller: homeController', function() {

    // load the controller's module
    beforeEach(module('Boom'));

    var homeController,
        Categories,
        scope;

    var dummyCategories = {
        data: [{
            'id': 1,
            'name': 'Vegetarian'
        }, {
            'id': 2,
            'name': 'Meat'
        }]
    };

    /**
     * Stub the return value of the all() method.
     */
    beforeEach(inject(function(_Categories_, $q) {
        Categories = _Categories_;
        var deferred = $q.defer();
        deferred.resolve(dummyCategories);
        sinon.stub(Categories, 'all').returns(deferred.promise);
    }));

    /**
     * Initialize the controller and a mock scope
     */
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        homeController = $controller('homeController', {
            $scope: scope
        });
    }));

    it('should have an array of categories.', function() {
        scope.categories.should.be.a('array');
    });

    it('should have called the all() method from category repository.', function() {
        Categories.all.called.should.be.true;
    });

    it('should populate the categories array with data.', function() {
        // Fires then() callbacks since we are outside angular environment
        scope.$root.$digest();
        scope.categories.should.equal(dummyCategories.data);
    });

    /**
     * Cleanup stubbed methods.
     */
    afterEach(function() {
        Categories.all.restore();
    });

});