import React from 'react';
import propTypes from 'prop-types';
import './movie-view.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col className="justify-content-md-center">
            <Card id="movie-view">
              <Card.Body>
                <Card.Img
                  id="movie-view-image"
                  variant="top"
                  src={movie.ImagePath}
                />
                <Card.Title id="movie-title" className="movie-title">
                  {movie.Title}
                </Card.Title>
                <Card.Text id="movie-description" className="movie-description">
                  {movie.Description}
                </Card.Text>
                <Card.Text id="movie-genre" className="movie-genre">
                  Genre: {movie.Genre.Name}
                </Card.Text>
                <Card.Text id="movie-director" className="movie-director">
                  Director: {movie.Director.Name}
                </Card.Text>
                <Button
                  id="movie-view-button"
                  onClick={() => {
                    onBackClick(null);
                  }}
                >
                  Back
                </Button>
                <Button id="movie-view-button" onClick={() => {}}>
                  Add To Favorite Movies
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
      BirthYear: propTypes.number.isRequired,
    }),
    Actors: propTypes.array.isRequired,
    ImagePath: propTypes.string.isRequired,
  }).isRequired,
};
