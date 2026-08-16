const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    pfp: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },

    displayname: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("User", userSchema);