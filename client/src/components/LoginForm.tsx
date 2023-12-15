import { FormEvent, FormEventHandler } from 'react';
import { useAppDispatch, useField } from '../app/hooks';
import { Button, Form } from 'react-bootstrap';
import { loginWith } from '../reducers/user';
import { LoginEntry } from '../app/types';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const credentials: LoginEntry = {
      username: username.value,
      password: password.value
    };
    dispatch(loginWith(credentials));
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

