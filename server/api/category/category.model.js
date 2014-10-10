'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    title: String,
    description: String,

    dishes: [{
        title: String,
        description: String,
        calories: Number,

        images: [{
            file_path: String
        }],

        comments: [{
            title: String,
            description: String,
            rating: Number,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
    }]
});

module.exports = mongoose.model('Category', CategorySchema);