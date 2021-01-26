const express = require("express");
const { User } = require("../models/users")
const { Post } = require("../models/posts")
const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});


// first check if the user exists
// then add the post

router.post('/', async (req, res) => {
    let user = await User.findById(req.body.id);
    if(!user) return res.status(400).send('This user does not exist!');
    let post = new Post({
        owner: user._id,
        content: req.body.content
    });

    post = await post.save();
    res.send(post);

});

module.exports = router;
