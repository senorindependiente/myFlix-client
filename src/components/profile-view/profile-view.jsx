import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import Modal from "react-bootstrap/Modal";

class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
     
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
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateUser = (event, token) => {
    event.preventDefault();
    const Username = localStorage.getItem("user");

    axios.put(`https://movieapiapp.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday,
      }

        .then((response) => {
          //Assign the result to the state
          this.setState({
            user: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  deleteUser(token) {
    const Username = localStorage.getItem("user");

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
    const { Username, Email, Birthday } = this.state;

    if (!Username) {
      return null;
    }

    return (
        <div>
        <Row>
          <Col>
            <Card >
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
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      value={""}
                      onChange={(event) => this.setPassword(event.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      value={Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      value={Birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div>
                    <button
                      className="button2"
                      type="submit"
                      onClick={this.editUser}
                    >
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
