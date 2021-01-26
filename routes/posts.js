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
    if (!user) return res.status(400).send('This user does not exist!');
    let post = new Post({
        owner: user._id,
        content: req.body.content
    });

    post = await post.save();
    res.send(post);

});

router.put('/', async (req, res) => {
    const { id: postId, content } = req.body;
    let post = await Post.findById(postId);
    if (!post) return res.status(400).send('This post does not exist!');
    post = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { content } },
    );
    res.send(post);
});

router.delete('/', async (req, res) => {
    const postId = req.body.id;
    let post = await Post.findById(postId);
    if (!post) return res.status(400).send('This post does not exist!');

    post = await Post.deleteOne({_id: postId});
    res.send(post);
});


module.exports = router;
