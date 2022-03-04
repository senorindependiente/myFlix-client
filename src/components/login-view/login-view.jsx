import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login-view.scss";
import Form from "react-bootstrap/Form";
import axios from "axios";

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
    <div>
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
        <button className="button2">Register</button>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
