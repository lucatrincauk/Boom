angular.module('boom.plp')

    .controller('plpCtrl', ['$scope', '$http', 'dishRepository', 'categoryRepository',
        function ($scope, $http, dishRepository, categoryRepository) {

        $scope.categories = [];

        (function() {
            categoryRepository.all().then(function(categories) {
                $scope.categories = categories.data;
            });
        })();
    }]
);