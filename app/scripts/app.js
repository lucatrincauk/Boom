angular.module('Boom', ['ionic', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('container', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                },
                'slideMenu@': {
                    templateUrl: 'templates/slide-menu.html',
                    controller: 'slideMenuController'
                },
                'header@': {
                    templateUrl: 'templates/header.html',
                    controller: 'headerController'
                }
            }
        });
});