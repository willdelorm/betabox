const ControlButton = ({ name, handleClick }) => {
  const iconClasses = `fa-solid fa-${name} ${
    name === "stop" ? "text-danger" : ""
  }`;

  return (
    <div className="d-flex flex-column fs-5" onClick={handleClick}>
      <i className={iconClasses}></i>
      <span className="text-capitalize">{name}</span>
    </div>
  );
};

export default ControlButton;
