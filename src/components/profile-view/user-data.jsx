import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';

export function UserData({ userdata }) {
  return (
    <Card id="update-form" border="none" style={{ textAlign: 'center' }}>
      <Card.Title style={{ marginTop: 10 }}>Profile Card</Card.Title>
      <Card.Body
        id="update-form"
        border="none"
        style={{ textAlign: 'left', marginTop: 20 }}
      >
        <p>Username: {userdata.Username}</p>
        <p>Email: {userdata.Email}</p>
        <p>Birthday: {userdata.Birthday}</p>
      </Card.Body>
    </Card>
  );
}
