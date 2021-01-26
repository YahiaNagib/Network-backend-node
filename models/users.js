const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
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
        maxlength: 50
    },
    joinDate: {
        type: Date,
        default: new Date()
    },
    // following: { type: mongoose.Schema.ObjectId, ref: 'User' },
    // followers: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;