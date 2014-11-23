angular.module('Boom', ['ionic', 'ui.router', 'restangular', 'ionic.rating'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('app', {
        url: '',
        abstract: true,
        templateUrl: 'templates/slide-menu.html'
    })

    .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.single', {
            url: '/dishes/:title',
            views: {
                'menuContent': {
                    templateUrl: 'templates/single.html',
                    controller: 'singleController'

                }
            }
        })

    .state('app.settings', {
        url: '/settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/settings.html'
            }
        }
    });

});