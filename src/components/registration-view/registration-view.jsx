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

  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username Required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be at least 5 characters long",
      });
      isReq = false;
    }

    if (!password) {
      setValues({ ...values, passwordErr: "Password Required" });
      isReq = false;
    } else if (password.length < 5) {
      setValues({
        ...values,
        passwordErr: "Password must be at least 5 characters long",
      });
      isReq = false;
    }

    if (!email) {
      setValues({ ...values, emailErr: "Email Required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Email invalid" });
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
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
        .catch((response) => {
          console.error(response);
          alert("unable to register");
        });
    }
  };

  return (
    <Container className="container">
      <Row>
        <Col>
          <CardGroup className="card-group">
            <Card className="card">
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
                  {values.usernameErr && <p>{values.usernameErr}</p>}
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
                  {values.passwordErr && <p>{values.passwordErr}</p>}
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
                  {values.emailErr && <p>{values.emailErr}</p>}
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
                    <button type="submit" className="button">
                      Submit
                    </button>
                  </Form.Group>
                </Form.Group>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};

export default RegistrationView;
