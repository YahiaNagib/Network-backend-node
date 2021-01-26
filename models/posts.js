const mongoose = require("mongoose");

const Post = mongoose.model("Post", new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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