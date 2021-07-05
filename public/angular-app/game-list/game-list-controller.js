angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesDataFactory, AuthFactory, $scope) {
    const vm = this;

    GamesDataFactory.getAll().then(function (response) {
        vm.games = response;
    });

    vm.addGame = function () {
        const newGame = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            year: vm.newGameYear,
            rate: vm.newGameRate,
            minPlayers: vm.newGameMinPlayes,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge,
            designers: vm.newGameDesigners,
            publisher: {}

        };

        if(vm.gameForm.$valid) {
            GamesDataFactory.addOne(newGame)
            .then(function(response) {
                console.log("Saved", response);
                $scope.IsShowAddedVisible();
            }).catch(function(error) {
                console.log("Error while saving ", error)
            });
        }
    } 

    vm.isLoggedIn = function() {
        return AuthFactory.auth;
    }

    $scope.showAdded = false;
    $scope.IsShowAddedVisible = function () {
        if ($scope.showAdded) {
            $scope.showAdded = false;
        } else {
            $scope.showAdded = true;
        }
    }

}