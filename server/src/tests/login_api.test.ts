import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import User from '../models/user';
import { initialUsers } from './test_helper';

const api = supertest(app);

describe('login api', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = initialUsers[0];
    await api.post('/api/users').send(user).expect(201);
  });

  test('login to the application', async () => {
    const { username, password } = initialUsers[0];
    await api.post('/api/login')
      .send({ username, password })
      .expect(200);
  });

  test('token and username are returned', async () => {
    const { username, password } = initialUsers[0];
    const result = await api.post('/api/login')
      .send({ username, password })
      .expect('Content-Type', /application\/json/);

    expect(result.body).toHaveProperty('token' && 'username');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});