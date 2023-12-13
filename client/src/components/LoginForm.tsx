import { useField } from '../app/hooks';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');

  return (
    <div>
      <h2>log in to application</h2>

      <Form>
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

