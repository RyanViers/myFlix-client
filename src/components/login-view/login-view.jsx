import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Declaare hook for each input.
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //Validate user inputs.
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required!');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long.');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long.');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      //Send a request to the server for authentication.
      axios
        .post('https://ryan-viers-movie-app.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log('No Such User!');
        });
    }
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/*Code added here to display validation error.*/}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/*Code added here to display validation error.*/}
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        id="login-button"
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Link to={'/register'}>
        <Button type="submit" id="login-register-button">
          Register
        </Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  user: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    setUsername: propTypes.func,
    setPassword: propTypes.func,
  }),
};
