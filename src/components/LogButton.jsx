import { Button } from "react-bootstrap";

const LogButton = ({ grade, handleClick }) => {
  return (
    <Button
      className="me-3 mb-3 flex-grow-1"
      variant="warning"
      onClick={handleClick}
    >
      {grade}
    </Button>
  );
};

export default LogButton;
