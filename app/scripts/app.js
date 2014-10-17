angular.module('Boom', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('container', {
            url: '/',
            views: {
                'header@': {
                    templateUrl: 'views/header.html',

                },
                'home@': {
                    templateUrl: 'views/home.html',
                    controller: 'homeController'
                }
            }
        });
});