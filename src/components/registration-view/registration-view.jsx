import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import './registration-view.scss';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardGroup,
} from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  //Declare hook for each input.
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  /*Validate user inputs.*/
  const validate = () => {
    let isReq = true;

    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required.' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({
        ...values,
        usernameErr: 'Username must be 2 characters long.',
      });
      isReq = false;
    }

    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required.' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: 'Password must be 6 characters long.',
      });
      isReq = false;
    }

    if (!email) {
      setValues({ ...values, emailErr: 'Email Required.' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Please enter a valid email address.' });
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('http://movie-api-dev.us-east-1.elasticbeanstalk.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          alert('Registration successful, please login!');
          window.open('/', '_self'); //Argument '_self" is necessary so page will open in the current tab.
        })
        .catch((response) => {
          console.error(response);
          alert('Unable to register.');
        });
    }
  };

  return (
    <Container id="registration-form">
      <Row>
        <Col>
          <CardGroup>
            <Card id="registration-card">
              <Card.Body>
                <Card.Title id="registration-card-title">
                  Register Here!
                </Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label id="registration-form-label">
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Username"
                    />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label id="registration-form-label">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Password"
                    />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="Email">
                    <Form.Label id="registration-form-label">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                    />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="updateBirthday">
                    <Form.Label id="registration-form-label">
                      Birthday
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    id="register-button"
                    className="registerButton"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.string.isRequired,
  }),
  setUsername: propTypes.func,
  setPassword: propTypes.func,
  setEmail: propTypes.func,
  setBirthday: propTypes.func,
};
