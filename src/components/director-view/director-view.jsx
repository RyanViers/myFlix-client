import React from 'react';
import propTypes from 'prop-types';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card id="director-view">
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Bio: {director.Bio}</Card.Text>
              <Card.Text>Birthday: {director.Birth}</Card.Text>
              <Card.Text>Death: {director.Death}</Card.Text>
              <Container className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  id="director-back-button"
                  onClick={() => {
                    onBackClick();
                  }}
                >
                  Back
                </Button>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string,
    Birth: propTypes.string,
  }).isRequired,
  onBackClick: propTypes.func.isRequired,
};
