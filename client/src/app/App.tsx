import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { initializeBlogs } from '../reducers/blogs';
import { Link, Route, Routes } from 'react-router-dom';
import { set as setUsers } from '../reducers/users';
import { set as setUser } from '../reducers/user';

import LoginForm from '../components/LoginForm';
import Blogs from '../components/Blogs';
import Blog from '../components/Blog';
import User from '../components/User';
import Users from '../components/Users';

import usersService from '../services/users';
import storageService from '../services/storage';
import Notification from '../components/Notification';
import RegisterForm from '../components/RegisterForm';
import NewBlog from '../components/NewBlog';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());

    usersService.getAll()
      .then(data => dispatch(setUsers(data)));

    const user = storageService.getUser();
    dispatch(setUser(user));
  }, []);

  return (
    <div>
      <h1> Blog App </h1>
      <Link to='/'>blogs</Link>
      <Link to='/users'>Users</Link>
      <Link to='/create'>Create</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>

      <Notification />

      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={<Users />} />
        <Route path='/create' element={<NewBlog />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </div>
  );
};

export default App;