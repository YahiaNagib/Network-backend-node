const express = require("express");
const { User } = require("../models/users");
const { Post } = require("../models/posts");
const auth = require("../middleware/auth");
const router = express.Router();


// this route accepts 2 parameters, postId and id of the user liking/unliking the post
router.put("/", auth, async (req, res) => {

    const { postId, userId } = req.body;

    // check if the authenticated user is the same as userId else return 403 
    if (req.user._id !== userId) return res.status(403).send("Cannot perform this operation");

    // check if both the post and the user exist in the database
    let post = await Post.findById(postId);
    let user = await User.findById(userId);

    if (!post || !user) return res.status(400).send('Error!');

    // if the user is in likes array, then unlike the post
    // otherwise, like the post
    if (post.likes.includes(userId)) {
        post = await Post.findOneAndUpdate(
            { _id: postId },
            { $pull: { likes: userId } },
        );
    } else {
        post = await Post.findOneAndUpdate(
            { _id: postId },
            { $push: { likes: userId } },
        );
    }

    res.send(post);
});

module.exports = router;
