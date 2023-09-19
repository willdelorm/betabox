import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSessionsFromAuth } from "../utils/firebase.utils";
import { loadModal } from "../utils/modal.utils";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import Layout from "../components/Layout";
import SessionsListItem from "../components/SessionsListItem";
import ViewSessionModal from "../components/ViewSessionModal";
import ActivityContainer from "../components/ActivityContainer";

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
      <ActivityContainer sessions={sessions} />
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
