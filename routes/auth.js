const express = require("express");
const _ = require("lodash");
const bycrpt = require("bcrypt");
const { User } = require("../models/users")
const router = express.Router();
const jwt = require("jsonwebtoken");
const { privateKey } = require("./token");


router.post('/', async (req, res) => {

    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.status(400).send('Invalid email or password!');

    const validPassword = await bycrpt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password!');

    const token = jwt.sign({ _id: user._id }, privateKey);

    res.send(token);

});

module.exports = router;
