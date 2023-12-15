import { useEffect } from 'react';
import { useAppSelector, useInitialization } from './hooks';
import { Link, Route, Routes } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import Blogs from '../components/Blogs';
import Blog from '../components/Blog';
import User from '../components/User';
import Users from '../components/Users';

import Notification from '../components/Notification';
import RegisterForm from '../components/RegisterForm';
import NewBlog from '../components/NewBlog';
import { Container, Nav, Navbar } from 'react-bootstrap';

const App = () => {
  const initializer = useInitialization();
  const user = useAppSelector(({ user }) => user);

  useEffect(() => initializer(), []);

  return (
    <div className='container'>
      <Navbar bg='dark' expand='lg' data-bs-theme='dark' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand as={Link} to='/'>Blog App</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/'>Blogs</Nav.Link>
              {user && <><Nav.Link as={Link} to='/create'>Add</Nav.Link>
                <Nav.Link as={Link} to='/users'>Users</Nav.Link></>}
              {!user && (<><Nav.Link as={Link} to='/login'>Login</Nav.Link>
                <Nav.Link as={Link} to='/register'>Register</Nav.Link></>)}
            </Nav>
          </Navbar.Collapse>

          {user && (<>
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                Signed in as: {user?.name}
              </Navbar.Text>
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