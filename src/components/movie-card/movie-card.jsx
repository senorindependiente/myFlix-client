import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props; // shortend for const movie = this.props.movie, props are to receive data in form of an object
    return (
      
      <Card className="card">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <button className="button" onClick={() => onMovieClick(movie)} >
           <a href="#"> Open</a>
          </button>
        </Card.Body>
      </Card>
    );
  }
}

<Container>
  <Row>
    <Col>1 of 2</Col>
    <Col>2 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
</Container>


MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
