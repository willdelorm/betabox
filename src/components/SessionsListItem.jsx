import { ListGroup } from "react-bootstrap";
import { sessionStats } from "../utils/session.utils";

const calculateSessionTime = (startTime, endTime) => {
  const timeStart = new Date(startTime.seconds * 1000);
  let timeEnd = new Date(endTime.seconds * 1000);

  // Adjust if times are on opposite sides of midnight
  if (timeEnd < timeStart) {
    timeEnd.setDate(timeEnd.getDate() + 1);
  }

  const diff = timeEnd - timeStart;

  let msec = diff;
  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const hhStr = hh > 0 ? `${hh} hours ` : "";
  const mmStr = mm > 0 ? `${mm} minutes ` : "";
  const elapsedTimeStr = hhStr + mmStr;

  return elapsedTimeStr.length ? elapsedTimeStr : "Short";
};

const SessionsListItem = ({ session, handleClick }) => {
  const { climbs, endTime, startTime, title } = session;
  const { problemsCount, avgV, projectsCount } = sessionStats(climbs);
  const sessionTime = calculateSessionTime(startTime, endTime);

  let statsPreview = `${sessionTime} • ${problemsCount} problems • V${avgV} average`;
  const projectsStat = `${projectsCount ? `• ${projectsCount} projects` : ""}`;
  statsPreview += projectsStat;

  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center bg-light px-0 py-1 mb-1"
      onClick={() => handleClick(session)}
    >
      <div className="flex-grow-1">
        <h3 className="fs-7">{title}</h3>
        <p className="fs-8 m-0">{statsPreview}</p>
      </div>
      <div className="fs-8">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </ListGroup.Item>
  );
};

export default SessionsListItem;
