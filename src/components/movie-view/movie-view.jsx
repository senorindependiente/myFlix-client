import React from "react";
import "./movie-view.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
class MovieView extends React.Component {
  keypressCallback(event) {
    alert(event.key);
  }
  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props; //this would in a function based component just "props" as a parameter in the function ot access data as an object
    return (
      <Container className="container">
        <Card className="card">
          <Card.Body>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>
              <Card.Title>
                <span className="value title">{movie.Title} </span>
                <button>
                  <img src="" alt="add to favorite" />
                </button>{" "}
              </Card.Title>

              <CardGroup className="cardgroup">
                <Card.Text>
                  <Link
                    className="director"
                    to={`/directors/${movie.Director.Name}`}
                  >
                    <Button variant="link">
                      Director: {movie.Director.Name}
                    </Button>
                  </Link>
                </Card.Text>
                <Card.Text>
                  <Link className="genre" to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre: {movie.Genre.Name}</Button>
                  </Link>
                </Card.Text>
              </CardGroup>

              <Card.Text className="movie-description">
                <span className="label">Description: </span>
              </Card.Text>
              <Card.Text>
                <span className="value">{movie.Description}</span>
              </Card.Text>
              <button
                className="button"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MovieView;
