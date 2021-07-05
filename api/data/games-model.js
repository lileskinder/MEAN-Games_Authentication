const mongoose = require("mongoose");

const _myGamePublisher = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    country: String,
    location: {
        coordinates: {
            type: [Number],
            index: "2dsphere",
        } 
    },
});

const _myGameReviews = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    desc: {
        type: String,
        require: true
    }
});

const _myGameSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    price: Number, 

    year: Number,

    minPlayers: {
        type: Number,
        min:1,
    },

    maxPlayers: {
        type: Number,
        min:1,
    },

    minAge: {
        type: Number,
        min: 4
    },

    rate: {
        type: Number,
        min:1,
        max: 5,
        "default": 1
    },

    designers: [String], 

    reviews: [_myGameReviews],

    publisher: [_myGamePublisher]
});

mongoose.model("Game", _myGameSchema);