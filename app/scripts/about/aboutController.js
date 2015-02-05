angular.module('Boom')
    .controller('aboutController', ['$scope', '$window',
        function($scope, $window) {
            'use strict';

            $scope.sendEmail = function() {
                var link = 'mailto:lucatrinca.uk@gmail.com?subject=Canteen%20App';
                $window.location.href = link;
            };


        }
    ]);