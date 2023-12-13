import { useEffect } from 'react';
import Blogs from '../components/Blogs';
import blogsService from '../services/blogs';
import { useAppDispatch } from './hooks';
import { set } from '../reducers/blogs';
import { Link, Route, Routes } from 'react-router-dom';
import Blog from '../components/Blog';
import User from '../components/User';
import Users from '../components/Users';
import usersService from '../services/users';
import { set as setUsers } from '../reducers/users';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    blogsService.getAll()
      .then(data => {
        dispatch(set(data));
      });
    usersService.getAll()
      .then(data => dispatch(setUsers(data)));
  }, []);

  return (
    <div>
      <h1>hello</h1>
      <Link to='/'>blogs</Link>
      <Link to='/users'>Users</Link>
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;