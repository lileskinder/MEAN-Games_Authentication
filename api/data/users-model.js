const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    name: {
        type: String,
    }
})

mongoose.model("User", userSchema, "users");