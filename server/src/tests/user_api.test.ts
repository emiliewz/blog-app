import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../app';
import User from '../models/user';
import { initialUsers, usersInDb } from './test_helper';

const api = supertest(app);

describe('users api', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('when there are users saved', () => {
    beforeEach(async () => {
      await Promise.all(initialUsers.map(async u => {
        const passwordHash = await bcrypt.hash(u.password, 10);
        const user = new User({ ...u, passwordHash });
        await user.save();
      }));
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

  describe('creation of a new user', () => {
    test('succeeds with valid username and password', async () => {
      const user = initialUsers[0];
      await api.post('/api/users').send(user).expect(201);

      const users = await usersInDb();
      expect(users).toHaveLength(1);
      const usernames = users.map(u => u.username);
      expect(usernames).toContain(initialUsers[0].username);
    });

    test('fails with a proper error if username is too short or missing', async () => {
      const user = { username: 'em', name: 'test', password: 'test55' };
      const result = await api.post('/api/users').send(user).expect(400);
      expect(result.body.error).toContain('User validation failed: username: Path `username` (`em`) is shorter than the minimum allowed length (3).');

      const newUser = { name: 'test', password: 'test55' };
      const newResult = await api.post('/api/users').send(newUser).expect(400);
      expect(newResult.body.error).toContain('Incorrect data: some fields are missing');
    });

    test('fails with proper statuscode and message if username already taken', async () => {
      let user = {
        username: 'root',
        name: 'testName',
        password: 'testPwd',
      };

      await api.post('/api/users').send(user).expect(201);
      user = {
        username: 'root',
        name: 'testName1',
        password: 'testPwd1',
      };

      const result = await api.post('/api/users').send(user).expect(400);
      expect(result.body.error).toContain('expected `username` to be unique');
    });

    test('fails with a proper error if password is too short or missing', async () => {
      const user = {
        username: 'testUsername',
        name: 'testName',
        password: 'se',
      };

      let result = await api.post('/api/users').send(user).expect(400);
      expect(result.body.error).toContain('`password` is shorter than the minimum allowed length (6)');

      const newUser = { name: 'testName', username: 'testUsername' };
      result = await api.post('/api/users').send(newUser).expect(400);
      expect(result.body.error).toContain('Incorrect data: some fields are missing');
    });

  });
});

afterAll(async () => {
  await mongoose.connection.close();
});