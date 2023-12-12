import { useEffect } from 'react';
import Blogs from '../components/Blogs';
import blogsService from '../services/blogs';
import { useAppDispatch } from './hooks';
import { set } from '../reducers/blogs';
import { Route, Routes } from 'react-router-dom';
import Blog from '../components/Blog';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    blogsService.getAll()
      .then(data => {
        dispatch(set(data));
      });
  }, []);

  return (
    <div>
      <h1>hello</h1>

      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;