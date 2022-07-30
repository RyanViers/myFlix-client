import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addFavorite } from '../../actions/actions';
import { Link } from 'react-router-dom';
import './movie-view.scss';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

class MovieView extends React.Component {
  render() {
    const { userData, movie, onBackClick, favoriteMovies } = this.props;

    const addFavoriteMovie = (movie, userData, favoriteMovies) => {
      const token = localStorage.getItem('token');
      const addedMovie = favoriteMovies.filter((m) =>
        m._id.includes(movie._id)
      );

      if (addedMovie.length > 0) {
        alert('Movie is already a favorite.');
        return;
      } else {
        axios
          .post(
            `https://ryan-viers-movie-app.herokuapp.com/users/${userData.Username}/movies/${movie._id}`,
            {
              FavoriteMovies: movie._id,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(() => {
            this.props.addFavorite(movie);
            alert('Movie Added to Favorites.');
          })
          .catch((e) => {
            console.error(e);
            alert('Unable to add movie to list.');
          });
      }
    };

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
                    addFavoriteMovie(movie, userData, favoriteMovies);
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

export default connect(null, { addFavorite })(MovieView);
