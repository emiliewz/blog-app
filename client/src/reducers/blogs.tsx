import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface blogSliceState {
  title: string,
  author: string,
  url: string,
  likes: number,
  comments: string[],
  user: string,
  id: number
}

export const initialState: blogSliceState[] = [
  {
    id: 0,
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: 'Alice',
    comments: []
  },
  {
    id: 1,
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: 'Alice',
    comments: []
  },
  {
    id: 2,
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: 'Bob',
    comments: []
  },
  {
    id: 3,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: 'Bob',
    comments: []
  },
  {
    id: 4,
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: 'Charles',
    comments: []
  },
  {
    id: 5,
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: 'Charles',
    comments: []
  }
];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    set(_state, { payload }: PayloadAction<blogSliceState[]>) {
      return payload;
    },
    create(state, { payload }: PayloadAction<blogSliceState>) {
      return state.concat(payload);
    },
    update(state, { payload }: PayloadAction<blogSliceState>) {
      return state.map(b => b.id !== payload.id ? b : payload);
    },
    remove(state, { payload }: PayloadAction<number>) {
      const id = payload;
      return state.filter(b => b.id !== id);
    }
  }
});

export const { set, create, update, remove } = blogSlice.actions;
export default blogSlice.reducer;