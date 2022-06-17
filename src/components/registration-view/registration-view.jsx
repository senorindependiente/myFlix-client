import React, { useState } from "react";
import "./registration-view.scss";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
function RegistrationView(props) {
  //declare hook for each input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");

  // const [values, setValues] = useState({
  //   usernameErr: "",
  //   passwordErr: "",
  //   emailErr: "",
  // });

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 6) {
      setUsernameErr("Username must be 6 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr("Password must be 8 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Please user valid email");
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Please user valid email");
      isReq = false;
    }
    if (!birthday) {
      setBirthdayErr("Please enter birthday");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      console.log(username, password);
      axios
        .post("https://movieapiapp.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please log in");
          //the second argument "/_self " is necessary so that the page will open in the current tap
          window.open("/", "_self");
        })
        .catch((e) => {
          alert("unable to register");
        });
      props.onLoggedIn(username);
    }
  };

  return (
    <Container className="container">
      <Row>
        <Col>
          <Card className="card">
            <Card.Body>
              <Card.Header className="card-header">Please Register</Card.Header>
              <Form>
                <Form.Group>
                  <Form.Label className="form-label">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter a username"
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>
                <Form.Group>
                  <Form.Label className="form-label">Password: </Form.Label>
                  <Form.Control
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={5}
                    placeholder="Your password must be 5 or more characters"
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label className="form-label">Email:</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your Email"
                  />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group>
                  <Form.Label className="form-label">Birthday:</Form.Label>
                  <Form.Control
                    type="text"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="Enter a birthday"
                  />

                  <Form.Group>
                    <button
                      type="submit"
                      className="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </Form.Group>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};

export default RegistrationView;
