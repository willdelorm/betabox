import { ListGroup } from "react-bootstrap";
import { sessionStats } from "../utils/session.utils";

const SessionsListItem = ({ session }) => {
  const { title, climbs } = session;
  const { problemsCount, avgV, projectsCount } = sessionStats(climbs);

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-light px-0 py-1 mb-1">
      <div className="flex-grow-1">
        <h3 className="fs-7">{title}</h3>
        <p className="fs-8 m-0">{`2 hours • ${problemsCount} problems • Average V${avgV} • ${projectsCount} project`}</p>
      </div>
      <div className="fs-8">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </ListGroup.Item>
  );
};

export default SessionsListItem;
