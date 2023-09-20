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
            onClick={() => deleteClimb(data.id)}
          >
            Delete Climb
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              <h3>{`V${data.grade}`}</h3>
            </Form.Label>
            <Form.Range
              min={0}
              max={10}
              name="grade"
              value={data.grade}
              onChange={handleChange}
              className="slider-color"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type="text"
              name="note"
              value={data.note}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              {"RPE: "}
              <span className="fs-2 fw-bold">{data.effort}</span>
            </Form.Label>
            <Form.Range
              min={0}
              max={10}
              name="effort"
              value={data.effort}
              onChange={handleChange}
              className="slider-color"
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-between">
            <Form.Label>Style</Form.Label>
            <Form.Group
              className="mb-3 btn-group btn-group-toggle border"
              data-toggle="buttons"
            >
              <Form.Label
                className={`btn btn-light btn-sm m-0 ${
                  data.style === "Flash" ? "active" : ""
                }`}
                htmlFor="style-flash"
              >
                <Form.Check
                  inline
                  type="radio"
                  className="btn-check"
                  name="style"
                  label="Flash"
                  value="Flash"
                  id="style-flash"
                  checked={data.style === "Flash"}
                  onChange={handleChange}
                />
                Flash
              </Form.Label>
              <Form.Label
                className={`btn btn-light btn-sm m-0 ${
                  data.style === "Redpoint" ? "active" : ""
                }`}
                htmlFor="style-redpoint"
              >
                <Form.Check
                  inline
                  type="radio"
                  className="btn-check"
                  name="style"
                  label="Redpoint"
                  value="Redpoint"
                  id="style-redpoint"
                  checked={data.style === "Redpoint"}
                  onChange={handleChange}
                />
                Redpoint
              </Form.Label>
              <Form.Label
                className={`btn btn-light btn-sm m-0 ${
                  data.style === "Onsight" ? "active" : ""
                }`}
                htmlFor="style-onsight"
              >
                <Form.Check
                  inline
                  type="radio"
                  className="btn-check"
                  name="style"
                  label="Onsight"
                  value="Onsight"
                  id="style-onsight"
                  checked={data.style === "Onsight"}
                  onChange={handleChange}
                />
                Onsight
              </Form.Label>
              <Form.Label
                className={`btn btn-light btn-sm m-0 ${
                  data.style === "Project" ? "active" : ""
                }`}
                htmlFor="style-project"
              >
                <Form.Check
                  inline
                  type="radio"
                  className="btn-check"
                  name="style"
                  label="Project"
                  value="Project"
                  id="style-project"
                  checked={data.style === "Project"}
                  onChange={handleChange}
                />
                Project
              </Form.Label>
            </Form.Group>
          </Form.Group>

          {(data.style === "Project" || data.style === "Redpoint") && (
            <Form.Group className="mb-3 d-flex justify-content-between">
              <Form.Label>{"Attempts: " + data.attempts}</Form.Label>
              <div>
                <Button
                  variant="warning"
                  onClick={() =>
                    setData({ ...data, attempts: data.attempts + 1 })
                  }
                  className="attempts-btn fs-1 fw-bold mx-1"
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
                  className="attempts-btn fs-1 fw-bold"
                >
                  -
                </Button>
              </div>
            </Form.Group>
          )}

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
