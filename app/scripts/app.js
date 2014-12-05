'use strict';
angular.module('Boom', ['ionic', 'ui.router', 'firebase'])

.constant('FirebaseUrl', 'https://mns-menu.firebaseio.com/')
    .config(function($httpProvider) {
        $httpProvider.interceptors.push(function($rootScope) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show');
                    return config;
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide');
                    return response;
                }
            };
        });
    })

.run(function($rootScope, $ionicLoading) {
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('app', {
            url: '',
            abstract: true,
            views: {
                'footer': {
                    templateUrl: 'templates/footer.html'
                },
                'slideMenu': {
                    templateUrl: 'templates/slide-menu.html'
                }
            }
        })
        .state('app.home', {
            url: '/',
            views: {
                'index@': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.settings', {
            url: '/settings',
            views: {
                'index@': {
                    templateUrl: 'templates/settings.html'
                }
            }
        })
        .state('app.favourites', {
            url: '/favourites',
            views: {
                'index@': {
                    templateUrl: 'templates/favourites.html'
                }
            }
        })
        .state('app.admin', {
            url: '/admin',
            views: {
                'index@': {
                    templateUrl: 'templates/admin.html',
                    controller: 'adminController'
                }
            }
        })
        .state('app.admin.dishes.add', {
            url: '/dishes/add',
            views: {
                'index@': {
                    templateUrl: 'templates/dish-add.html',
                    controller: 'adminController'

                }
            }
        })
        .state('app.admin.dishes', {
            url: '/dishes',
            views: {
                'index@': {
                    templateUrl: 'templates/admin-dishes.html',
                    controller: 'adminController'

                }
            }
        })
        .state('app.admin.dishes.edit', {
            url: '/edit/:id',
            views: {
                'index@': {
                    templateUrl: 'templates/dish-add.html',
                    controller: 'adminController'

                }
            }
        })
        .state('app.dish', {
            url: '/dishes/:id',
            views: {
                'index@': {
                    templateUrl: 'templates/single.html',
                    controller: 'singleController'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});