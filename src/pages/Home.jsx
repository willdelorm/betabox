import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import SessionsListItem from "../components/SessionsListItem";
import ActivityGraph from "../components/ActivityGraph";

import { SessionsContext } from "../contexts/SessionsContext";
import Layout from "../components/Layout";
import { getUserSessionsFromAuth } from "../utils/firebase.utils";

const Home = () => {
  // const sessions = useContext(SessionsContext);
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getUserSessionsFromAuth().then((arr) => {
      console.log("array", arr);
      setSessions(arr);
    });
  }, []);

  return (
    <Layout theme="dark">
      <div className="h-25 m-3">
        <h2 className="fs-6 mb-3">Activity</h2>
        <ActivityGraph data={sessions} />
      </div>
      <div className="m-3 flex-grow-1 overflow-auto">
        <h2 className="fs-6 mb-3">Recent Sessions</h2>

        <ListGroup variant="flush">
          {sessions.length &&
            sessions.map((session) => (
              <SessionsListItem key={session.id} session={session} />
            ))}
          <ListGroup.Item className="d-flex justify-content-between align-items-center bg-light px-0 py-1">
            <p className="fs-7 fw-bold my-2">View All</p>
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
    </Layout>
  );
};

export default Home;
