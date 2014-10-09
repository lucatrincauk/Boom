angular.module('Boom', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('base', {
            url: '',
            views: {
                'header@': {
                    templateUrl: 'templates/header.html',
                }
            }
        })
        .state('base.home', {
            url: '/',
            views: {
                'main@': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        })
        .state('base.dish', {
            url: '/dish/:id',
            views: {
                'main@': {
                    templateUrl: 'templates/dish.html',
                    controller: 'dishController'
                }
            }
        });
});