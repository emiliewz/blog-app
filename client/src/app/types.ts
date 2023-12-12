export interface BlogsSliceState extends BaseBlog{
  likes: number,
  comments: string[],
  user: UsersSliceState,
  id: string
}

export interface BaseBlog {
  title: string,
  author: string,
  url: string,
  likes?: number,
}

export interface UsersSliceState {
  username: string,
  password?: string,
  name: string
  id: string
  blogs: BlogsSliceState[]
}

export interface UserSliceState {
  name: string,
  username: string,
  token: string,
}