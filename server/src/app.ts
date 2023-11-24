import express from 'express';
import blogsRouter from './controllers/blogs';
import mongoose from 'mongoose';
import config from './utils/config';

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });


app.use('/api/blogs', blogsRouter);

app.get('/version', (_req, res) => {
  res.send('1');
});

export default app;