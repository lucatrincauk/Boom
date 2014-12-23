
'use strict';

angular.module('Boom')
    .factory('Dishes', ['$firebase', 'FirebaseUrl', 'Core',
        function($firebase, FirebaseUrl, Core) {

            var ref   = new Firebase(FirebaseUrl).child('dishes');
            var cycle = 'p' + (Core.cycle() - 1);

            var getAll = function() {
                var sync = $firebase(ref);
                return sync.$asArray();
            };
            var getWeekly = function() {
                var ref  = new Firebase(FirebaseUrl).child('dishes').orderByChild(cycle).equalTo(true);
                var sync = $firebase(ref);

                return sync.$asArray();
            };

            var getOne = function(dishId) {
                var refSingle = ref.child(dishId);
                var sync = $firebase(refSingle);

                return sync.$asObject();
            };

            var getReported = function() {
                var sync = $firebase(ref);
                return sync.$asArray().$loaded().then(filterReportedDishes);
            };

            var removeDish = function(data) {
                ref.child(data).remove();
            };

            function filterReportedDishes(dishes) {
                return _.filter(dishes, function(dish) {
                    return dish.reports ? true : false;
                });
            }

            return {
                getAll:      getAll,
                getWeekly:   getWeekly,
                getOne:      getOne,
                getReported: getReported,
                removeDish:  removeDish
            };
        }
    ]);