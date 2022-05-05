import React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://ryan-viers-movie-app.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' property to that movie.*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  /*When a user successfully logs in, this function updates the 'user' property in state to that 'particular user'.*/
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegistration(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    //Uncomment to test Registration Page
    //if (!user) return <RegistrationView />;

    /*If there is no user, LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView.*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    /*Before movies have been loaded.*/
    if (movies.length === 0) return <div className="main-view" />;

    /*If the state of 'selectedMovie' is not null, return that selected movie, otherwise return all movies.*/
    return (
      <Container>
        <Row className="main-view justify-content-md-center">
          {selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={3}>
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
    );
  }
}

export default MainView;
