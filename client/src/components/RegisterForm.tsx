import { FormEvent, FormEventHandler } from 'react';
import { handleError, useAppDispatch, useField, useNotification } from '../app/hooks';
import { Button, Form } from 'react-bootstrap';
import { createUser } from '../reducers/users';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const name = useField('text');
  const username = useField('text');
  const password = useField('password');
  const dispatch = useAppDispatch();
  const notifyWith = useNotification();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      name: name.field.value,
      username: username.field.value,
      password: password.field.value
    };
    try {
      await dispatch(createUser(user));
      navigate('/login');
      notifyWith('Your registration was successful! Please log in.');
    } catch (error: unknown) {
      notifyWith(handleError(error));
    }
  };

  return (
    <div>
      <h2>Register the application</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            {...username.field}
          />

          <Form.Label>name:</Form.Label>
          <Form.Control
            id='name'
            {...name.field}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            {...password.field}
          />

          <Button id='register-button' type='submit' variant='primary'>
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default RegisterForm;


