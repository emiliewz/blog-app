import blogReducer, { blogSliceState, initialState } from './blogs';
import deepFreeze from 'deep-freeze';

describe('blogReducer', () => {
  test('return all initial blogs with action blogs/set', () => {
    const state: blogSliceState[] = [];
    const action = {
      type: 'blogs/create',
      payload: initialState
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(initialState.length);
    expect(newState).toEqual(initialState);
  });

  test('returns new state with action blogs/create', () => {
    const state: blogSliceState[] = [];
    const action = {
      type: 'blogs/create',
      payload: initialState[0],
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });


});