const express = require("express");
const _ = require("lodash");
const bycrpt = require("bcrypt");
const { User } = require("../models/users")
const router = express.Router();


// Get a certain user
router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    // pick certain properties of the user to send it to the client
    // pick all the properties except password
    user = _.pick(user, ['_id', 'username', 'joinDate', 'email', 'following', 'followers']);
    res.send(user);
});

// Create user
router.post('/', async (req, res) => {

    // get the properties then hash the password
    const { username, email, password } = req.body;
    const salt = await bycrpt.genSalt(10);
    const hashedPass = await bycrpt.hash(password, salt);
    let user = new User({
        username, email, password: hashedPass
    });

    user = await user.save();

    // generate the jwt
    const token = user.generateAuthToken();

    // pick all the properties except password
    user = _.pick(user, ['_id', 'username', 'email', 'following', 'followers']);

    // add the jwt to the header of the response and send the user to the client
    res.header("x-auth-token", token).header("access-control-expose-headers", 'x-auth-token').send(user);

});

module.exports = router;
