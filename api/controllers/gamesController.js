const mongoose = require("mongoose");
const _myGame = mongoose.model("Game");

module.exports.getAllGames = function (request, response) {
    let offset = 0;
    let count = 15;
    const maxCount = 20;

    if (request.query && request.query.offset) {
        offset = parseInt(request.query.offset)
    }

    if (request.query && request.query.count) {
        count = parseInt(request.query.count);
    }

    if (count > maxCount) {
        count = maxCount;
        response.status(400).json({ "message": "Cannot exceede the count" });
    }


    if (isNaN(offset) || isNaN(count)) {
        response.status(400).json({ "message": "offset and count should be numbers" });
        return;
    }


    _myGame.find().skip(offset).limit(count).exec(function (error, _games) {
        const resp = {
            status: 200,
            message: _games
        };
        if (error) {

            resp.status = 500;
            resp.message = error;
        }
        response.status(resp.status).json(resp.message);
    });
}

module.exports.getOneGame = function (request, response) {
    const gameId = request.params.gameId;

    _myGame.findById(gameId).exec(function (error, _game) {
        const resp = {
            status: 200,
            message: _game
        };

        if (error) {
            console.log("Error finding the game");
            resp.status = 500;
            resp.message = error;
        } else if (!_game) {
            resp.status = 400;
            resp.message = { "message": "Game is not found" };
        }
        response.status(resp.status).json(resp.message);
    });
}

module.exports.addOneGame = function (request, response) {

    const _newGame = {
        title: request.body.title,
        price: parseFloat(request.body.price),
        year: parseInt(request.body.year),
        minPlayers: parseInt(request.body.minPlayers),
        maxPlayers: parseInt(request.body.maxPlayers),
        minAge: parseInt(request.body.minAge),
        rate: parseInt(request.body.rate),
        designers: request.body.designers,
        publisher: {}
    };

    _myGame.create(_newGame, function (error, _game) {
        const resp = {
            status: 201,
            message: _game
        };

        if (error) {
            resp.status = 500;
            resp.message = error;
            //response.status(500).json(error);
        } 
        // else {
        //     response.status(201).json(_game);
        // }
        
        response.status(resp.status).json(resp.message);
    });
}

module.exports.fullUpdateGame = function (request, response) {
    const gameId = request.params.gameId;

    _myGame.findById(gameId).exec(function (error, _game) {
        const resp = {
            status: 204, 
            message: _game
        };

        if (error) {
            resp.status = 500;
            resp.message = error
        } else if (!_game) {
            resp.status = 200,
            resp.message = resp.message = { "message": "Game is not found" };
        }

        if (resp.status !== 204) {
            response.status(resp.status).json(resp.message);
        } else {
            _game.title = request.body.title;
            _game.price = parseFloat(request.body.price);
            _game.year = parseInt(request.body.year);
            _game.minPlayers = parseInt(request.body.minPlayers);
            _game.maxPlayers = parseInt(request.body.maxPlayers);
            _game.minAge = parseInt(request.body.minAge);
            _game.rate = parseInt(request.body.rate);
            _game.designers = request.body.designers;
            _game.publisher = {};

            _game.save(function (error, _updatedGame) {
                if (error) {
                    resp.status = 500,
                    resp.message = error
                } else {
                    resp.message = _updatedGame;
                }

                response.status(resp.status).json(resp.message);
            });
        }
    });
}

module.exports.partialUpdateGame = function (request, response) {


    const gameId = request.params.gameId;
    _myGame.findById(gameId).exec(function (error, _game) {
        const resp = {
            status: 204,
            message: _game
        }

        if(error) {
            resp.status = 500;
            resp.message = error;
        } else if(!_game) {
            resp.status = 400,
            resp.message = resp.message = { "message": "Game is not found" };
        }

        if(resp.status !== 204) {
            response.status(resp.status).json(resp.message);
        } else {
            if (request.body.title) {
                _game.title = request.body.title;
            }

            if (request.body.price) {
                _game.price = parseFloat(request.body.price);
            }

            if (request.body.year) {
                _game.year = parseInt(request.body.year);
            }

            if (request.body.minPlayers) {
                _game.minPlayers = parseInt(request.body.minPlayers);
            }

            if (request.body.maxPlayers) {
                _game.maxPlayers = parseInt(request.body.maxPlayers);
            }

            if (request.body.minAge) {
                _game.minAge = parseInt(request.body.minAge);
            }

            if (request.body.rate) {
                _game.rate = parseInt(request.body.rate);
            }

            if (request.body.designers) {
                _game.designers = request.body.designers;
            }

            _game.save(function(error, _updatedGame) {
                if(error) {
                    resp.status = 500;
                    resp.message = error;
                } else {
                    resp.status = _updatedGame;
                    response.status(204).json(_updatedGame);
                }

                
            })
        }
    })
}

module.exports.deleteOneGame = function(request, response) {
    const gameId = request.params.gameId;
    console.log("game id", gameId)

    _myGame.findByIdAndDelete(gameId).exec(function(error, _deletedGame) {
        const resp = {
            status: 204,
            message: _deletedGame
        }

        if(error) {
            resp.status = 500;
            resp.message = error;
        } else if(!_deletedGame) {
            resp.status = 400;
            resp.message = resp.message = { "message": "Game is not found" };
        }

        response.status(resp.status).json(resp.message);
    });
}