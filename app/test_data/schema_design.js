var users = [{
    _id: 1,
    first_name: 'Adam',
    last_name: 'Barrell',
    email: 'a.j.barrell@gmail.com',
    password: 'password',

    fav_dishes: [ 2, 3 ]
},{
    _id: 2,
    first_name: 'Joe',
    last_name: 'Bloggs',
    email: 'j.bloggs@gmail.com',
    password: 'password',

    fav_dishes: [ 1, 4 ]
}];

var locations = [{
    _id: 1,
    title: 'Waterside',
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
        _id: 1,
        serve_on: '2014-10-01T12:27:16Z',
        dishes: [ 1, 3, 4 ]
    },{
        _id: 2,
        serve_on: '2014-10-02T12:27:16Z',
        dishes: [ 1, 2, 3, 4 ]
    }
},{
    _id: 2,
    title: 'EBT',
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
        _id: 3,
        serve_on: '2014-10-01T12:27:16Z',
        dishes: [ 1, 3, 4 ]
    },{
        _id: 4,
        serve_on: '2014-10-02T12:27:16Z',
        dishes: [ 1, 2 ]
    },{
        _id: 5,
        serve_on: '2014-10-03T12:27:16Z',
        dishes: [ 1 ]
    }]
}];

var categories = [{
    _id: 1,
    title: 'British',
    description: 'British home grown food',

    dishes: [{
        _id: 1,
        title: 'Beans on Toast',
        description: 'A fine meal for recent graduates.',
        calories: 100,

        images: [{
            _id: 1,
            file_path: 'images/beans-on-toast.jpg'
        },{
            _id: 2,
            file_path: 'images/beans-on-toast-2.jpg'
        }],

        comments: [{
            _id: 1,
            title: 'Great!',
            description: 'Great food, filled me up.',
            rating: 7,
            user: 1
        }]
    }, {
        _id: 2,
        title: 'Roast Beef Dinner',
        description: 'A traditional meal for sunday lunch.',
        calories: 500,

        images: [],
        comments: []
    }]
},{
    _id: 2,
    title: 'Indian',
    description: 'Food from the far east.',

    dishes: [{
        _id: 3,
        title: 'Lamb Rogan Josh',
        description: 'A medium spiced dish with fresh tomato and green peppers.',
        calories: 900,

        images: [{
            _id: 3,
            file_path: 'images/rogan-josh.jpg'
        },{
            _id: 4,
            file_path: 'images/rogan-josh-2.jpg'
        }],

        comments: [{
            _id: 2,
            title: 'Amazing!',
            description: 'Would eat again.',
            rating: 10,
            user: 1
        }]
    }, {
        _id: 4,
        title: 'Chicken Korma',
        description: 'A very mild dish made with coconut and almonds.',
        calories: 850,

        images: [],

        comments: [{
            _id: 3,
            title: 'Disgusting',
            description: 'Made me really sick.',
            rating: 1,
            user: 2
        }]
    }]
}];