angular.module('Boom', ['ionic', 'ui.router', 'restangular', 'ionic.rating'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    $stateProvider

    .state('app', {
        url: '',
        abstract: true,
        views: {
            'header': {
                templateUrl: '/templates/header.html'
            },
            'footer': {
                templateUrl: '/templates/footer.html'
            },
            'slideMenu': {
                templateUrl: '/templates/slide-menu.html'
            }
        }
    })
    .state('app.home', {
        url: '/',
        views: {
            '@': {
                templateUrl: '/templates/home.html',
                controller: 'homeController'
            },
            'subheader@': {
                templateUrl: '/templates/subheader.html'
            }
        }
    })
    .state('app.settings', {
        url: '/settings',
        views: {
            '@': {
                templateUrl: '/templates/settings.html'
            }
        }
    })
    .state('app.favourites', {
        url: '/favourites',
        views: {
            '@': {
                templateUrl: '/templates/favourites.html'
            }
        }
    })
    .state('app.admin', {
        url: '/admin',
        views: {
            '@': {
                templateUrl: '/templates/admin.html'
            }
        }
    })
    .state('app.dish', {
        url: '/dishes/:title',
        views: {
            '@': {
                templateUrl: '/templates/single.html',
                controller: 'singleController'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});