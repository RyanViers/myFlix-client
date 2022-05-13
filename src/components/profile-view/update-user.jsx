import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

export function UpdateUser(props) {
  const user = props.userdata;
  const { handleSubmit, handleUpdate } = props;

  return (
    <Container>
      <Card id="update-form" border="none" style={{ textAlign: 'left' }}>
        <Card.Title style={{ marginTop: 10, textAlign: 'center' }}>
          Update Profile
        </Card.Title>

        <Form
          className="profile-form"
          onSubmit={(e) => handleSubmit(e)}
          border="none"
          style={{ margin: 20 }}
        >
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="Username"
              defaultValue={user.Username}
              onChange={(e) => handleUpdate(e)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              name="Password"
              placeholder="New Password (required when updating profile info)"
              onChange={(e) => handleUpdate(e)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="Email"
              defaultValue={user.Email}
              onChange={(e) => handleUpdate(e)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Update
          </Button>
          <h5>After update, please log out, then log back in</h5>
        </Form>
      </Card>
    </Container>
  );
}
