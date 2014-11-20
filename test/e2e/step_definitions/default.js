/* global browser */
'use strict';

var should = require('chai').should();

module.exports = function() {

    this.Given(/^True is true$/, function(next) {
        browser.get('/#waitthere');
        next();
    });

    this.Then(/^True should not be false$/, function(next) {
        true.should.equal(true);
        next();
    });
};