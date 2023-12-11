import usersReducer, { usersSliceState, initialState } from './users';
import deepFreeze from 'deep-freeze';

describe('usersReducer', () => {
  test('return all initial users with action users/set', () => {
    const state: usersSliceState[] = [];
    const action = {
      type: 'users/set',
      payload: initialState
    };

    deepFreeze(state);
    const newState = usersReducer(state, action);

    expect(newState).toHaveLength(initialState.length);
    expect(newState).toEqual(initialState);
  });

});