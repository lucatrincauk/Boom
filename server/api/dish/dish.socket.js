/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dish = require('./dish.model');

exports.register = function(socket) {
  Dish.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dish.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dish:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dish:remove', doc);
}