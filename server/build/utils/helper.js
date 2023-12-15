"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataEntryError = (message) => {
    const e = new Error(message);
    e.name = 'DataEntryError';
    return e;
};
const toNewUser = (object) => {
    if (!object || typeof object !== 'object') {
        throw DataEntryError('Incorrect or missing data');
    }
    if ('username' in object && 'name' in object && 'password' in object) {
        const newUserEntry = {
            username: parseString(object.username),
            name: parseString(object.name),
            password: parseString(object.password),
        };
        return newUserEntry;
    }
    throw DataEntryError('Incorrect data: some fields are missing');
};
const toNewBlog = (object) => {
    if (!object || typeof object !== 'object') {
        throw DataEntryError('Incorrect or missing data');
    }
    if ('title' in object && 'author' in object && 'url' in object) {
        const newBlogEntry = {
            title: parseString(object.title),
            author: parseString(object.author),
            url: parseString(object.url),
            likes: 'likes' in object ? parseNumber(object.likes) : 0,
        };
        return newBlogEntry;
    }
    throw DataEntryError('Incorrect data: some fields are missing');
};
const toNewAuth = (object) => {
    if (!object || typeof object !== 'object') {
        throw DataEntryError('Incorrect or missing data');
    }
    if ('username' in object && 'password' in object) {
        const newAuthEntry = {
            username: parseString(object.username),
            password: parseString(object.password),
        };
        return newAuthEntry;
    }
    throw DataEntryError('Incorrect data: some fields are missing');
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (text) => {
    if (!isString(text)) {
        throw DataEntryError(`${text} is not a string`);
    }
    return text;
};
const isNumber = (num) => {
    return typeof num === 'number' || num instanceof Number;
};
const parseNumber = (num) => {
    if (!isNumber(num)) {
        throw DataEntryError(`${num} is not a number`);
    }
    return num;
};
const toNewComent = (object) => {
    if (!object || typeof object !== 'object') {
        throw DataEntryError('Incorrect or missing data');
    }
    if ('comment' in object) {
        const newCommentEntry = {
            comment: parseString(object.comment),
        };
        return newCommentEntry;
    }
    throw DataEntryError('Incorrect data: some fields are missing');
};
exports.default = {
    toNewUser,
    toNewBlog,
    toNewAuth,
    toNewComent,
};
