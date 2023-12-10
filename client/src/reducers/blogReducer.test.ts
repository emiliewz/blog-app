import blogReducer, { blogSliceState } from './blogs'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action blogs/create', () => {
    const state: blogSliceState[] = []
    const action = {
      type: 'blogs/create',
      payload: {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
})