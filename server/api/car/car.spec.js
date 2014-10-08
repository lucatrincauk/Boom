'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/cars', function() {

    it('should respond with JSON array', function(done) {
        request(app)
            .get('/api/cars')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                /*res.should.be.json;
                res.should.have.status(201);
                res.should.have.header('Content-Length', '15');
                res.body.should.deep.equal({name: 'tobi'});*/
                done();
            });
    });
});