import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUserData, deleteFavorite } from '../../actions/actions';
import './profile-view.scss';

import { UserData } from './user-data';
import { FavoriteMoviesView } from './favorite-movies';
import { UpdateUser } from './update-user';

function ProfileView(props) {
  const { userData, favoriteMovies } = props;

  const [updatedUserData, setUpdatedUser] = useState({});

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://ryan-viers-movie-app.herokuapp.com/users/${userData.Username}`,
        updatedUserData
      )
      .then((response) => {
        setUserData(response.data);
        alert('Profile updated');
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
        props.deleteFavorite(id);
      })
      .catch((e) => {
        console.error(e);
        alert('Unable to delete movie.');
      });
  };

  /*useEffect(() => {
    console.log('effect');
  }, [favoriteMovies]);*/

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

export default connect(mapStateToProps, { deleteFavorite })(ProfileView);
