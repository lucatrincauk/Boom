/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Location = require('../api/location/location.model');
var Category = require('../api/category/category.model');

Category.remove(function() {});

Category.create({
   title: 'British',
   description: 'British home grown food',

   dishes: [{
       title: 'Beans on Toast',
       description: 'A fine meal for recent graduates.',
       calories: 100,

       images: [{
           file_path: 'images/beans-on-toast.jpg'
       }, {
           file_path: 'images/beans-on-toast-2.jpg'
       }],

       comments: [{
           title: 'Great!',
           description: 'Great food, filled me up.',
           star_rating: 7,
           user: null
       }]
   }, {
       title: 'Roast Beef Dinner',
       description: 'A traditional meal for sunday lunch.',
       calories: 500,
       images: [],
       comments: []
   }]
}, function() {});

Category.create({
   title: 'Indian',
   description: 'Food from the far east.',

   dishes: [{
       title: 'Lamb Rogan Josh',
       description: 'A medium spiced dish with fresh tomato and green peppers.',
       calories: 900,

       images: [{
           file_path: 'images/rogan-josh.jpg'
       },{
           file_path: 'images/rogan-josh-2.jpg'
       }],

       comments: [{
           title: 'Amazing!',
           description: 'Would eat again.',
           star_rating: 10,
           user: null
       }]
   }, {
       title: 'Chicken Korma',
       description: 'A very mild dish made with coconut and almonds.',
       calories: 850,

       images: [],

       comments: [{
           title: 'Disgusting',
           description: 'Made me really sick.',
           star_rating: 1,
           user: null
       }]
   }]
}, function() {});

Location.remove(function() {
    Location.create({
            name: 'Waterside',
            description: '7th floor canteen.',

            address: {
                address_1: 'Waterside House',
                address_2: '35 North Wharf Road',
                address_3: '',
                address_4: '',
                city: 'London',
                postcode: 'W2 1NW'
            },

            menus: [{
                serve_on: Date.now(),
                dishes: []
            }]
        }, {
            name: 'EBT',
            description: '1st floor canteen.',

            address: {
                address_1: '10 Eastbourne Terrace',
                address_2: '',
                address_3: '',
                address_4: '',
                city: 'London',
                postcode: 'W2 6LG'
            },

            menus: [{
                serve_on: '2014-10-01T12:27:16Z',
                dishes: [ ]
            },{
                serve_on: '2014-10-02T12:27:16Z',
                dishes: [ ]
            },{
                serve_on: '2014-10-03T12:27:16Z',
                dishes: [  ]
            }]
        }, function() { }
    );
});

User.remove(function() {
    User.create({
            firstname: 'Adam',
            lastname: 'Barrell',
            provider: 'local',
            email: 'test@test.com',
            password: 'test'
        }, {
            firstname: 'Joe',
            lastname: 'Bloggs',
            provider: 'local',
            role: 'admin',
            email: 'admin@admin.com',
            password: 'admin'
        }, function() { }
    );
});
