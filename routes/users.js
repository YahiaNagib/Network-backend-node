const express = require("express");
const { User } = require("../models/users")
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', async (req, res) => {

    const { name, email, password } = req.body;
    let user = new User({
        name, email, password
    });

    user = await user.save();
    res.send(user);

});

module.exports = router;
