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

  const handleSignInWithGoogle = () => {
    signInWithGoogle();
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
          placeholder="Enter email"
          value={formFields.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signInPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={formFields.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="outline-primary" onClick={onHide}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSignInWithGoogle}>
        Google
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
        <Modal.Title id="contained-modal-title-vcenter">
          Register / Sign In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignInForm onHide={onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
