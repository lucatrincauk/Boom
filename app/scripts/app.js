angular.module('Boom', ['ionic', 'ui.router', 'restangular', 'ionic.rating'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    //     .state('container', {
    //         url: '/',
    //         views: {
    //             '': {
    //                 templateUrl: 'templates/home.html',
    //                 controller: 'homeController'
    //             },
    //             'slideMenu@': {
    //                 templateUrl: 'templates/slide-menu.html',
    //                 controller: 'slideMenuController'
    //             },
    //             'header@': {
    //                 templateUrl: 'templates/header.html',
    //                 controller: 'headerController'
    //             },
    //             'subheader@': {
    //                 templateUrl: 'templates/subheader.html'
    //             }
    //         }
    //     });


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

    .state('app.settings', {
        url: '/settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/settings.html'
            }
        }
    });

});