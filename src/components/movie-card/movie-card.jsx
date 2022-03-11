import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
class MovieCard extends React.Component {
  render() {
    const { movie } = this.props; // shortend for const movie = this.props.movie, props are to receive data in form of an object
    return (
      <Row>
        <Col>
          <Card className="maincard">
            <Card.Img
              className="card-img"
              variant="top"
              src={movie.ImagePath}
            />
            <Card.Body className="card-body">
              <Card.Title className="card-title">{movie.Title}</Card.Title>
              <Card.Text className="card-text">{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <button className="button">Open</button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
