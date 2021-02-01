const express = require("express");
const _ = require("lodash");
const bycrpt = require("bcrypt");
const { User } = require("../models/users")
const router = express.Router();

// Post request to login a user
router.post('/', async (req, res) => {

    // extract the username and password from the body of the request
    // and verify if this user exist in the database or through error
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid email or password!');

    // compare the password with the stored hashed password
    const validPassword = await bycrpt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password!');

    // generate the jwt then send it to the client
    const token = user.generateAuthToken();
    res.send(token);

});

module.exports = router;
