'use strict';

angular.module('Boom')
    .factory('Dishes', ['$firebase', 'FirebaseUrl', 'Core', '$rootScope',
        function($firebase, FirebaseUrl, Core, $rootScope) {

            var ref = new Firebase(FirebaseUrl).child('dishes');

            var cycle = 'p' + (Core.cycle() - 1);

            $rootScope.$on('canteenChanged', function() {
                cycle = 'p' + (Core.cycle() - 1);
            });
            var getAll = function() {
                var sync = $firebase(ref);
                return sync.$asArray();
            };
            var getWeekly = function() {
                var ref = new Firebase(FirebaseUrl).child('dishes').orderByChild(cycle).equalTo(true);
                var sync = $firebase(ref);

                return sync.$asArray();
            };

            var getOne = function(dishId) {
                var refSingle = ref.child(dishId);
                var sync = $firebase(refSingle);

                return sync.$asObject();
            };


            var removeDish = function(data) {
                ref.child(data).remove();
            };



            return {
                getAll: getAll,
                getWeekly: getWeekly,
                getOne: getOne,
                removeDish: removeDish
            };
        }
    ]);