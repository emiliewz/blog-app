"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        require: true
    },
    url: String,
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: String
        }
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
blogSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
