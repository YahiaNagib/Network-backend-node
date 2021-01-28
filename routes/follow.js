const express = require("express");
const { User } = require("../models/users");
const auth = require("../middleware/auth");
const router = express.Router();


// this route is to make users follow each other
// accepts two ids
// the two ids can not be the same (users can not follow themselves)
// check if the ids are valid (users exist)
// add id2 to the following list of id1 IFF they do not already exist in this list
// then add id1 to the follower list of id2 

router.put('/', auth, async (req, res) => {

    const { id1, id2 } = req.body;
    if (id1 === id2) return res.status(400).send("users can't follow themselves!");
    let user1 = await User.findById(id1);
    let user2 = await User.findById(id2);
    if (!user1 || !user2) return res.status(400).send('One of the user does not exist!');

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
