const mongoose = require("mongoose");
const _myGame = mongoose.model("Game");

const _addPublisher = function (request, response, _game) {
    _game.publisher.push(request.body);
    // _game.publisher.name = request.body.name;
    // _game.publisher.country = request.body.country;

    _game.save(function (error, _updatedGame) {
        
        const resp = {
            status: 201,
            message: _updatedGame
        };

        if (error) {
            resp.status = 500;
            resp.message = error;
        }
        response.status(resp.status).json(resp.message);
    });

}

module.exports.getOnePublisher = function (request, response) {
    const gameID = request.params.gameID;
    const _publisherId = request.params.publisherId;
    console.log("ID ", _publisherId);

    _myGame.findById(gameID, function(error, _game) {
        const doc = _game.publisher.id(_publisherId);
        console.log(doc);
        response.status(200).json(doc);
    })
};

module.exports.getAllPublisher = function (request, response) {
    const gameID = request.params.gameID;

    _myGame.findById(gameID).select("publisher").exec(function (error, _publishser) {
        console.log("Found Game ", _publishser);
        response.status(200).json(_publishser);
    });
};

module.exports.addOnePublisher = function (request, response) {
    const gameID = request.params.gameID;
    _myGame.findById(gameID).exec(function (error, _game) {

        const resp = {
            status: 201,
            message: _game
        };

        if (error) {
            console.log("Error Creating  agame");
            resp.status = 500;
            resp.message = err;
        } else if (!_game) {
            resp.status = 404;
            resp.message = { "message": "Game not found" }
        }

        if (_game) {
            _addPublisher(request, response, _game);
        } else {
            response.status(resp.status).json(resp.message);
        }

    });
}
module.exports.fUllUpdateOnePublisher = function (request, response) {
    const gameID = request.params.gameID;
    _myGame.findByIdAndUpdate(gameID, { 
        publisher: {
            name: request.body.name,
            address: request.body.address
        }
    }).exec(function (error, _game) {
        if (error) {
            response.status(500).json(error);
        } else if (!_game) {
            response.status(404).json({ "message": "Game not found" });
        }

        if (_game) {
            _game.publisher.name = request.body.name;
            _game.save(function (error, _updatedGame) {
                if (error) {
                    response.status(500).json(error);
                } else {
                    response.status(204).json(_updatedGame.publishser);
                }

            });
        }
    });
};


module.exports.deleteOnePublisher = function (request, response) {
    const gameID = request.params.gameID;
    _myGame.findByIdAndRemove(gameID).exec(function (error, _game) {
        if (error) {
            response.status(500).json(error);
        } else if (!_game) {
            response.status(404).json({ "message": "GameId not found" });
        }

        if (_game) {
            _game.publisher.remove();
            _game.save(function (error, _updatedGame) {
                if (error) {
                    response.status(500).json(error);
                } else {
                    response.status(204).json(_updatedGame.publishser);
                }
            });
        }
    });
};