import React from "react";
import "./genre-view.scss";
import PropTypes from "prop-types";

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
        <div className="movie-view">
          <div className="movie-title">

            <span className="value">{genre.Name}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{genre.Description}</span>
          </div>
          <button
            className="button"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </button>
        </div>
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
