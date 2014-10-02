angular.module('boom.plp')

    .controller('plpCtrl', ['$scope', 'categoryRepository', '$firebase',
        function ($scope, categoryRepository, $firebase) {

        $scope.categories = [];
        $scope.myData = [];

        // Locate firebase endpoint for categories
        var dataRef = new Firebase('https://mns-restaurant-app.firebaseio.com/categories');
        // Create an angularfire reference to the data
        var sync = $firebase(dataRef);
        // Retrieve the data and populate the array
        $scope.myData = sync.$asArray();

        // Adding and saving records to firebase
        $scope.myData.$add({ name: "testin", phone: "999999" });
//
        // Remove the first record from firebase and save
        //$scope.myData.$remove($scope.myData[0]);

        // Save the state of the array to the firebase endpoint (dataRef)
        //$scope.myData.$save({ name: "Oh hello", phone: "999999" });

        (function() {
            categoryRepository.all().then(function(categories) {
                $scope.categories = categories.data;
            });
        })();
    }]
);