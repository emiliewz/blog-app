import deepFreeze from 'deep-freeze';
import userReducer from './user';
import { UserSliceState } from '../app/types';

const initialUsers: UserSliceState[] = [
  {
    name: 'Alice',
    username: 'alice',
    token: 'this is a fake token'
  },
  {
    name: 'Bob',
    username: 'bob',
    token: 'this is a fake token'
  },
];

describe('userReducer', () => {
  test('return a new user with action user/set', () => {
    const state: UserSliceState | null = null;

    const action = {
      type: 'user/set',
      payload: initialUsers[0]
    };

    const newState: UserSliceState | null = userReducer(state, action);
    expect(newState).toEqual(initialUsers[0]);
  });

  test('return null with action user/clear', () => {
    const state: UserSliceState | null = initialUsers[1];

    const action = {
      type: 'user/clear',
      payload: initialUsers[0]
    };

    deepFreeze(state);
    const newState: UserSliceState | null = userReducer(state, action);

    expect(newState).toBeNull();
  });

});


