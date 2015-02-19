'use strict';
angular.module('Boom', ['ionic', 'ui.router', 'firebase', 'angular.filter', 'MessageCenterModule', 'angulartics', 'angulartics.google.analytics', 'angulartics.google.analytics.cordova'])
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
    // for ui-router
    .run(['$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            if (error === 'AUTH_REQUIRED') {
                console.log('AUTH_REQUIRED');
                $state.go('app.user.login');
            }
        });
    }])
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
                        templateUrl: 'templates/slide-menu.html',
                        controller: 'userProfileController'
                    }
                },
                resolve: {
                    users: function(Users) {
                        return Users;
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
                        return Categories.getAll();
                    },
                    core: function(Core) {
                        return Core;
                    }
                }
            })
            // app.settings
            .state('app.settings', {
                url: '/settings',
                views: {
                    'index@': {
                        templateUrl: 'templates/settings.html',
                        controller: 'settingsController'
                    }
                },
                resolve: {
                    categories: function(Categories) {
                        return Categories.getAll();
                    }
                }
            })
            // app.favourites
            .state('app.favourites', {
                url: '/favourites',
                views: {
                    'index@': {
                        templateUrl: 'templates/favourites.html',
                        controller: 'userFavouritesController'
                    }
                },
                resolve: {
                    dishes: function(Dishes) {
                        return Dishes.getAll();
                    }
                }
            })
            // app.admin
            .state('app.admin', {
                url: '/admin',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/admin.html'
                    }
                },
                resolve: {
                    currentAuth: ['Users', function(Users) {
                        // $requireAuth returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Users.auth.$requireAuth();
                    }]
                }
            })
            .state('app.admin.stats', {
                url: '/stats',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/stats.html',
                        controller: 'adminStatsController'
                    }
                },
                resolve: {
                    dishes: function(Dishes) {
                        return Dishes.getAll();
                    },
                    categories: function(Categories) {
                        return Categories.getAll();
                    },
                    core: function(Core) {
                        return Core;
                    }
                }
            })
            .state('app.admin.dishes', {
                url: '/dishes',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/dishes/admin-dishes.html',
                        controller: 'adminDishesController'
                    }
                },
                resolve: {
                    dishes: function(Dishes) {
                        return Dishes.getAll();
                    },
                    categories: function(Categories) {
                        return Categories.getAll();
                    },
                    core: function(Core) {
                        return Core;
                    }
                }
            })
            .state('app.admin.reports', {
                url: '/reports',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/reports.html',
                        controller: 'adminListingReportsController'
                    }
                },
                resolve: {
                    reports: function(Reports) {
                        return Reports.getAll();
                    }
                }
            })
            .state('app.admin.categories', {
                url: '/categories',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/categories/admin-categories.html',
                        controller: 'adminCategoriesController'

                    }
                },
                resolve: {
                    dishes: function(Dishes) {
                        return Dishes.getAll();
                    },
                    categories: function(Categories) {
                        return Categories.getAll();
                    }
                }
            })
            .state('app.admin.categories.add', {
                url: '/add',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/categories/admin-categories-add.html',
                        controller: 'adminAddCategoryController'

                    }
                }
            })
            .state('app.admin.categories.edit', {
                url: '/edit/:id',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/categories/admin-categories-edit.html',
                        controller: 'adminEditCategoryController'

                    }
                },
                resolve: {
                    category: function(Categories, $stateParams) {
                        return Categories.getOne($stateParams.id);
                    }
                }
            })
            .state('app.admin.dishes.add', {
                url: '/add',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/dishes/admin-dishes-add.html',
                        controller: 'adminAddDishController'

                    }
                },
                resolve: {
                    categories: function(Categories) {
                        return Categories.getAll();
                    }
                }
            })
            .state('app.admin.dishes.edit', {
                url: '/edit/:id',
                views: {
                    'index@': {
                        templateUrl: 'templates/admin/dishes/admin-dishes-edit.html',
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
                    },
                    core: function(Core) {
                        return Core;
                    }
                }
            })
            .state('app.dish.report', {
                url: '/report',
                views: {
                    'index@': {
                        templateUrl: 'templates/report-listing.html',
                        controller: 'reportListingController'
                    }
                },
                resolve: {
                    reports: function(Reports) {
                        return Reports.getAll();
                    }
                }
            })
            .state('app.user', {
                url: '/users',
                abstract: true
            })
            .state('app.user.login', {
                url: '/login',
                views: {
                    'index@': {
                        templateUrl: 'templates/user/user-login.html',
                        controller: 'userLoginController'
                    }
                }
            })
            .state('app.user.register', {
                url: '/register',
                views: {
                    'index@': {
                        templateUrl: 'templates/user/user-register.html',
                        controller: 'userLoginController'
                    }
                }
            })
            .state('app.user.reset', {
                url: '/reset',
                views: {
                    'index@': {
                        templateUrl: 'templates/user/user-reset.html',
                        controller: 'userLoginController'
                    }
                }
            })
            .state('app.user.profile', {
                url: '/profile',
                views: {
                    'index@': {
                        templateUrl: 'templates/user/user-profile.html',
                        controller: 'userProfileController'
                    }
                },
                resolve: {
                    users: function(Users) {
                        return Users;
                    }
                }
            })
            .state('app.about', {
                url: '/about',
                views: {
                    'index@': {
                        templateUrl: 'templates/about/about.html',
                        controller: 'aboutController'
                    }
                }
            })
            .state('app.about.changelog', {
                url: '/changelog',
                views: {
                    'index@': {
                        templateUrl: 'templates/about/changelog.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });