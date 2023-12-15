import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { initializeBlogs } from '../reducers/blogs';
import { Link, Route, Routes } from 'react-router-dom';
import { initializeUsers } from '../reducers/users';
import { initializeUser } from '../reducers/user';

import LoginForm from '../components/LoginForm';
import Blogs from '../components/Blogs';
import Blog from '../components/Blog';
import User from '../components/User';
import Users from '../components/Users';

import Notification from '../components/Notification';
import RegisterForm from '../components/RegisterForm';
import NewBlog from '../components/NewBlog';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(initializeUser());
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