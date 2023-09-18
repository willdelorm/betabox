import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSessionsFromAuth } from "../utils/firebase.utils";
import { loadModal } from "../utils/modal.utils";

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import { Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import ActivityGraph from "../components/ActivityGraph";
import SessionsListItem from "../components/SessionsListItem";
import ViewSessionModal from "../components/ViewSessionModal";

const Home = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getUserSessionsFromAuth().then((arr) => {
      setSessions(arr);
    });
  }, []);

  const emptySessionsList = <p>No sessions recorded.</p>;

  const sessionsListView = sessions.length
    ? sessions.map((session) => (
        <SessionsListItem
          key={session.id}
          session={session}
          handleClick={() => loadModal(session, setModalData, setModalShow)}
        />
      ))
    : emptySessionsList;

  return (
    <Layout theme="dark">
      <div className="activity m-3">
        <h2 className="fs-6 mb-3">Activity</h2>
        <Row className="mb-3">
          <Col>
            <Dropdown className="flex-fill">
              <Dropdown.Toggle
                variant="outline-dark"
                id="dropdown-time"
                className="w-100"
              >
                Last 6 months
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">This week</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Last week</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Last month</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Last 3 months</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Last 6 months</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Last year</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown className="flex-fill">
              <Dropdown.Toggle
                variant="outline-dark"
                id="dropdown-filter"
                className="w-100"
              >
                Total Sessions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header disabled={true}>Bouldering</Dropdown.Header>
                <Dropdown.Item href="#/action-1">Total Sessions</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Average Grade</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Average Effort</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <div className="graph-container">
          <ActivityGraph data={sessions} />
        </div>
      </div>
      <div className="m-3 mt-0 flex-grow-1 overflow-auto">
        <h2 className="fs-6 mb-3">Recent Sessions</h2>

        <ListGroup variant="flush">
          {sessionsListView}
          <ListGroup.Item className="d-flex justify-content-between align-items-center bg-light px-0 py-1">
            <p
              className="fs-7 fw-bold my-2"
              onClick={() => navigate("/history")}
            >
              View All
            </p>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <Button
        variant="dark"
        size="lg"
        className="w-100 rounded-0"
        onClick={() => navigate("/sessions/new")}
      >
        Start a session
      </Button>
      {modalShow && (
        <ViewSessionModal
          show={modalShow}
          data={modalData}
          handleHide={() => setModalShow(false)}
        />
      )}
    </Layout>
  );
};

export default Home;
