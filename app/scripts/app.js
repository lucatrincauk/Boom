angular.module('Boom', ['ui.router', 'ionic'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';
    $stateProvider

    .state('app', {
        url: '',
        abstract: true,
        views: {
            'header': {
                templateUrl: '/templates/menu.html'
            },
            'footer': {
                templateUrl: '/templates/footer.html'
            }
        }
    })

    .state('app.home', {
        url: '/',
        views: {
            'container@': {
                templateUrl: '/templates/home.html',
                controller: 'homeController'
            }
        }
    })
        .state('app.settings', {
            url: '/settings',
            views: {
                'container@': {
                    templateUrl: '/templates/settings.html'
                }
            }
        })
        .state('app.favourites', {
            url: '/favourites',
            views: {
                'container@': {
                    templateUrl: '/templates/favourites.html'
                }
            }
        })
        .state('app.admin', {
            url: '/admin',
            views: {
                'container@': {
                    templateUrl: '/templates/admin.html'
                }
            }
        })

    .state('app.dish', {
        url: '/dishes/:dishId',
        views: {
            'container@': {
                templateUrl: '/templates/dish.html',
                controller: 'dishController'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});