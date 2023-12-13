import { useField } from '../app/hooks';
import { Button, Form } from 'react-bootstrap';

const RegisterForm = () => {
  const name = useField('text');
  const username = useField('text');
  const password = useField('password');

  return (
    <div>
      <h2>Register the application</h2>

      <Form>
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


