angular.module("meanGames").directive("gameRating", GameRating);

function GameRating() {
    return {
        restrict: "E",
        templateUrl: "angular-app/game-rating/rating.html",
        scope: {
            newstars: "=stars"
        }
    }
}