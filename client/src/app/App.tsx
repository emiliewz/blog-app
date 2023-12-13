import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { set } from '../reducers/blogs';
import { Link, Route, Routes } from 'react-router-dom';
import { set as setUsers } from '../reducers/users';
import { set as setUser } from '../reducers/user';

import LoginForm from '../components/LoginForm';
import Blogs from '../components/Blogs';
import Blog from '../components/Blog';
import User from '../components/User';
import Users from '../components/Users';

import blogsService from '../services/blogs';
import usersService from '../services/users';
import storageService from '../services/storage';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    blogsService.getAll()
      .then(data => {
        dispatch(set(data));
      });
    usersService.getAll()
      .then(data => dispatch(setUsers(data)));
    const user = storageService.getUser();
    dispatch(setUser(user));
  }, []);

  return (
    <div>
      <h1>hello</h1>
      <Link to='/'>blogs</Link>
      <Link to='/users'>Users</Link>
      <Link to='/login'>Login</Link>
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;