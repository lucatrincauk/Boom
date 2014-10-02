'use strict';

describe('Dish Search', function() {

    browser.get('/');

    it('should automatically redirect to a hash url.', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/#");
    });


    /*describe('view1', function() {

        beforeEach(function() {
            browser.get('index.html#/view1');
        });


        it('should render view1 when user navigates to /view1', function() {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for view 1/);
        });

    });


    describe('view2', function() {

        beforeEach(function() {
            browser.get('index.html#/view2');
        });


        it('should render view2 when user navigates to /view2', function() {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for view 2/);
        });

    });*/
});