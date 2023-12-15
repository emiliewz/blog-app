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
exports.asyncHandler = exports.errorHandler = exports.unknownEndPoint = exports.userExtractor = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("./logger"));
const asyncHandler = (fn) => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};
exports.asyncHandler = asyncHandler;
const getTokenFrom = (req) => {
    const authorization = req.get('authorization');
    const token = authorization && authorization.startsWith('Bearer ')
        ? authorization.replace('Bearer ', '')
        : null;
    return token;
};
const tokenExtractor = (req, _res, next) => {
    req.token = getTokenFrom(req);
    next();
};
exports.tokenExtractor = tokenExtractor;
// eslint-disable-next-line @typescript-eslint/no-misused-promises
const userExtractor = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getTokenFrom(req);
    if (token) {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
        if (!decodedToken.id) {
            res.status(401).json({ error: 'token invalid' });
        }
        else {
            const user = yield user_1.default.findById(decodedToken.id);
            req.user = user;
        }
    }
    next();
}));
exports.userExtractor = userExtractor;
const unknownEndPoint = (_req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
exports.unknownEndPoint = unknownEndPoint;
const errorHandler = (error, _req, res, next) => {
    logger_1.default.error(error.message);
    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ error: 'invalid token' });
    }
    else if (error.name === 'TokenExpiredError') {
        res.status(401).json({ error: 'token expired' });
    }
    else if (error.name === 'DataEntryError') {
        res.status(400).json({ error: error.message });
    }
    next(error);
};
exports.errorHandler = errorHandler;
