import React from "react";
import axios from "axios"; //importing library Axios

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { setMovies } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

import "./main-view.scss";

import RegistrationView from "../registration-view/registration-view";
import LoginView from "../login-view/login-view";
// import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import NavbarView from "../navbar-view/navbar-view";
import ProfileView from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarView from "../navbar-view/navbar-view";
class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      // movies: [],
      // selectedMovie: null,
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://movieapiapp.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // getUsers(token) {
  //   axios
  //     .get("https://movieapiapp.herokuapp.com/users", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       //Assign the result to the state
  //       this.props.setUser(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken != null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    // movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={({ history }) => {
              if (!user)
                return (
                  <Col md={6} className="mx-auto">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view"></div>;

              return <MoviesList movies={movies} />; //here is the mistake
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col md={6} className="mx-auto">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view"></div>;
              return (
                <Col md={6} className="mx-auto my-auto">
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col md={6} className="mx-auto">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={6} className="mx-auto">
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col md={6} className="mx-auto">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={6} className="mx-auto">
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col md={6} className="mx-auto">
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col md={6} className="mx-auto">
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
