import { FormEvent, FormEventHandler } from 'react';
import { useAppDispatch, useField } from '../app/hooks';
import { Button, Form } from 'react-bootstrap';
import { set } from '../reducers/user';
import storageService from '../services/storage';
import usersService from '../services/users';

const RegisterForm = () => {
  const name = useField('text');
  const username = useField('text');
  const password = useField('password');
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await usersService.create({
        name: name.value,
        username: username.value,
        password: password.value
      });
      storageService.saveUser(user);
      dispatch(set(user));
    } catch (exception) {
      console.log('something wrong happened');
    }
  };

  return (
    <div>
      <h2>Register the application</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>name:</Form.Label>
          <Form.Control
            id='name'
            {...name}
          />

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

          <Button id='register-button' type='submit' variant='primary'>
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default RegisterForm;


