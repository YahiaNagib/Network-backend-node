const mongoose = require("mongoose");

// Post model consists of: 
    // user which contains username and email. These two fields are required in the post view
    // content
    // date
    // likes which is an array of userIds who like the post
const Post = mongoose.model("Post", new mongoose.Schema({
    user: {
        type: new mongoose.Schema({
            username: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            email: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        })
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            sparse: true
        }
    ]
}));


exports.Post = Post;