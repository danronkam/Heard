const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    audio: {
        type: Boolean,
        required: true,
        default: false,
    },
    moods: {
        type: Array,
        required: true,
        default: ["red", "pink", "green", "yellow", "blue"], // red= anger pink=love, green=anxious, yellow= happy blue=sad
    },
    admin: {
        type: Boolean,
        required: true,
        default: false,
    },
    flaggedPosts: {
        type: Array,
        default: []
    }
},
    
{
    timestamps: true
}
);

// const User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);