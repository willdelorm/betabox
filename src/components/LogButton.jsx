const LogButton = ({ grade, handleClick }) => {
  return (
    <div className="log-btn" onClick={handleClick}>
      {grade}
    </div>
  );
};

export default LogButton;
