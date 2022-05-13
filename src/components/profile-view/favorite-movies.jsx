import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button, Figure } from 'react-bootstrap';
import './profile-view.scss';

export function FavoriteMovies({ favoriteMoviesList, removeFav }) {
  return (
    <Card id="favorite-movies-card">
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h1>Favorite Movies</h1>
          </Col>
        </Row>
        <Row>
          {favoriteMoviesList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />
                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="danger" onClick={() => removeFav(_id)}>
                  Remove From List
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}
