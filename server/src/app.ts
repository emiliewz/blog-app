import express from 'express';
import blogsRouter from './controllers/blogs';
import usersRouter from './controllers/users';
import loginRouter from './controllers/login';
import mongoose from 'mongoose';
import config from './utils/config';
import cors from 'cors';
import path from 'path';
import { errorHandler, tokenExtractor, unknownEndPoint } from './utils/middleware';

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.get('/version', (_req, res) => {
  res.send('1');
});

app.get('/health', (_req, res) => {
  res.send('ok');
});

app.use(express.static(__dirname + '/../dist'));

app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.use(unknownEndPoint);
app.use(errorHandler);

export default app;