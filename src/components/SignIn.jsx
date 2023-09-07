import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGoogle,
} from "../utils/firebase.utils";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ onHide }) => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    const updatedData = {
      ...formFields,
      [name]: value,
    };
    setFormFields(updatedData);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const { email, password } = formFields;
    signInAuthUserWithEmailAndPassword(email, password).then((user) => {
      if (user && user.email) {
        navigate("home");
      }
    });
  };

  return (
    <Form action="/home" onSubmit={handleSignIn}>
      <Form.Group className="mb-3" controlId="signInEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formFields.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signInPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formFields.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="warning" type="submit" className="me-3">
        Submit
      </Button>
      <Button variant="outline-warning text-dark" onClick={onHide}>
        Cancel
      </Button>
    </Form>
  );
};

const SignIn = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignInForm onHide={onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
