'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://localhost/restaurant-app-dev'
      uri: 'mongodb://hungry-horse:password@ds063779.mongolab.com:63779/mns-menu-app'
  },

  seedDB: true
};
