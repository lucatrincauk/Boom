'use strict';

angular.module('Boom').factory('ListingReports', ['$firebase', 'FirebaseUrl', function ($firebase, FirebaseUrl) {

    var ref = new Firebase(FirebaseUrl).child('listingreports');
    var reports = $firebase(ref).$asArray();

    var add = function(report) {
        return reports.$add(report);
    };

    var save = function(recordOrIndex) {
        return reports.$save(recordOrIndex);
    };

    var getAll = function() {
        return reports.$loaded();
    };

    var getOne = function(key) {
        return reports.$getRecord(key);
    };

    var remove = function remove(recordOrIndex) {
        reports.$remove(recordOrIndex);
    };

    return {
        add: add,
        save: save,
        getAll: getAll,
        getOne: getOne,
        remove: remove
    };
}]);