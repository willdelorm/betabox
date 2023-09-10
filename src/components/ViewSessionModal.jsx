import { Button, ListGroup, Modal } from "react-bootstrap";

import HistoryStat from "./HistoryStat";

const ViewSessionModal = ({ show, data, handleHide }) => {
  const { climbs, endTime, id, location, notes, startTime, title } = data;

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100">
          <h2 className="mb-3">{title}</h2>
          <div className="d-flex justify-content-between align-items-center fs-6">
            <p>Session Detail:</p>
            <span className="text-danger text-uppercase">Delete</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 pt-3">
        <div className="d-flex justify-content-around align-items-center mb-3">
          <HistoryStat name="vsum" value="2" />
          <HistoryStat name="density" value=".03" />
          <HistoryStat name="climbs" value="3" />
          <HistoryStat name="avg rpe" value="4.6" />
        </div>

        <div className="m-3 flex-grow-1 overflow-auto">
          <h2 className="fs-6">Session Log:</h2>
          <ListGroup variant="flush">
            {climbs.length
              ? climbs.map((climb) => {
                  const { attempts, effort, grade, id, name, note, style } =
                    climb;

                  return (
                    <ListGroup.Item key={id} className="gap-3 mb-3 px-0">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="fw-bold text-left me-3">{`V${grade}`}</span>
                        <span className="flex-grow-1">{`${name} - ${attempts} attempts - RPE: ${effort}`}</span>
                        <span className="fw-bold">{style}</span>
                      </div>
                      <p>
                        <span className="fw-bold">Note:</span> {note}
                      </p>
                    </ListGroup.Item>
                  );
                })
              : null}
          </ListGroup>
        </div>
        <div className="session-notes m-3 p-3 bg-light">
          <p className="fw-bold">Session Notes:</p>
          <p>{notes}</p>
        </div>

        <Button
          variant="dark"
          size="lg"
          className="w-100 rounded-0"
          onClick={handleHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ViewSessionModal;
