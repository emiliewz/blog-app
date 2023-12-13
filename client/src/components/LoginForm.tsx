import { FormEvent, FormEventHandler } from 'react';
import { useAppDispatch, useField } from '../app/hooks';
import storageService from '../services/storage';
import loginService from '../services/login';
import { Button, Form } from 'react-bootstrap';
import { set } from '../reducers/user';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      storageService.saveUser(user);
      dispatch(set(user));
    } catch (exception) {
      console.log('wrong username or password');
    }
  };

  return (
    <div>
      <h2>log in to application</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            {...username}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            {...password}
          />

          <Button id='login-button' type='submit' variant='primary'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;

