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
        new mongoose.Schema({
            name: {
                type: String,
                required: true,
                unique: true,
                index: true,
                sparse: true,
                minlength: 5,
                maxlength: 50
            }
        })
    ]
}));


exports.Post = Post;