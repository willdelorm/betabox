import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const SessionModal = ({ isShow, setShow, data, setData, saveSession }) => {
  const handleChange = (e) => {
    let { name, value } = e.target;

    const updatedData = {
      ...data,
      [name]: value,
    };
    setData(updatedData);
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
        <Form onSubmit={saveSession}>
          <Form.Group className="mb-3" controlId="session-title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="session-notes">
            <Form.Label>Session Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={data.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="session-location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="light"
            size="lg"
            className="w-100 rounded-0"
            onClick={() => setShow(false)}
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
