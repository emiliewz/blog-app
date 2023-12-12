import { UsersSliceState } from '../app/types';
import usersReducer from './users';
import deepFreeze from 'deep-freeze';

const initialUsers: UsersSliceState[] = [
  {
    name: 'Alice',
    username: 'alice',
    id: '0',
    blogs: []
  },
  {
    name: 'Bob',
    username: 'bob',
    id: '1',
    blogs: []
  },
  {
    name: 'Charles',
    username: 'charles',
    id: '2',
    blogs: []
  }
];

describe('usersReducer', () => {
  test('return all initial users with action users/set', () => {
    const state: UsersSliceState[] = [];
    const action = {
      type: 'users/set',
      payload: initialUsers
    };

    deepFreeze(state);
    const newState = usersReducer(state, action);

    expect(newState).toHaveLength(initialUsers.length);
    expect(newState).toEqual(initialUsers);
  });

  test('return new state with action users/create', () => {
    const state: UsersSliceState[] = [];
    const action = {
      type: 'users/create',
      payload: initialUsers[0],
    };

    deepFreeze(state);
    const newState = usersReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(initialUsers[0]);
  });

  test('return updated state with action users/update', () => {
    const state: UsersSliceState[] = initialUsers.slice(0, 2);

    const userToUpdate = { ...initialUsers[1], name: 'Linda' };

    const action = {
      type: 'users/update',
      payload: userToUpdate
    };

    deepFreeze(state);
    const newState = usersReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(userToUpdate);
    expect(newState).not.toContainEqual(initialUsers[1]);
  });

  test('delete user with action users/remove', () => {
    const state: UsersSliceState[] = initialUsers;
    const action = {
      type: 'users/remove',
      payload: '2'
    };

    deepFreeze(state);
    const newState = usersReducer(state, action);

    expect(newState).toHaveLength(initialUsers.length - 1);
    expect(newState).not.toContainEqual(initialUsers[2]);
  });

});