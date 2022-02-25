import React from "react";

class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props; // shortend for const movie = this.props.movie, props are to receive data in form of an object
    return (
      <div className="movie-card" onClick={()=> {onMovieClick(movie)}}>
        {movie.Title}
       
      </div>
    );
  }
}

export default MovieCard;
