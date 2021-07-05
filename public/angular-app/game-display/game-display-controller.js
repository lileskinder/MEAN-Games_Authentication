angular.module("meanGames").controller("GameController", GameController);


function GameController(GamesDataFactory, $routeParams, AuthFactory, $scope) {

    const vm = this;
    const gameId = $routeParams.id;

    function _getStarsArray(rating) {
        return new Array(rating).fill(1);
    }

    GamesDataFactory.getOne(gameId).then(function(response) {
        vm.game = response;
        vm.starsArray = _getStarsArray(vm.game.rate);

    })

    vm.isLoggedIn = function() {
        return AuthFactory.auth;
    }

    vm.deleteGame = function () {
        GamesDataFactory.deleteOne(gameId)
            .then(function (response) {
                console.log("Game Deleted", response);
                $scope.IsShowDeletedVisible(); 
            }).catch(function (error) {
                console.log("Error Deleting Game ", error);
            })
            
    }


    $scope.showDeleted = false;
    $scope.IsShowDeletedVisible = function () {
        if ($scope.showDeleted) {
            $scope.showDeleted = false;
        } else {
            $scope.showDeleted = true;
        }
    }
}