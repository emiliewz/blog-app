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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const blog_1 = __importDefault(require("../models/blog"));
const user_1 = __importDefault(require("../models/user"));
const test_helper_1 = require("./test_helper");
const api = (0, supertest_1.default)(app_1.default);
describe('blogs api', () => {
    let authHeader;
    let token;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
        const user = test_helper_1.initialUsers[0];
        yield api.post('/api/users').send(user);
        const response = yield api.post('/api/login').send(user);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        token = response.body.token;
        // both of those two, token || authHeader, are ok to set authorization in request header
        authHeader = `Bearer ${response.body.token}`;
    }));
    describe('a new blog', () => {
        const blog = test_helper_1.initialBlogs[2];
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield blog_1.default.deleteMany({});
        }));
        test('can be added', () => __awaiter(void 0, void 0, void 0, function* () {
            yield api.post('/api/blogs')
                .set('Authorization', authHeader)
                .send(blog)
                .expect(201)
                .expect('Content-Type', /application\/json/);
            const blogs = yield (0, test_helper_1.blogsInDb)();
            expect(blogs).toHaveLength(1);
            const titles = blogs.map(r => r.title);
            expect(titles).toContain(blog.title);
        }));
        test('has field id', () => __awaiter(void 0, void 0, void 0, function* () {
            yield api.post('/api/blogs')
                .set('Authorization', authHeader)
                .send(blog)
                .expect(201);
            const blogs = yield api.get('/api/blogs');
            expect(blogs.body[0].id).toBeDefined();
        }));
        test('has likes initialized to 0 if initial value is not given', () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            };
            const response = yield api
                .post('/api/blogs')
                .auth(token, { type: 'bearer' })
                .send(blog)
                .expect(201);
            expect(response.body.likes).toBe(0);
        }));
        test('if title is missing, creation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = {
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            };
            yield api.post('/api/blogs')
                .auth(token, { type: 'bearer' })
                .send(blog)
                .expect(400);
        }));
        test('if author is missing, creation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = {
                title: 'Go To Statement Considered Harmful',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            };
            yield api
                .post('/api/blogs')
                .set('Authorization', authHeader)
                .send(blog)
                .expect(400);
        }));
        test('fails with status code 401 if a token is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const blog = test_helper_1.initialBlogs[2];
            const result = yield api.post('/api/blogs')
                .send(blog)
                .expect(401);
            expect(result.body.error).toContain('operation not permitted');
        }));
    });
    describe('when there are blogs saved', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield blog_1.default.deleteMany({});
            yield Promise.all(test_helper_1.initialBlogs.map(blog => api.post('/api/blogs')
                .set('Authorization', authHeader)
                .send(blog)));
        }));
        test('blogs are returned as json', () => __awaiter(void 0, void 0, void 0, function* () {
            yield api.get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/);
        }));
        test('all blogs are returned', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.get('/api/blogs');
            expect(response.body).toHaveLength(test_helper_1.initialBlogs.length);
        }));
    });
    describe('a blog', () => {
        let id;
        let blogsBefore;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield blog_1.default.deleteMany({});
            yield api.post('/api/blogs')
                .set('Authorization', authHeader)
                .send(test_helper_1.initialBlogs[3]);
            blogsBefore = yield (0, test_helper_1.blogsInDb)();
            id = blogsBefore[0]._id.toString();
        }));
        test('can be edited', () => __awaiter(void 0, void 0, void 0, function* () {
            const modifiedBlog = { title: 'new title', author: 'author', url: 'url', likes: 12 };
            yield api.put(`/api/blogs/${id}`)
                .set('Authorization', authHeader)
                .send(modifiedBlog)
                .expect(200);
        }));
        test('can be deleted by the creator', () => __awaiter(void 0, void 0, void 0, function* () {
            yield api
                .delete(`/api/blogs/${id}`)
                .auth(token, { type: 'bearer' })
                .expect(204);
            const blogsAfter = yield (0, test_helper_1.blogsInDb)();
            expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
        }));
        test('can not be deleted without valid auth header', () => __awaiter(void 0, void 0, void 0, function* () {
            yield api
                .delete(`/api/blogs/${id}`)
                .expect(401);
            const blogsAfter = yield (0, test_helper_1.blogsInDb)();
            expect(blogsAfter).toHaveLength(blogsBefore.length);
        }));
        test('can not be deleted by other user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = test_helper_1.initialUsers[1];
            yield api.post('/api/users').send(user);
            const response = yield api.post('/api/login').send(user).expect(200);
            const newAuthHeader = `Bearer ${response.body.token}`;
            yield api
                .delete(`/api/blogs/${id}`)
                .set('Authorization', newAuthHeader)
                .expect(401);
            const blogsAfter = yield (0, test_helper_1.blogsInDb)();
            expect(blogsAfter).toHaveLength(blogsBefore.length);
        }));
        describe('a comment', () => {
            const comment = 'Your perspective is eye-opening.';
            test('can be posted on a blog with a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
                yield api
                    .post(`/api/blogs/${id}/comments`)
                    .set('Authorization', authHeader)
                    .send({ comment })
                    .expect(200);
            }));
            test('can not be posted if a token is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
                yield api
                    .post(`/api/blogs/${id}/comments`)
                    .send({ comment })
                    .expect(401);
            }));
        });
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
