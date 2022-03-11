import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login-view.scss";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";

// import pic  from "../Images/parasite.jpg"

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://movieapiapp.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Header className="card-header">Please Sign-In</Card.Header>
              <Form>
                <Form.Group className="form-group" controlId="formUsername">
                  <Form.Label className="form-label">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="form-group" controlId="formPassword">
                  <Form.Label className="form-label">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <button
                  className="button"
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>

                <button href="/register" className="button2">
                 
                  <a href="/register">Register</a>
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginView;

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
