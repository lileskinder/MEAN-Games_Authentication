const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");


module.exports.register = function (request, response) {
    console.log("controller register:");
    bcrypt.hash(request.body.password, 10, function (error, hashedPassword) {
        if (!error) {
            const newUser = {
                username: request.body.username,
                password: hashedPassword,
                name: request.body.name,
            };

            User.create(newUser, function (error, user) {
                const resp = {
                    status: 201,
                    message: user
                }
                if (error) {
                    resp.status = 500;
                    resp.message = error;
                }
                response.status(resp.status).json(resp.message);

            })
        }

    })

}

module.exports.login = function (request, response) {

    const username = request.body.username;
    const password = request.body.password;


    User.findOne({ username: username }).exec(function (error, user) {
        if (error) {
            response.status(500).json(error);
        }

        if (user) {

            bcrypt.compare(password, user.password, function (error, result) {
                if (error) {
                    response.status(400).json({ "message": "unauthorized" });
                } else {
                    if (result) {
                        const token = jwt.sign({ name: user.name }, "cs572", { expiresIn: 3600 })
                        response.status(200).json({ success: "true", token: token });
                    }
                }
            })
        } else {
            response.status(400).json({ "message": "unauthorized"});
        }
    })
}

module.exports.authenticate = function (request, response, next) {
    const headerExists = request.headers.authorization;

    if (headerExists) {
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(token, "cs572", function (error, decodedToken) {
            if (error) {
                console.log("JWT verify error ", error);
                response.status(401).json({ message: "Unauthorized" })
            } else {
                next();
            }
        });
    } else {
        response.status(403).json({ message: "Token Missing" })
    }
}