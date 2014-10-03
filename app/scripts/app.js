angular.module('Boom', ['ionic', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('container', {
            url: '/',
            views: {
                'header@': {
                    templateUrl: 'templates/header.html',

                },
                'home@': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        });
});