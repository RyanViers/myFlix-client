import React, { useState } from 'react';
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
                  <Form.Group>
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
                  </Form.Group>

                  <Form.Group>
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
                  </Form.Group>

                  <Form.Group>
                    <Form.Label id="registration-form-label">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label id="registration-form-label">
                      Birthday
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    id="register-button"
                    className="registerButton"
                    type="submit"
                  >
                    Register
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
  }).isRequired,
  onRegistration: propTypes.func.isRequired,
};
