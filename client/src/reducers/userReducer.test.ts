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
});


