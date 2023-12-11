import deepFreeze from 'deep-freeze';
import userReducer, { userSliceState } from './user';

const initialUsers: userSliceState[] = [
  {
    username: 'Alice',
    name: 'alice',
    token: 'this is a fake token'
  },
  {
    username: 'Bob',
    name: 'bob',
    token: 'this is a fake token'
  },
];

describe('userReducer', () => {
  test('return a new user with action user/set', () => {
    const state = null;

    const action = {
      type: 'user/set',
      payload: initialUsers[0]
    };

    const newState = userReducer(state, action);
    expect(newState).toEqual(initialUsers[0]);
  });

  test('return null with action user/clear', () => {
    const state = initialUsers[1];

    const action = {
      type: 'user/clear',
      payload: initialUsers[0]
    };

    deepFreeze(state);
    const newState = userReducer(state, action);

    expect(newState).toBeNull();
  });

});


