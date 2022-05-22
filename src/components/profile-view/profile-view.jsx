import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './profile-view.scss';

import { UserData } from './user-data';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

export function ProfileView(props) {
  const [userData, setUserData] = useState(props.userData);
  const currentUser = props.userData;
  //let { userData } = props;
  console.log(userData);
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
        setUserdata(response.data);
        setUpdatedUser(response.data);
        setFavoriteMoviesList(
          response.data.FavoriteMovies
          //movies.filter((m) => response.data.FavoriteMovies.includes(m._id))
        );
      })
      .catch((e) => {
        console.error(e);
        console.log('here');
      });
  };

  useEffect(() => {
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
        `https://ryan-viers-movie-app.herokuapp.com/users/${currentUsername}`,
        userData
      )
      .then((response) => {
        setUserData(response.data);
        alert('Profile updated');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteProfile = (e) => {
    axios
      .delete(
        `https://ryan-viers-movie-app.herokuapp.com/users/${userData.Username}`
      )
      .then((response) => {
        alert('Your profile has beeen deleted');
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
        `https://ryan-viers-movie-app.herokuapp.com/users/${userData.Username}/movies/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setUserData(
          ...userData.FavoriteMovies,
          userData.FavoriteMovies.filter((movie) => movie._id != id)
        );
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
              <UserData userdata={currentUser} />
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
          <FavoriteMovies
            favoriteMoviesList={userData.FavoriteMovies}
            removeFav={removeFav}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

ProfileView.propTypes = {
  userData: propTypes.shape({
    Username: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    FavoriteMovies: propTypes.array.isRequired,
  }).isRequired,
};
