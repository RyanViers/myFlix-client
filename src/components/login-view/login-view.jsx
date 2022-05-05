import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    //Send a request to the server for authentication.

    //Then call props.onLoggedIn(username).
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        id="login-button"
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Button type="submit" id="login-register-button">
        Register
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
  }),
  onLoggedIn: propTypes.func.isRequired,
};
