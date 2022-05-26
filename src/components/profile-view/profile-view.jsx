import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUserData, deleteFavorite } from '../../actions/actions';
import propTypes from 'prop-types';
import './profile-view.scss';

import { UserData } from './user-data';
import { FavoriteMoviesView } from './favorite-movies';
import { UpdateUser } from './update-user';

function ProfileView(props) {
  const { user, userData, favoriteMovies } = props;
  //let { userData, movies, favoriteMovies } = props;
  //const [currentUser, setCurrentUser] = useState({});
  //const [updatedUserData, setUpdatedUser] = useState({});
  //const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  //let { userData } = props;
  //console.log(currentUser);
  //console.log(favoriteMoviesList);
  //const [userdata, setUserdata] = useState({});
  //const [updatedUser, setUpdatedUser] = useState({});
  //const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  /*const getUserData = (token, username) => {
    axios
      .get(`https://ryan-viers-movie-app.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCurrentUser(response.data);
        setUpdatedUser(response.data);
        setFavoriteMoviesList(
          response.data.FavoriteMovies
          //movies.filter((m) => response.data.FavoriteMovies.includes(m._id))
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };*/

  /*useEffect(() => {
    if (token !== null) {
      getUserData(token, user);
    } else {
      console.log('Not authorized');
    }
  }, []);*/

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://ryan-viers-movie-app.herokuapp.com/users/${user}`,
        updatedUserData
      )
      .then((response) => {
        setUserData(response.data);
        alert('Profile updated');
        //setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteProfile = (e) => {
    axios
      .delete(`https://ryan-viers-movie-app.herokuapp.com/users/${user}`)
      .then((response) => {
        alert('Your profile has beeen deleted');
        //setUserData(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFav = (id) => {
    axios
      .delete(
        `https://ryan-viers-movie-app.herokuapp.com/users/${user}/movies/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        console.log(id);
        this.props.deleteFavorite(id);
      })
      .catch((e) => {
        console.error(e);
        alert('Unable to delete movie.');
      });
  };

  return (
    <Container>
      <Row id="user-row">
        <Col>
          <Card id="update-user-card">
            <Card.Body>
              <UserData userdata={userData} />
            </Card.Body>
          </Card>

          <Button variant="danger" type="submit" onClick={deleteProfile}>
            Delete Profile
          </Button>
        </Col>

        <Col>
          <Card id="update-user-card">
            <Card.Body>
              <UpdateUser
                userdata={userData}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card id="update-user-card">
        <Card.Body>
          <FavoriteMoviesView
            favoriteMoviesList={favoriteMovies}
            removeFav={removeFav}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    userData: state.userData,
    favoriteMovies: state.favoriteMovies,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    deleteFavorite: (id) => {
      dispatch({ type: 'DELETE_FAVORITE', value: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
