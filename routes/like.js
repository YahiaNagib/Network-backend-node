const express = require("express");
const { User } = require("../models/users");
const { Post } = require("../models/posts");
const router = express.Router();


// this route accepts 2 parameters post id and id of the user liking/unliking the post
// first check if both the post and the user exist in the database
router.put("/", async (req, res) => {

    const { postId, userId } = req.body;
    let post = await Post.findById(postId);
    let user = await User.findById(userId);

    if (!post || !user) return res.status(400).send('Error!');

    // if the user is in likes array, then unlike else like
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
