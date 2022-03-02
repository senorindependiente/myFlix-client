import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login-view.scss";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginView(props) {

  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formUsername">
<Form.Label>Username:</Form.Label>
<Form.Control type="text" onChange={ e =>setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      </Form>
      <button>Register</button>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }).isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
