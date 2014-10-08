'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CarSchema = new Schema({
    model: String,
    colour: String,
    mpg: Number,
    sold: Boolean
});

module.exports = mongoose.model('Car', CarSchema);