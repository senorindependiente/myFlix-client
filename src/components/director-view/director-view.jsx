import React from "react";
import "./director-view.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

class DirectorView extends React.Component {
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
    const { director, onBackClick } = this.props; //this would in a function based component just "props" as a parameter in the function ot access data as an object
    return (
      <Card>
        <Card.Body>
          <Card.Title className="director">
            <span className="value title">{director.Name}</span>
          </Card.Title>

          <Card.Text>Bio: </Card.Text>
          <Card.Text className="bio"> {director.Bio}</Card.Text>
          <Card.Text>Birth: {director.Birth}</Card.Text>
          <Card.Text>Death:{director.Death}</Card.Text>

          <button className="button" onClick={() => onBackClick()}>
            Back
          </button>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.proptypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default DirectorView;
