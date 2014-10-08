'use strict';

var _ = require('lodash');
var Car = require('./car.model');

// Get list of cars (HTTP GET api/cars)
exports.index = function(req, res) {
    Car.find(function (err, cars) {

        if (err) {
            return handleError(res, err);
        }

        return res.json(200, cars);
    });
};

// Get a single car (HTTP GET api/cars/n83ns883n828hd9hhd)
exports.show = function(req, res) {
    Car.findById(req.params.id, function (err, car) {

        if (err) {
            return handleError(res, err);
        }

        if (!car) {
            return res.send(404);
        }

        return res.json(car);
    });
};

// Creates a new car in the DB. (HTTP POST api/cars/n83ns883n828hd9hhd)
exports.create = function(req, res) {
    Car.create(req.body, function(err, car) {

        if (err) {
            return handleError(res, err);
        }

        return res.json(201, car);
    });
};

// Updates an existing car in the DB. (HTTP PUT api/cars/n83ns883n828hd9hhd)
exports.update = function(req, res) {

    if (req.body._id) {
        delete req.body._id;
    }

    Car.findById(req.params.id, function (err, car) {
        if (err) {
            return handleError(res, err);
        }

        if (!car) {
            return res.send(404);
        }

        var updated = _.merge(car, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(200, car);
        });
    });
};

// Deletes a car from the DB.
exports.destroy = function(req, res) {
    Car.findById(req.params.id, function (err, car) {

        if (err) {
            return handleError(res, err);
        }

        if (!car) {
            return res.send(404);
        }

        car.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }

            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}