const Timer = ({ time }) => {
  const timeConverted =
    ("0" + Math.floor((time / 3600000) % 60)).slice(-2) +
    ":" +
    ("0" + Math.floor((time / 60000) % 60)).slice(-2) +
    ":" +
    ("0" + Math.floor((time / 1000) % 60)).slice(-2);

  return (
    <div className="mb-5">
      <span className="fs-1 fw-bold">{timeConverted}</span>
    </div>
  );
};

export default Timer;