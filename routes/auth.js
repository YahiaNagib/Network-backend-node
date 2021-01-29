const express = require("express");
const _ = require("lodash");
const bycrpt = require("bcrypt");
const { User } = require("../models/users")
const router = express.Router();


router.post('/', async (req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid email or password!');

    const validPassword = await bycrpt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password!');


    const token = user.generateAuthToken();

    res.send(token);

});

module.exports = router;
