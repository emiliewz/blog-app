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
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const helper_1 = __importDefault(require("../utils/helper"));
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
router.get('/', ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({})
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });
    res.json(users);
})));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, password } = helper_1.default.toNewUser(req.body);
    if (!password || password.length < 6) {
        return res.status(400).json({
            error: '`password` is shorter than the minimum allowed length (6)'
        });
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const user = new user_1.default({
        username, name, passwordHash
    });
    const savedUser = yield user.save();
    return res.status(201).json(savedUser);
})));
exports.default = router;
