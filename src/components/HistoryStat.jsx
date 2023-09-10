const HistoryStat = ({ name, value }) => {
  return (
    <div className="text-center text-uppercase">
      <div className="text-danger">{name}</div>
      <div className="fw-bold fs-1">{value}</div>
    </div>
  );
};

export default HistoryStat;
