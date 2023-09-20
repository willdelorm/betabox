import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSessionsFromAuth } from "../utils/firebase.utils";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import Layout from "../components/Layout";
import SessionsListItem from "../components/SessionsListItem";
import HistoryStat from "../components/HistoryStat";
import ViewSessionModal from "../components/ViewSessionModal";

const History = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const loadModal = (props) => {
    setModalData({ ...props });
    setModalShow(true);
  };

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

  const allClimbs = sessions.reduce((climbs, session) => {
    return climbs.concat(session.climbs);
  }, []);
  const maxSendGrade = allClimbs.reduce((maxGrade, climb) => {
    return climb.grade > maxGrade ? climb.grade : maxGrade;
  }, 0);
  const avgRpe =
    allClimbs.reduce((totalRpe, climb) => {
      return totalRpe + climb.effort;
    }, 0) / allClimbs.length;
  const avgV = Math.floor(
    allClimbs.reduce((totalV, climb) => {
      return totalV + climb.grade;
    }, 0) / allClimbs.length
  );

  return (
    <Layout theme="dark">
      <div className="m-3 flex-grow-1 overflow-auto">
        <h2 className="fs-6 mb-3">All Sessions</h2>

        <div className="stats d-flex justify-content-between mb-3">
          <HistoryStat
            name="max send"
            value={sessions.length === 0 ? "--" : `V${maxSendGrade}`}
          />
          <HistoryStat
            name="climbs"
            value={sessions.length === 0 ? "--" : allClimbs.length}
          />
          <HistoryStat
            name="avg rpe"
            value={sessions.length === 0 ? "--" : avgRpe}
          />
          <HistoryStat
            name="avg v"
            value={sessions.length === 0 ? "--" : `V${avgV}`}
          />
        </div>

        <ListGroup variant="flush">{sessionsListView}</ListGroup>
      </div>
      <Button
        variant="dark"
        size="lg"
        className="w-100 rounded-0"
        onClick={() => navigate("/home")}
      >
        Back
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

export default History;
