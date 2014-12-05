'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: String,
    description: String,
    address: {
        address_1: String,
        address_2: String,
        address_3: String,
        address_4: String,
        city: String,
        postcode: String
    },
    menus: [{
        serve_on: { type: Date },
        dishes: [{
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        }]
    }]
});

module.exports = mongoose.model('Location', LocationSchema);