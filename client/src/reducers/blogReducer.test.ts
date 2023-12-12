import blogsReducer from './blogs';
import deepFreeze from 'deep-freeze';
import { BlogsSliceState } from '../app/types';

const initialBlogs: BlogsSliceState[] = [
  {
    id: '0',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      username: 'Alice',
      name: 'alice',
      id: '0',
      blogs: []
    },
    comments: []
  },
  {
    id: '1',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: {
      username: 'Alice',
      name: 'alice',
      id: '0',
      blogs: []
    },
    comments: []
  },
  {
    id: '2',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'Bob',
      name: 'bob',
      id: '1',
      blogs: []
    },
    comments: []
  },
  {
    id: '3',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'Bob',
      name: 'bob',
      id: '1',
      blogs: []
    },
    comments: []
  },
  {
    id: '4',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: {
      username: 'Charles',
      name: 'charles',
      id: '2',
      blogs: []
    },
    comments: []
  },
  {
    id: '5',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: {
      username: 'Charles',
      name: 'charles',
      id: '2',
      blogs: []
    },
    comments: []
  }
];

describe('blogReducer', () => {
  test('return all initial blogs with action blogs/set', () => {
    const state: BlogsSliceState[] = [];
    const action = {
      type: 'blogs/create',
      payload: initialBlogs
    };

    deepFreeze(state);
    const newState = blogsReducer(state, action);

    expect(newState).toHaveLength(initialBlogs.length);
    expect(newState).toEqual(initialBlogs);
  });

  test('returns new state with action blogs/create', () => {
    const state: BlogsSliceState[] = [];
    const action = {
      type: 'blogs/create',
      payload: initialBlogs[0],
    };

    deepFreeze(state);
    const newState = blogsReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });

  test('returns updated state with action blogs/update', () => {
    const state: BlogsSliceState[] = initialBlogs.slice(0, 4);

    const blogToUpdate = { ...initialBlogs[0], likes: 20 };

    const action = {
      type: 'blogs/update',
      payload: blogToUpdate
    };

    deepFreeze(state);
    const newState = blogsReducer(state, action);

    expect(newState).toHaveLength(4);
    expect(newState).toContainEqual(blogToUpdate);
  });

  test('delete blog with action blogs/remove', () => {
    const state: BlogsSliceState[] = initialBlogs;

    const action = {
      type: 'blogs/remove',
      payload: '2'
    };

    deepFreeze(state);
    const newState = blogsReducer(state, action);

    expect(newState).toHaveLength(initialBlogs.length - 1);
    expect(newState).not.toContainEqual(initialBlogs[2]);
  });

});