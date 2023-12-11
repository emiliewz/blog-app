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

  test('return new state with action users/create', () => {
    const state: usersSliceState[] = [];
    const action = {
      type: 'users/create',
      payload: initialState[0],
    };

    deepFreeze(state);
    const newState = usersReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(initialState[0]);
  });

  test('return updated state with action users/update', () => {
    const state: usersSliceState[] = initialState.slice(0, 2);

    const userToUpdate = { ...initialState[1], name: 'Linda' };

    const action = {
      type: 'users/update',
      payload: userToUpdate
    };

    deepFreeze(state);
    const newState = usersReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(userToUpdate);
    expect(newState).not.toContainEqual(initialState[1]);
  });

});