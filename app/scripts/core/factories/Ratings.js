'use strict';
angular.module('Boom')

.factory('Ratings', ['$firebase', 'FirebaseUrl','$rootScope',
	function($firebase, FirebaseUrl, $rootScope) {

		var getOne = function(id) {
			var refSingle = new Firebase(FirebaseUrl).child('ratings').child(id.id);
			var sync = $firebase(refSingle);

			return sync.$asObject();
		};

		var submitRating = function(id, vote, negative) {
			var voteRef;
			if (negative) {

				var negativeVote = (vote === 'upvote' ? 'downvote' : 'upvote');

				voteRef = new Firebase(FirebaseUrl).child('ratings').child(id).child(negativeVote);

				voteRef.transaction(function(negativeVote) {
					return negativeVote - 1;
				});
			}
			voteRef = new Firebase(FirebaseUrl).child('ratings').child(id).child(vote);

			voteRef.transaction(function(vote) {
				return vote + 1;
			}, function() {
				$rootScope.$broadcast('voteSuccessful');
			});

		};

		return {
			getOne: getOne,
			submitRating: submitRating
		};
	}



]);