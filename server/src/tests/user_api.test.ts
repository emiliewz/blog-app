import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../app';
import User from '../models/user';
import { initialUsers } from './test_helper';

const api = supertest(app);

describe('users api', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('when there are users saved', () => {
    beforeEach(() => {
      initialUsers.map(async u => {
        const passwordHash = await bcrypt.hash(u.password, 10);
        const user = new User({ ...u, passwordHash });
        await user.save();
      });
    });

    test('users are returned as json', async () => {
      await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('all users are returned', async () => {
      const response = await api.get('/api/users');
      expect(response.body).toHaveLength(initialUsers.length);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});