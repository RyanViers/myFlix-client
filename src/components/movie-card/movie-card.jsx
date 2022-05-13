import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, CardGroup, Card, Button } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container>
        <CardGroup>
          <Card id="movie-card">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title id="card-title">{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="primary">Open</Button>
              </Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    ImagePath: propTypes.string.isRequired,
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
  }).isRequired,
};
