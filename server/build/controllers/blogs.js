"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const blog_1 = __importDefault(require("../models/blog"));
const helper_1 = __importDefault(require("../utils/helper"));
const middleware_1 = require("../utils/middleware");
const middleware_2 = require("../utils/middleware");
const router = express_1.default.Router();
router.use(middleware_2.userExtractor);
router.get('/', (0, middleware_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_1.default
        .find({})
        .populate('user', { username: 1, name: 1 });
    res.json(blogs);
})));
router.post('/', (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, url, likes } = helper_1.default.toNewBlog(req.body);
    const user = req.user;
    if (!user) {
        return res.status(401).json({ error: 'operation not permitted' });
    }
    const blog = new blog_1.default({
        title, author, url, likes,
        user: user._id
    });
    yield blog.save();
    user.blogs = user.blogs.concat(blog._id);
    yield user.save();
    const createdBlog = yield blog_1.default.findById(blog._id).populate('user', { username: 1, name: 1 });
    return res.status(201).json(createdBlog);
})));
router.put('/:id', (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, url, likes } = helper_1.default.toNewBlog(req.body);
    const user = req.user;
    const blog = yield blog_1.default.findById(req.params.id);
    if (!blog) {
        return res.status(400).json({ error: 'blog not find' });
    }
    else if (!user) {
        return res.status(401).json({ error: 'operation not permitted' });
    }
    const updatedBlog = yield blog_1.default
        .findByIdAndUpdate(req.params.id, {
        title, author, url, likes
    }, { new: true, runValidators: true, context: 'query' })
        .populate('user', { username: 1, name: 1 });
    return res.json(updatedBlog);
})));
router.delete('/:id', (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const blog = yield blog_1.default.findById(req.params.id);
    if (!blog) {
        return res.status(400).json({ error: 'blog not find' });
    }
    else if (!user || blog.user.toString() !== user._id.toString()) {
        return res.status(401).json({ error: 'operation not permitted' });
    }
    user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString());
    yield user.save();
    yield blog.deleteOne();
    return res.status(204).end();
})));
router.post('/:id/comments', (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { comment } = helper_1.default.toNewComent(req.body);
    const blog = yield blog_1.default.findById(req.params.id);
    if (!blog) {
        return res.status(400).json({ error: 'blog not found' });
    }
    else if (!user) {
        return res.status(401).json({ error: 'operation not permitted' });
    }
    blog.comments = blog.comments.concat(comment);
    yield blog.save();
    return res.json(blog);
})));
exports.default = router;
