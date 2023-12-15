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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = __importDefault(require("../app"));
const user_1 = __importDefault(require("../models/user"));
const test_helper_1 = require("./test_helper");
const api = (0, supertest_1.default)(app_1.default);
describe('users api', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
    }));
    describe('when there are users saved', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.all(test_helper_1.initialUsers.map((u) => __awaiter(void 0, void 0, void 0, function* () {
                const passwordHash = yield bcrypt_1.default.hash(u.password, 10);
                const user = new user_1.default(Object.assign(Object.assign({}, u), { passwordHash }));
                yield user.save();
            })));
        }));
        test('users are returned as json', () => __awaiter(void 0, void 0, void 0, function* () {
            yield api.get('/api/users')
                .expect(200)
                .expect('Content-Type', /application\/json/);
        }));
        test('all users are returned', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.get('/api/users');
            expect(response.body).toHaveLength(test_helper_1.initialUsers.length);
        }));
    });
    describe('creation of a new user', () => {
        test('succeeds with valid username and password', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = test_helper_1.initialUsers[0];
            yield api.post('/api/users').send(user).expect(201);
            const users = yield (0, test_helper_1.usersInDb)();
            expect(users).toHaveLength(1);
            const usernames = users.map(u => u.username);
            expect(usernames).toContain(test_helper_1.initialUsers[0].username);
        }));
        test('fails with a proper error if username is too short or missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = { username: 'em', name: 'test', password: 'test55' };
            const result = yield api.post('/api/users').send(user).expect(400);
            expect(result.body.error).toContain('User validation failed: username: Path `username` (`em`) is shorter than the minimum allowed length (3).');
            const newUser = { name: 'test', password: 'test55' };
            const newResult = yield api.post('/api/users').send(newUser).expect(400);
            expect(newResult.body.error).toContain('Incorrect data: some fields are missing');
        }));
        test('fails with proper statuscode and message if username already taken', () => __awaiter(void 0, void 0, void 0, function* () {
            let user = {
                username: 'root',
                name: 'testName',
                password: 'testPwd',
            };
            yield api.post('/api/users').send(user).expect(201);
            user = {
                username: 'root',
                name: 'testName1',
                password: 'testPwd1',
            };
            const result = yield api.post('/api/users').send(user).expect(400);
            expect(result.body.error).toContain('expected `username` to be unique');
        }));
        test('fails with a proper error if password is too short or missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                username: 'testUsername',
                name: 'testName',
                password: 'se',
            };
            let result = yield api.post('/api/users').send(user).expect(400);
            expect(result.body.error).toContain('`password` is shorter than the minimum allowed length (6)');
            const newUser = { name: 'testName', username: 'testUsername' };
            result = yield api.post('/api/users').send(newUser).expect(400);
            expect(result.body.error).toContain('Incorrect data: some fields are missing');
        }));
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
