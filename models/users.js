const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { privateKey } = require("../token");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            sparse: true
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            sparse: true
        }
    ]
});

userSchema.methods.generateAuthToken = function () {
    const { _id, username } = this;
    const token = jwt.sign({ _id, username }, privateKey);
    return token;
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;