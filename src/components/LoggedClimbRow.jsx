import ListGroup from "react-bootstrap/ListGroup";

const LoggedClimbRow = ({ details, handleClick }) => {
  const climbDetails =
    details.name === ""
      ? "Tap to edit details"
      : details.note !== ""
      ? `${details.name} - ${details.note}`
      : `${details.name}`;

  return (
    <ListGroup.Item
      className="d-flex justify-content-between gap-3 mb-3 px-0 bg-light"
      onClick={() => handleClick(details)}
    >
      <span className="fw-bold text-left">{`V${details.grade}`}</span>
      <span className="flex-grow-1">
        {climbDetails.length > 30
          ? climbDetails.slice(0, 30) + "..."
          : climbDetails}
      </span>
      <span className="fw-bold">{details.style}</span>
    </ListGroup.Item>
  );
};

export default LoggedClimbRow;
