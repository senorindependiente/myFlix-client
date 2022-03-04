import React, { useState } from "react";
import "./registration-view.scss";
import PropTypes from "prop-types";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

  return (
    <Container className="container">
      <Row>
        <Col>
          <CardGroup className="card-group" >
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
                </Form.Group>

                <Form.Group>
                  <Form.Label className="form-label">Birthday:</Form.Label>
                  <Form.Control
                    type="text"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
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
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
  onRegistration: PropTypes.func.isRequired,
};

export default RegistrationView;
