// Post.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    author: {
        type: String
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;



