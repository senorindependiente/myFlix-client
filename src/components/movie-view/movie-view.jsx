import React from "react";

class MovieView extends React.Component {

    constructor() {
        super();
        this.state = {
          movies: [],
          selectedMovie: null
        };
      }

      componentDidMount() {
        document.addEventListener("keypress", event => {
          console.log(event.key);
        });
      }


  render() {
    const { movie , onBackClick} = this.props; //this would in a function based component just "props" as a parameter in the function ot access data as an object

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={()=>{onBackClick(null)}}>Back</button>
      </div>
    );
  }
}

export default MovieView;
