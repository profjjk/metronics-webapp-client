const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
require('dotenv').config()

const authenticateUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await db.User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "Invalid credentials." });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: "Invalid credentials." });
        }
        req.user = { username: user.username, authorization: user.authorization }
        next();
    } catch(err) { res.json({ msg: "Failed to authenticate user." }) }
}

const authenticateToken = (req, res, next) => {
    const token = req.headers['metronics'];
    if (!token) return res.status(401).json({ msg: "Access denied. No authorization token received." });
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ msg: err });
            req.user = { username: decoded.username, authorization: decoded.authorization };
            next();
        })
    } catch(err) { res.json({ msg: "Failed to authenticate token." }) }
}

module.exports = {
    token: authenticateToken,
    user: authenticateUser
}

// TODO: make use of the req.user property to restrict data access to administrators only. No public access allowed.
//  - I probably need to do this in the controllers, or make different versions of the authenticateToken middleware.

// TODO: maybe I should move the authenticateUser logic to the userController.
//  - It looks nice as middleware, but is only used once at login.