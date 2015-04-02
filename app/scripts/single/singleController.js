angular.module('Boom')
	.controller('singleController', ['$scope', 'dish', 'core', 'Users', 'Ratings', '$stateParams','$timeout', 'Dishes',
		function($scope, dish, core, Users, Ratings, $stateParams, $timeout, Dishes) {
			'use strict';


			dish.$loaded(function() {
				// assign data to scope
				$scope.single = dish;

				// if dish has a week assigned
				if ($scope.single.week) {
					// retrieve which set days are assigned to the current cycle
					// core.cycle(true) will return a word e.g. four
					$scope.single.days = $scope.filterFalseDays($scope.single.week[core.cycle(true)]);

					// if a dish is assigned to all days, replace days with 'Everyday'
					if ($scope.single.days.length >= 5) {
						$scope.single.days = ['Everyday'];

					}

					if (angular.isDefined($scope.user) && angular.isDefined($scope.user.ratings) && angular.isDefined($scope.user.ratings[$scope.single.$id])) {
						$scope.single.voted = $scope.user.ratings[$scope.single.$id].vote;
					}

				}

				Dishes.dishView($scope.single.$id);


			});

			// filter out days that are set to false (due to checkbox)
			$scope.filterFalseDays = function(day) {
				var keys = Object.keys(day);

				var filtered = keys.filter(function(key) {
					return day[key];
				});
				return filtered;
			};

			$scope.calculateScore = function() {
				if (!$scope.votes.upvote) {
					$scope.votes.upvote = 0;
				}
				if (!$scope.votes.downvote) {
					$scope.votes.downvote = 0;
				}

				$scope.qty = $scope.votes.upvote + $scope.votes.downvote;

				$timeout(function() {
					$scope.score = Math.round($scope.votes.upvote / $scope.qty*100);
				});
				if (isNaN($scope.score)) {
					$scope.score = 0;
				}
				console.log($scope.score);
			};
			$scope.votes = Ratings.getOne($stateParams);
			$scope.votes.$loaded(function() {
				$scope.calculateScore();
			});

			$scope.submitRating = function(vote) {
				if (typeof $scope.single.voted !== 'undefined') {
					Ratings.submitRating($scope.single.$id, vote, true);
				} else {
					Ratings.submitRating($scope.single.$id, vote);
				}
				$scope.single.voted = vote;

				if (angular.isDefined($scope.user)) {
					Users.registerVote($scope.single.$id, vote);
				}
			};
			$scope.$on('voteSuccessful', function() {
				$scope.calculateScore();
			});


			$scope.toggleFavourite = function() {

				if ($scope.user.favourites && $scope.user.favourites[$scope.single.$id]) {
					Users.removeFavourite($scope.single.$id);
				} else {
					Users.addFavourite($scope.single.$id);
				}
			};


			$scope.canteenName = core.canteenName();

		}

	]);