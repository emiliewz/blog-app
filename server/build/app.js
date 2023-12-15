"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogs_1 = __importDefault(require("./controllers/blogs"));
const users_1 = __importDefault(require("./controllers/users"));
const login_1 = __importDefault(require("./controllers/login"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const middleware_1 = require("./utils/middleware");
const app = (0, express_1.default)();
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(config_1.default.MONGODB_URI)
    .then(() => {
    console.log('connected to MongoDB');
})
    .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
});
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(middleware_1.tokenExtractor);
app.use('/api/login', login_1.default);
app.use('/api/blogs', blogs_1.default);
app.use('/api/users', users_1.default);
app.get('/version', (_req, res) => {
    res.send('1');
});
app.use(express_1.default.static(__dirname + '/../dist'));
app.get('/*', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname + '/../dist/index.html'));
});
app.use(middleware_1.unknownEndPoint);
app.use(middleware_1.errorHandler);
exports.default = app;
