const express = require("express");
const { User } = require("../models/users");
const auth = require("../middleware/auth");
const router = express.Router();


// this route is to make users follow/unfollow each other
// accepts two ids
router.put('/', auth, async (req, res) => {

    const { id1, id2 } = req.body;
    // check if the authenticated user is the same as id1 else return 403 
    if (req.user._id !== id1) return res.status(403).send("Cannot perform this operation");

    // the two ids can not be the same (users can not follow themselves)
    if (id1 === id2) return res.status(400).send("users can't follow themselves!");

    // check if the ids are valid (users exist)
    let user1 = await User.findById(id1);
    let user2 = await User.findById(id2);
    if (!user1 || !user2) return res.status(400).send('One of the user does not exist!');

    // add to the following list of id1 if they do not already exist in this list
    // OR remove id2 from the following list of id1 if they already exist in this list
    // then add id1 to the follower list of id2
    // Or remove id1 from the follower list of id2
    if (user1.following.includes(id2)) {
        user1 = await User.findOneAndUpdate(
            { _id: id1 },
            { $pull: { following: id2 } },
        );

        user2 = await User.findOneAndUpdate(
            { _id: id2 },
            { $pull: { followers: id1 } },
        );
    }
    else {
        user1 = await User.findOneAndUpdate(
            { _id: id1 },
            { $push: { following: id2 } },
        );

        user2 = await User.findOneAndUpdate(
            { _id: id2 },
            { $push: { followers: id1 } },
        );
    }

    res.send(user1);

});

module.exports = router;
