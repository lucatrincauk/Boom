'use strict';

var _ = require('lodash');
var Dish = require('./dish.model');

// Get list of dishs
exports.index = function(req, res) {
  Dish.find(function (err, dishs) {
    if(err) { return handleError(res, err); }
    return res.json(200, dishs);
  });
};

// Get a single dish
exports.show = function(req, res) {
  Dish.findById(req.params.id, function (err, dish) {
    if(err) { return handleError(res, err); }
    if(!dish) { return res.send(404); }
    return res.json(dish);
  });
};

// Creates a new dish in the DB.
exports.create = function(req, res) {
  Dish.create(req.body, function(err, dish) {
    if(err) { return handleError(res, err); }
    return res.json(201, dish);
  });
};

// Updates an existing dish in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dish.findById(req.params.id, function (err, dish) {
    if (err) { return handleError(res, err); }
    if(!dish) { return res.send(404); }
    var updated = _.merge(dish, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dish);
    });
  });
};

// Deletes a dish from the DB.
exports.destroy = function(req, res) {
  Dish.findById(req.params.id, function (err, dish) {
    if(err) { return handleError(res, err); }
    if(!dish) { return res.send(404); }
    dish.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}