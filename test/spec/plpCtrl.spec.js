'use strict';

describe('Controller: plpCtrl', function () {

    // load the controller's module
    beforeEach(module('boom.plp'));
    beforeEach(module('boom.repositories'));

    var plpCtrl,
        categoryRepository,
        scope;

    var dummyCategories =
    {
        data: [
            {
                "id": 1,
                "name": "Vegetarian"
            },
            {
                "id": 2,
                "name": "Meat"
            }
        ]
    };

    /**
     * Stub the return value of the all() method.
     */
    beforeEach(inject(function(_categoryRepository_, $q) {
        categoryRepository = _categoryRepository_;
        var deferred = $q.defer();
        deferred.resolve(dummyCategories);
        sinon.stub(categoryRepository, 'all').returns(deferred.promise);
    }));

    /**
     * Initialize the controller and a mock scope
     */
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        plpCtrl = $controller('plpCtrl', {
            $scope: scope
        });
    }));

    it('should have an array of categories.', function () {
        scope.categories.should.be.a('array');
    });

    it('should have called the all() method from category repository.', function () {
        categoryRepository.all.called.should.be.true;
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
        categoryRepository.all.restore();
    });

});