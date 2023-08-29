import { Button, ListGroup } from "react-bootstrap";

const SessionsListItem = ({ session }) => {
  const { title, climbs } = session;
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div className="flex-grow-1">
        <h3>{title}</h3>
        <p>{`2 hours • ${climbs.length} problems • Denity .031 • Average V4 • 1 project`}</p>
      </div>
      <div>
        <Button>{">"}</Button>
      </div>
    </ListGroup.Item>
  );
};

export default SessionsListItem;
