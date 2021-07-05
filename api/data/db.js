const mongoose = require("mongoose");
require("./games-model");
require("./users-model");


const _myDBName = "meanGames";
const _myDBurl = "mongodb://localhost:27017/" + _myDBName;

mongoose.connect(_myDBurl, { useNewUrlParser: true, useUnifiedTopology: true });


process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        process.exit(0);
    })
})

process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        process.exit(0);
    })
})

process.on("SIGUSR2", function () {
    mongoose.connection.close(function () {
        process.kill(process.pid, "SIGUSR2");
    })
})