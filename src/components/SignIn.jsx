import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const SignInForm = ({ onHide }) => {
  return (
    <Form action="/home">
      <Form.Group className="mb-3" controlId="signInEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signInPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="primary" onClick={onHide}>
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
