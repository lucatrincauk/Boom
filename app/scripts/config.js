'use strict';

 angular.module('config', [])

.constant('ENV', {
  'name': 'production',
  'apiEndpoint': 'http://dev.yoursite.com:10000/'
});
