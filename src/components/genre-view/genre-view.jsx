import React from "react";
import "./genre-view.scss";
import PropTypes from "prop-types";
import { Button, Card, CardGroup, Row, Col, Container, CarouselItem } from "react-bootstrap";

class GenreView extends React.Component {
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
      const { genre, onBackClick } = this.props; //this would in a function based component just "props" as a parameter in the function ot access data as an object
      return (
        <Card className="movie-view">
          <Card.Body >
<Card.Title class="mistery">
            <span className="value title">{genre.Name}</span>
          </Card.Title>
          <div className="movie-description">

            <Card.Text className="label">Description: </Card.Text>
            <Card.Text className="value text">{genre.Description}</Card.Text>
          </div>
          <button
            className="button"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </button>
          </Card.Body>
        </Card>
      );
    }
  }
  
  GenreView.proptypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};
  
  export default GenreView;
