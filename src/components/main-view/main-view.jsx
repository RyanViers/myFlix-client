import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setUser, setUserData } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { Container, Row, Col } from 'react-bootstrap';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar-view/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Redirect } from 'react-router-dom';
import { UpdateUser } from '../profile-view/update-user';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      /*const { setUser } = this.props;
      setUser(localStorage.getItem('user'));*/
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://ryan-viers-movie-app.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state>
        this.props.setMovies(response.data);
        //this.setState({
        //movies: response.data,
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserData(token) {
    const username = localStorage.getItem('user');
    console.log(username);
    axios
      .get(`https://ryan-viers-movie-app.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUserData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addFavoriteMovie(movie, user) {
    const token = localStorage.getItem('token');

    axios
      .post(
        `https://ryan-viers-movie-app.herokuapp.com/users/${user}/movies/${movie._id}`,
        {
          FavoriteMovies: movie._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((e) => {
        console.error(e);
        alert('Unable to add movie to list.');
      });
  }

  /*When a user successfully logs in, this function updates the 'user' property in state to that 'particular user'.*/
  onLoggedIn(authData) {
    console.log(authData);
    /*const { setUser } = this.props;
    setUser(authData.user.Username);*/

    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  render() {
    let { movies, userData } = this.props;
    let { user } = this.state;
    //const { movies, user } = this.state;
    console.log(user);
    console.log(userData);
    return (
      <Router>
        <Container>
          <NavbarView user={user} />
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
                /* return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));*/
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <MovieView
                      user={user}
                      addFavoriteMovie={this.addFavoriteMovie}
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genre/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${user}`}
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <ProfileView user={user} />;
              }}
            />
            <Route
              path={`/user-update/${user}`}
              render={({ history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <UpdateUser
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user, userData: state.userData };
};

export default connect(mapStateToProps, { setMovies, setUser, setUserData })(
  MainView
);
