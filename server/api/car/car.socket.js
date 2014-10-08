/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Car = require('./car.model');

exports.register = function(socket) {
  Car.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Car.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('car:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('car:remove', doc);
}