import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type blogSliceState = {
  title: string,
  author: string,
  url: string,
  likes: number,
  id: number
};

export const initialState = [
  {
    id: 1,
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    id: 2,
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    id: 3,
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    id: 4,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: 5,
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    id: 6,
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
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
    }
  }
});

export const { set, create, update } = blogSlice.actions;
export default blogSlice.reducer;