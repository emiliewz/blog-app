"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'username required'],
        minLength: 3,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
