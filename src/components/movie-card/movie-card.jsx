import React from "react";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props; // shortend for const movie = this.props.movie, props are to receive data in form of an object
    return (
      <div className="movie-card">
        <p>{movie.Title}</p>
       
      </div>
    );
  }
}

export default MovieCard;
