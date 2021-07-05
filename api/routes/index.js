const express = require("express");
const _gameController = require("../controllers/gamesController");
const _publisherController = require("../controllers/publisherController");
const _reviewController = require("../controllers/reviewController");
const _userController = require("../controllers/usersController");

const router = express.Router();

router.route("/games")
    .get(_gameController.getAllGames)
    .post(_gameController.addOneGame);

router.route("/games/:gameId")
    .get(_gameController.getOneGame)
    .put(_gameController.fullUpdateGame)
    .patch(_gameController.partialUpdateGame)
    .delete(_gameController.deleteOneGame);

router.route("/games/:gameID/publishers")
    .post(_publisherController.addOnePublisher)
    .get(_publisherController.getAllPublisher);

router.route("/games/:gameID/publishers/:publisherId")
    .get(_publisherController.getOnePublisher)
    .put(_publisherController.fUllUpdateOnePublisher)
    .delete(_publisherController.deleteOnePublisher);



router.route("/games/:gameID/reviews")
    .post(_reviewController.addOneReview)
    .get(_reviewController.getAllReview);

router.route("/games/:gameID/reviews/:reviewId")
    .get(_reviewController.getOneReview)
    .put(_reviewController.fUllUpdateOneReview)
    .delete(_reviewController.deleteOneReview);




router.route("/users")
    .post(_userController.register);

router.route("/users/login")
    .post(_userController.login);


module.exports = router;