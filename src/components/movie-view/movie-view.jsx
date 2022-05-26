import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFavorite } from '../../actions/actions';
import { Link } from 'react-router-dom';
import './movie-view.scss';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { user, userData, movie, onBackClick, addFavoriteMovie } = this.props;

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
                    onBackClick();
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="secondary"
                  id="movie-view-button"
                  onClick={() => {
                    addFavoriteMovie(movie, userData);
                    alert('Added to Favorites');
                  }}
                >
                  Add To Favorite Movies
                </Button>

                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link" id="movie-view-button">
                    Director
                  </Button>
                </Link>

                <Link to={`/genre/${movie.Genre.Name}`}>
                  <Button variant="link" id="movie-view-button">
                    Genre
                  </Button>
                </Link>
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
    }).isRequired,
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string,
      BirthYear: propTypes.string,
    }).isRequired,
    Actors: propTypes.array.isRequired,
    ImagePath: propTypes.string.isRequired,
  }).isRequired,
  onBackClick: propTypes.func.isRequired,
};
