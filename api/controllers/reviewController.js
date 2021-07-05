const mongoose = require("mongoose");
const _myGame = mongoose.model("Game");

const _addReview = function (request, response, _game) {
    _game.reviews.push(request.body);
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

module.exports.getOneReview = function (request, response) {
    const gameID = request.params.gameID;
    const _reviewId = request.params.reviewId;
    console.log("ID ", _reviewId);

    _myGame.findById(gameID, function(error, _game) { 
        const doc = _game.reviews.id(_reviewId);  
        console.log(doc);
        response.status(200).json(doc);
    })
};

module.exports.getAllReview = function (request, response) {
    const gameID = request.params.gameID;

    _myGame.findById(gameID).select("reviews").exec(function (error, _reviews) {
        console.log("Found Game ", _reviews);
        response.status(200).json(_reviews);
    });
};

module.exports.addOneReview = function (request, response) {
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
            _addReview(request, response, _game);
        } else {
            response.status(resp.status).json(resp.message);
        }

    });
}
module.exports.fUllUpdateOneReview = function (request, response) {
    const gameID = request.params.gameID;
    _myGame.findByIdAndUpdate(gameID, {
        review: {
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
            _game.reviews.name = request.body.name;
            _game.save(function (error, _updatedGame) {
                if (error) {
                    response.status(500).json(error);
                } else {
                    response.status(204).json(_updatedGame.reviews);
                }

            });
        }
    });
};


module.exports.deleteOneReview = function (request, response) {
    const gameID = request.params.gameID;
    _myGame.findByIdAndRemove(gameID).exec(function (error, _game) {
        if (error) {
            response.status(500).json(error);
        } else if (!_game) {
            response.status(404).json({ "message": "GameId not found" });
        }

        if (_game) {
            _game.reviews.remove();
            _game.save(function (error, _updatedGame) {
                if (error) {
                    response.status(500).json(error);
                } else {
                    response.status(204).json(_updatedGame.reviews);
                }
            });
        }
    });
};