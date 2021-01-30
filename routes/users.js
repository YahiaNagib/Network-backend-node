const express = require("express");
const _ = require("lodash");
const bycrpt = require("bcrypt");
const { User } = require("../models/users")
const router = express.Router();

// Get all users
// router.get('/', async (req, res) => {
//     const users = await User.find();
//     res.send(users);
// });

// Get a certain user
router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    user = _.pick(user, ['_id', 'username', 'joinDate', 'email', 'following', 'followers']);
    res.send(user);
});

router.post('/', async (req, res) => {

    const { username, email, password } = req.body;

    const salt = await bycrpt.genSalt(10);
    const hashedPass = await bycrpt.hash(password, salt);
    let user = new User({
        username, email, password: hashedPass
    });

    user = await user.save();

    const token = user.generateAuthToken();

    user = _.pick(user, ['_id', 'username', 'email', 'following', 'followers']);

    res.header("x-auth-token", token).header("access-control-expose-headers", 'x-auth-token').send(user);

});



module.exports = router;
