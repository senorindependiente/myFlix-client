import React from "react";
import "./director-view.scss";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';



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
        <div className="movie-view">
          <div className="movie-title">
            <span className="label">Name: </span>
            <span className="value">{director.Name}</span>
          </div>
          <div className="movie-description">
            <span className="label">Bio: </span>
            <span className="value">{director.Bio}</span>
            <span className="label">Birth: </span>
            <span className="value">{director.Birth}</span>
            <span className="label">Death: </span>
            <span className="value">{director.Death}</span>
          </div>
          <button
            className="button"
            onClick={() => onBackClick()}
          >
            Back
          </button>
        </div>
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