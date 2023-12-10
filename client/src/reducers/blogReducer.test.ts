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

  test('returns updated state with action blogs/update', () => {
    const state: blogSliceState[] = initialState.slice(0, 4);

    const blogToUpdate = {
      id: 0,
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 20,
    };

    const action = {
      type: 'blogs/update',
      payload: blogToUpdate
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(4);
    expect(newState).toContainEqual(blogToUpdate);
  });

  test('delete blog with action blogs/remove', () => {
    const state: blogSliceState[] = initialState;

    const action = {
      type: 'blogs/remove',
      payload: 2
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(initialState.length - 1);
    expect(newState).not.toContainEqual(initialState[2]);
  });

});