import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Navigation from "../components/Navigation";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-100 d-flex flex-column">
      <Navigation theme="dark" />
      <Container className="flex-grow-1">
        <div className="h-25">Activity</div>
        <div>
          Recent Sessions
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between">
              <h3>Day out with Donny</h3>
              <Button>{">"}</Button>
            </ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
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
