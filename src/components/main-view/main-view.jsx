import React from "react";
import axios from "axios"; //importing library Axios
import "./main-view.scss";
import RegistrationView from "../registration-view/registration-view";
import LoginView from "../login-view/login-view";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }
  //external libray Axios to fetch external API, in this case MongoDB database  "myFlixDB" hosted on 8080 (method componentDidMount is used)
  //componentDidMount(), here you place code to perform async tasks such as ajax requests or adding event listeners
  componentDidMount() {
    axios
      .get("https://movieapiapp.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  /* When a user successfully registered*/
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }


  render() {
    const { movies, selectedMovie, register, user } = this.state;

    /* If user is not registered, the RegistrationView is rendered.*/
  
    if (!register)
      return (
        <RegistrationView
          onRegistration={(register) => this.onRegistration(register)}
        />
      );

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded

    if (movies.length === 0) return (<div className="main-view" />);

    return (
      <div>
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
      </div>
    );
  }
}

export default MainView;
