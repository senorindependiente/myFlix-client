import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Col, Form, Row } from "react-bootstrap";
import "./profile-view.scss";

class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      FavoriteMovie: [],
      Birthday: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken != null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getUser(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser(token) {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://movieapiapp.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovie: response.data.FavoriteMovie,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateUser = (event) => {
    event.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://movieapiapp.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        alert("Profile updated");
        window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete a movie from FavoriteMovies list
  removeFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://movieapiapp.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://movieapiapp.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie added");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(`https://movieapiapp.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies } = this.props;
    const { FavoriteMovie, Username, Email, Birthday, Password } = this.state;

    if (!Username) {
      return null;
    }

    return (
      <div>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Form
                  onSubmit={(event) =>
                    this.editUser(
                      event,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      value={Username}
                      onChange={(event) => this.setUsername(event.target.value)}
                      required
                      minLength={5}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      value={Password}
                      onChange={(event) => this.setPassword(event.target.value)}
                      required
                      minLength={5}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      value={Email}
                      onChange={(event) => this.setEmail(event.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      name="Birthday"
                      value={Birthday}
                      onChange={(event) => this.setBirthday(event.target.value)}
                    />
                  </Form.Group>
                  <div>
                    <button className="button2" onClick={this.updateUser}>
                      Update User
                    </button>
                    <button
                      className="button2"
                      onClick={() => this.deleteUser()}
                    >
                      Delete User
                    </button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <h4>{Username} Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Body>
              {FavoriteMovie.length === 0 && (
                <div className="text-center">No Favorite Movies</div>
              )}

              <Row className="favorite-container">
                {FavoriteMovie.length > 0 &&
                  movies.map((movie) => {
                    if (
                      movie._id ===
                      FavoriteMovie.find((fav) => fav === movie._id)
                    ) {
                      return (
                        <Card key={movie._id}>
                          <Card.Img variant="top" src={movie.ImagePath} />
                          <Card.Body>
                            <Card.Title className="movie_title">
                              {movie.Title}
                            </Card.Title>
                            <button
                              className="button2"
                              value={movie._id}
                              onClick={(e) => this.removeFavorite(e, movie)}
                            >
                              Remove
                            </button>
                          </Card.Body>
                        </Card>
                      );
                    }
                  })}
              </Row>
            </Card.Body>
          </Col>
        </Row>
        <div>
          <button
            className="button"
            onClick={() => {
              onBackClick();
            }}
          >
            <a href="/">Back</a>
          </button>
        </div>
      </div>
    );
  }
}
export default ProfileView;

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
        Name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
