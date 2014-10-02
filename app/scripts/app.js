var boom = angular.module('boom', [
    'ui.router',
    'firebase',
    'boom.repositories',
    'boom.plp'
]);

angular.module('boom.plp', []);
angular.module('boom.repositories', []);

boom.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('container', {
            url: '/',
            views: {
                'header@': {
                    templateUrl: 'templates/header.html'
                },
                'plp@': {
                    templateUrl: 'templates/plp.html',
                    controller: "plpCtrl"
                }
            }
        });
});