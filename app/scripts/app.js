angular.module('Boom', ['ui.router', 'ionic'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: '/templates/menu.html'
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: '/templates/home.html',
                controller: 'homeController'
            }
        }
    })
        .state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: '/templates/settings.html'
                }
            }
        })

    .state('app.dish', {
        url: '/dishes/:dishId',
        views: {
            'menuContent': {
                templateUrl: '/templates/dish.html',
                controller: 'dishController'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});