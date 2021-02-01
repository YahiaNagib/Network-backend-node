const mongoose = require("mongoose");
const express = require('express');
const posts = require("./routes/posts");
const users = require("./routes/users");
const follow = require("./routes/follow");
const like = require("./routes/like");
const auth = require("./routes/auth");
const app = express();


mongoose.connect("mongodb://localhost/networkDB", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => { console.log("Connected") })
    .catch((error) => { console.log("Error", error) });


app.use(express.json());

// add headers to make the frontend able to send requests
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type, x-auth-token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/follow', follow);
app.use('/api/like', like);
app.use('/api/auth', auth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));