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
const app_1 = __importDefault(require("../app"));
const user_1 = __importDefault(require("../models/user"));
const test_helper_1 = require("./test_helper");
const api = (0, supertest_1.default)(app_1.default);
describe('login api', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
        const user = test_helper_1.initialUsers[0];
        yield api.post('/api/users').send(user).expect(201);
    }));
    test('login to the application', () => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = test_helper_1.initialUsers[0];
        yield api.post('/api/login')
            .send({ username, password })
            .expect(200);
    }));
    test('token and username are returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = test_helper_1.initialUsers[0];
        const result = yield api.post('/api/login')
            .send({ username, password })
            .expect('Content-Type', /application\/json/);
        expect(result.body).toHaveProperty('token' && 'username');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
