const express = require("express");
const _ = require("lodash");
const bycrpt = require("bcrypt");
const { User } = require("../models/users")
const router = express.Router();
const jwt = require("jsonwebtoken");
const { privateKey } = require("./token");

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', async (req, res) => {

    const { name, email, password } = req.body;

    const salt = await bycrpt.genSalt(10);
    const hashedPass = await bycrpt.hash(password, salt);
    let user = new User({
        name, email, password: hashedPass
    });

    user = await user.save();

    user = _.pick(user, ['_id', 'name', 'email']);

    const token = jwt.sign({ _id: user._id }, privateKey);

    res.header("x-auth-token", token).send(user);

});

module.exports = router;
