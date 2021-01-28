const express = require("express");
const mongoose = require("mongoose");
const { User } = require("../models/users")
const { Post } = require("../models/posts")
const auth = require("../middleware/auth");
const router = express.Router();

// get all the posts
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

// get all the posts of a certain user
router.get('/user/:id', async (req, res) => {
    const { id: userId } = req.params;
    const posts = await Post.find({ owner: userId });
    res.send(posts);
});

// get all the posts of users who a certain user follows
router.get('/following/:id', async (req, res) => {
    const { id: userId } = req.params;
    // first get all the followed users 
    const { following: followedUsers } = await User.findOne({ _id: userId });

    let posts = [];
    // then get the posts of each user and add it to the array

    // followedUsers.forEach(async (user) => {
    //     const userPosts = await Post.find({ owner: mongoose.Types.ObjectId(user) });
    //     posts.push(...userPosts);
    //     console.log(posts);
    // });

    // use regular for loop instead of foreach (Asynchronous/Promise issue)
    // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
    for (let user of followedUsers) {
        const userPosts = await Post.find({ owner: mongoose.Types.ObjectId(user) });
        posts.push(...userPosts);
    }

    res.send(posts);
});


// first check if the user exists
// then add the post

router.post('/', auth, async (req, res) => {

    let user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('This user does not exist!');
    let post = new Post({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        content: req.body.content
    });

    post = await post.save();
    res.send(post);

});

router.put('/:id', auth, async (req, res) => {
    const { id: postId } = req.params
    const { content } = req.body;
    let post = await Post.findById(postId);
    if (!post) return res.status(400).send('This post does not exist!');
    if (!post.owner.equals(req.user._id)) return res.status(403).send('You can not change this post!');
    post = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { content } },
    );
    res.send(post);
});

router.delete('/:id', auth, async (req, res) => {
    const postId = req.params.id;
    let post = await Post.findById(postId);
    if (!post) return res.status(400).send('This post does not exist!');
    if (!post.owner.equals(req.user._id)) return res.status(403).send('You can not delete this post!');
    post = await Post.deleteOne({ _id: postId });
    res.send(post);
});

module.exports = router;
