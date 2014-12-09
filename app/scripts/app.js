'use strict';
angular.module('Boom', ['ionic', 'ui.router', 'firebase'])
    .run(function($rootScope) {
        // get today's date and remove sunday
        $rootScope.day = new Date().getDay() - 1;
        $rootScope.canteenName = 'Waterside';
    })
    //set Firebase Url
    .constant('FirebaseUrl', 'https://mns-menu.firebaseio.com/')
    .config(function($httpProvider) {
        // intercept loading for XHR and show veil until done
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
    // show veil when xhr starts
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
    });
    // remove veil when done
    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    // app
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
        // app.home
        .state('app.home', {
            url: '/',
            views: {
                'index@': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            },
            resolve: {
                dishes: function(Dishes) {
                    return Dishes.getWeekly();
                },
                categories: function(Categories) {
                    return Categories;
                }
            }
        })
        // app.settings
        .state('app.settings', {
            url: '/settings',
            views: {
                'index@': {
                    templateUrl: 'templates/settings.html'
                }
            }
        })
        // app.favourites
        .state('app.favourites', {
            url: '/favourites',
            views: {
                'index@': {
                    templateUrl: 'templates/favourites.html'
                }
            }
        })
        // app.admin 
        .state('app.admin', {
            url: '/admin',
            views: {
                'index@': {
                    templateUrl: 'templates/admin.html'
                }
            }
        })
        .state('app.admin.dishes', {
            url: '/dishes',
            views: {
                'index@': {
                    templateUrl: 'templates/admin-dishes.html',
                    controller: 'adminDishesController'

                }
            },
            resolve: {
                dishes: function(Dishes) {
                    return Dishes.getAll();
                },
                categories: function(Categories) {
                    return Categories;
                }
            }
        })
        .state('app.admin.dishes.add', {
            url: '/add',
            views: {
                'index@': {
                    templateUrl: 'templates/admin-dishes-add.html',
                    controller: 'adminAddDishController'

                }
            },
            resolve: {
                categories: function(Categories) {
                    return Categories;
                }
            }
        })
        .state('app.admin.dishes.edit', {
            url: '/edit/:id',
            views: {
                'index@': {
                    templateUrl: 'templates/admin-dishes-edit.html',
                    controller: 'adminEditDishController'

                }
            },
            resolve: {
                dish: function(Dishes, $stateParams) {
                    return Dishes.getOne($stateParams.id);
                }
            }
        })
        // app.dish
        .state('app.dish', {
            url: '/dishes/:category/:id',
            views: {
                'index@': {
                    templateUrl: 'templates/single.html',
                    controller: 'singleController'
                }
            },
            resolve: {
                dish: function(Dishes, $stateParams) {
                    return Dishes.getOne($stateParams.id);
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});