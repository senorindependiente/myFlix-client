import React from "react";
import "./movie-view.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Card, CardGroup, Row, Col, Container } from "react-bootstrap";
class MovieView extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     FavoriteMovie: [],
  //   };
  // }

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

    {
      /* <Row>
                {FavoriteMovie.length > 0 &&
                  movies.map((movie) => {
                    if (
                      movie._id ===
                      FavoriteMovie.find((fav) => fav === movie._id)
                    ) {
                      return (
                        <Link
                          value={movie._id}
                          onClick={(e) => this.addFavorite(e, movie)}
                        >
                          <button className="button2">Add</button>
                        </Link>
                      );
                    }
                  })}
              </Row> */
    }

    return (
      <Container className="container">
        <Card>
          <Card.Body>
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
            <Card.Title>
              <span className="value title">{movie.Title} </span>
              <button className="add">
                &#9734;
              </button>
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
