const mongoose = require("mongoose");
const express = require('express');
const app = express();
const posts = require("./routes/posts");
const users = require("./routes/users");
const follow = require("./routes/follow");
const unfollow = require("./routes/unfollow");
const like = require("./routes/like");
const auth = require("./routes/auth");

const { User } = require("./models/users");
const { Post } = require("./models/posts");

mongoose.connect("mongodb://localhost/networkDB", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false })
    .then(() => { console.log("Connected") })
    .catch((error) => { console.log("Error", error) });


app.use(express.json());
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/follow', follow);
app.use('/api/unfollow', unfollow);
app.use('/api/like', like);
app.use('/api/auth', auth);

// let user = new User({
//     name: "yahia",
//     email: "y@g.com",
//     password: "12345",
// });

// user.save().then(() => {
//     console.log("done")
// }).catch(e => {
//     console.log(e);
// });

// let post = new Post({
//     owner: {
//         _id: "600ff71fb069ed1678678232"
//     },
//     content: "My second post!!",
//     likes: []
// });

// post.save().then(() => {
//     console.log("done")
// }).catch(e => {
//     console.log(e);
// });


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));