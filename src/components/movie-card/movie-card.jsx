import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import { Card } from "react-bootstrap";
class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props; // shortend for const movie = this.props.movie, props are to receive data in form of an object
    return (
      
      <Card className="maincard">
        <Card.Img className="card-img" variant="top" src={movie.ImagePath} />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{movie.Title}</Card.Title>
          <Card.Text className="card-text">{movie.Description}</Card.Text>
          <button className="button" onClick={() => onMovieClick(movie)} >
           <a href="#"> Open</a>
          </button>
        </Card.Body>
      </Card>
    );
  }
}




MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
