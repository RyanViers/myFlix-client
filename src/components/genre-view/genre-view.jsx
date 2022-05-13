import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card id="genre-view">
              <Card.Body>
                <Card.Title>{genre.Name}</Card.Title>
                <Card.Text>Description: {genre.Description}</Card.Text>
                <Button
                  id="genre-back-button"
                  onClick={() => {
                    onBackClick();
                  }}
                >
                  Back
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
  }).isRequired,
  onBackClick: propTypes.func.isRequired,
};
