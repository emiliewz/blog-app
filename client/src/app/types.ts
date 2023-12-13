export interface BlogsSliceState extends BaseBlog {
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

interface BaseUser {
  name: string,
  username: string,
}

export interface UsersSliceState extends BaseUser {
  password?: string,
  id: string
  blogs: BlogsSliceState[]
}

export interface UserEntry extends BaseUser {
  password: string,
}

export interface UserSliceState extends BaseUser {
  token: string,
}

export interface LoginEntry {
  username: string,
  password: string
}