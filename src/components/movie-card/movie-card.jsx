import React from 'react';
import propTypes from 'prop-types';
import './movie-card.scss';
import { Container, CardGroup, Card, Button } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Container>
        <CardGroup>
          <Card id="movie-card">
            <Card.Img variant="top" src={movie.ImagePath} crossOrigin />
            <Card.Body>
              <Card.Title id="card-title">{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button onClick={() => onMovieClick(movie)} variant="primary">
                Open
              </Button>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
    }),
    ImagePath: propTypes.string.isRequired,
  }).isRequired,
  onMovieClick: propTypes.func.isRequired,
};
