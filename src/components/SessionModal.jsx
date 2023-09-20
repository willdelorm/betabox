import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserSessionFromAuth } from "../utils/firebase.utils";

import { Button, Form, Modal } from "react-bootstrap";

const SessionModal = ({ isShow, setShow, climbs, togglePause }) => {
  const [session, setSession] = useState({
    title: "",
    notes: "",
    location: "",
    startTime: new Date(),
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    setSession({
      ...session,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleResume = () => {
    setShow(false);
    togglePause();
  };

  const handleSubmitSession = async (e) => {
    e.preventDefault();

    const sessionToAdd = {
      ...session,
      climbs,
      endTime: new Date(),
    };
    addUserSessionFromAuth(sessionToAdd);

    navigate("/home");
  };

  return (
    <Modal
      show={isShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="w-100 d-flex justify-content-between align-items-center"
        >
          <h2>Session Review</h2>
          {/* <span className="fs-6 text-danger text-uppercase">
            Delete
          </span> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitSession}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={session.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Session Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={session.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={session.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="light"
            size="lg"
            className="w-100 rounded-0"
            onClick={handleResume}
          >
            Resume
          </Button>
          <Button
            variant="dark"
            type="submit"
            size="lg"
            className="w-100 rounded-0"
          >
            End session
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SessionModal;
