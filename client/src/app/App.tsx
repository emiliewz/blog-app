import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { initializeBlogs } from '../reducers/blogs';
import { Link, Route, Routes } from 'react-router-dom';
import { initializeUsers } from '../reducers/users';
import { initializeUser, logOut } from '../reducers/user';

import LoginForm from '../components/LoginForm';
import Blogs from '../components/Blogs';
import Blog from '../components/Blog';
import User from '../components/User';
import Users from '../components/Users';

import Notification from '../components/Notification';
import RegisterForm from '../components/RegisterForm';
import NewBlog from '../components/NewBlog';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(initializeUser());
  }, []);

  return (
    <div className='container'>
      <Navbar bg='dark' expand='lg' data-bs-theme='dark' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand as={Link} to='/'>Blog App</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/'>Blogs</Nav.Link>
              <Nav.Link as={Link} to='/create'>Create</Nav.Link>
              <Nav.Link as={Link} to='/users'>Users</Nav.Link>
              {!user && (<><Nav.Link as={Link} to='/login'>Login</Nav.Link>
                <Nav.Link as={Link} to='/register'>Register</Nav.Link></>)}
            </Nav>
          </Navbar.Collapse>

          {user && (<>
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                Signed in as: {user?.name}
              </Navbar.Text>
              <Button className='ms-2' variant='outline-success' onClick={() => dispatch(logOut())}>LogOut</Button>
            </Navbar.Collapse>
            <Navbar.Toggle />
          </>)}
        </Container>
      </Navbar>
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
    </div >
  );
};

export default App;