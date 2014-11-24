angular.module('Boom', ['ionic', 'ui.router', 'restangular', 'ionic.rating'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    /* Main container route
     * Renders as abstract so it can't be accessed directly
     * Content is encapsulated into slide-menu.html
     * Template probably needs a better name
     */
        .state('app', {
            url: '',
            abstract: true,
            templateUrl: 'templates/slide-menu.html'
        })
        /*
         * Home route
         * Displays a list of dishes
         * Default route
         */
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        })
        /*
         * Single page route
         * Display a single dish
         */
        .state('app.single', {
            url: '/dishes/:title',
            views: {
                'menuContent': {
                    templateUrl: 'templates/single.html',
                    controller: 'singleController'

                }
            }
        })
        /*
         * Settings page route
         * Display app settings
         */
        .state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'templates/settings.html'
                }
            }
        });

});