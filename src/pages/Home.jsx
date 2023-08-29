import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Navigation from "../components/Navigation";
import SessionsListItem from "../components/SessionsListItem";

import { SessionsContext } from "../contexts/SessionsContext";

const Home = () => {
  const sessions = useContext(SessionsContext);
  console.log(sessions);

  const navigate = useNavigate();

  return (
    <div className="h-100 d-flex flex-column">
      <Navigation theme="dark" />
      <Container className="flex-grow-1">
        <div className="h-25">Activity</div>
        <div>
          Recent Sessions
          <ListGroup>
            {sessions.map((session) => (
              <SessionsListItem key={session.id} session={session} />
            ))}
          </ListGroup>
        </div>
      </Container>
      <Button
        variant="dark"
        size="lg"
        className="w-100 rounded-0"
        onClick={() => navigate("/sessions/new")}
      >
        Start a session
      </Button>
    </div>
  );
};

export default Home;
