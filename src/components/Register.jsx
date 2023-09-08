import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserWithEmailAndPassword } from "../utils/firebase.utils";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const RegisterForm = ({ onHide }) => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
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

  const handleRegister = (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm } = formFields;
    if (!email || !password || !passwordConfirm) {
      alert("Please complete all fields");
      return;
    }
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    registerUserWithEmailAndPassword(email, password).then((user) => {
      if (user && user.email) {
        navigate("home");
      }
    });
  };

  return (
    <Form action="/home" onSubmit={handleRegister}>
      <Form.Group className="mb-3" controlId="registerEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formFields.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formFields.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerPassword2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="passwordConfirm"
          value={formFields.passwordConfirm}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I agree to sign up" required />
      </Form.Group>

      <Button variant="warning" type="submit" className="me-3">
        Submit
      </Button>
      <Button
        variant="outline-warning text-dark"
        className="me-3"
        onClick={onHide}
      >
        Cancel
      </Button>
    </Form>
  );
};

const Register = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a new account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterForm onHide={onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default Register;
