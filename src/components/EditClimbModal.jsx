// ? useEffect stopwatch in New.jsx causing console.log to trigger every second

import { Button } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const EditClimbModal = ({
  show,
  data,
  setData,
  deleteClimb,
  handleSubmit,
  onHide,
}) => {
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "grade" || name === "effort") {
      value = Number(value);
    }

    const updatedData = {
      ...data,
      [name]: value,
    };
    setData(updatedData);
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="w-100 d-flex justify-content-between align-items-center"
        >
          <h2>Edit Climb:</h2>
          <span
            className="fs-6 text-danger text-uppercase"
            onClick={() => deleteClimb(data)}
          >
            Delete Climb
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <h3>{`V${data.grade}`}</h3>
            </Form.Label>
            <Form.Range
              min={0}
              max={10}
              name="grade"
              value={data.grade}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type="text"
              name="note"
              value={data.note}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasiEffort">
            <Form.Label>{"RPE: " + data.effort}</Form.Label>
            <Form.Range
              min={0}
              max={10}
              name="effort"
              value={data.effort}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicStyles">
            <Form.Label>Style</Form.Label>
            <Form.Check
              inline
              type="radio"
              name="style"
              label="Flash"
              value="Flash"
              id="style-flash"
              checked={data.style === "Flash"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              name="style"
              label="Redpoint"
              value="Redpoint"
              id="style-redpoint"
              checked={data.style === "Redpoint"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              name="style"
              label="Onsight"
              value="Onsight"
              id="style-onsight"
              checked={data.style === "Onsight"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              name="style"
              label="Project"
              value="Project"
              id="style-project"
              checked={data.style === "Project"}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-between">
            <Form.Label>{"Attempts: " + data.attempts}</Form.Label>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="warning"
                onClick={() =>
                  setData({ ...data, attempts: data.attempts + 1 })
                }
              >
                +
              </Button>
              <Button
                variant="warning"
                onClick={() =>
                  setData({
                    ...data,
                    attempts: data.attempts > 1 ? data.attempts - 1 : 1,
                  })
                }
              >
                -
              </Button>
            </ButtonGroup>
          </Form.Group>

          <Button
            variant="light"
            size="lg"
            className="w-100 rounded-0"
            onClick={onHide}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            type="submit"
            size="lg"
            className="w-100 rounded-0"
          >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditClimbModal;
