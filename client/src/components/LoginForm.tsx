import { FormEvent, FormEventHandler } from 'react';
import { handleError, useAppDispatch, useField, useNotification } from '../app/hooks';
import { Button, Form } from 'react-bootstrap';
import { loginWith } from '../reducers/user';
import { LoginEntry } from '../app/types';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const dispatch = useAppDispatch();
  const notifyWith = useNotification();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const credentials: LoginEntry = {
      username: username.value,
      password: password.value
    };
    try {
      await dispatch(loginWith(credentials));
      navigate('/');
    } catch (error: unknown) {
      notifyWith(handleError(error));
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

