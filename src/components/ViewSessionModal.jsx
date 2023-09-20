import { Button, ListGroup, Modal } from "react-bootstrap";
import { sessionStats } from "../utils/session.utils";

import HistoryStat from "./HistoryStat";
import { deleteUserSessionFromAuth } from "../utils/firebase.utils";
import { useNavigate } from "react-router-dom";

const ViewSessionModal = ({ show, data, handleHide }) => {
  const { climbs, endTime, id, location, notes, startTime, title } = data;
  const { problemsCount, vSum, avgRpe, avgV } = sessionStats(climbs);
  const navigate = useNavigate();

  const deleteSession = () => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this session?"
    );

    if (isConfirmed) {
      deleteUserSessionFromAuth(data).then(() => {
        window.location.reload(true);
      });
    }
  };

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100">
          <h2 className="mb-3">{title}</h2>
          <div className="d-flex justify-content-between align-items-center fs-6">
            <p>Session Detail:</p>
            <span
              className="text-danger text-uppercase"
              onClick={deleteSession}
            >
              Delete
            </span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 pt-3">
        <div className="d-flex justify-content-around align-items-center mb-3">
          <HistoryStat name="vsum" value={vSum} />
          <HistoryStat name="avg v" value={`V${avgV}`} />
          <HistoryStat name="climbs" value={problemsCount} />
          <HistoryStat name="avg rpe" value={avgRpe} />
        </div>

        <div className="m-3 flex-grow-1">
          <h2 className="fs-6">Session Log:</h2>
          <ListGroup variant="flush" className="session-list overflow-auto">
            {climbs.length
              ? climbs.map((climb) => {
                  const { attempts, effort, grade, id, name, note, style } =
                    climb;

                  const summaryArr = [];
                  if (name !== "") {
                    summaryArr.push(name);
                  }
                  if (style === "Project" || style === "Redpoint") {
                    summaryArr.push(`${attempts} attempts`);
                  }
                  summaryArr.push(`RPE: ${effort}`);

                  const summary = summaryArr.join(" • ");

                  return (
                    <ListGroup.Item key={id} className="gap-3 mb-3 px-0">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="fw-bold text-left me-3">{`V${grade}`}</span>
                        <span className="flex-grow-1">{summary}</span>
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
