// ? Why do ControlButton components re-render with useEffect
// TODO Re-render play/pause on click

import { useEffect, useReducer, useState } from "react";
import { ListGroup } from "react-bootstrap";

import Layout from "../../components/Layout";
import Timer from "../../components/Timer";
import LogButton from "../../components/LogButton";
import LoggedClimbRow from "../../components/LoggedClimbRow";
import ControlButton from "../../components/ControlButton";
import EditClimbModal from "../../components/EditClimbModal";
import SessionModal from "../../components/SessionModal";

import climbsReducer from "../../reducers/climbsReducer";

const BOULDERING_GRADES = [
  "V0",
  "V1",
  "V2",
  "V3",
  "V4",
  "V5",
  "V6",
  "V7",
  "V8",
  "V9",
  "V10",
  "V11",
];

const NewSession = () => {
  const [climbs, dispatch] = useReducer(climbsReducer, []);
  const [editingData, setEditingData] = useState({});

  let problemCount = climbs.length ? climbs.length : 0;
  let vSum = climbs.length
    ? climbs.reduce((acc, climb) => (acc += climb.grade), 0)
    : 0;
  let avgV = climbs.length
    ? Math.floor(
        climbs.reduce((acc, climb) => (acc += climb.grade), 0) / climbs.length
      )
    : 0;

  // Climb Log Functions
  const handleAddClimb = (e) => {
    dispatch({
      type: "ADD_CLIMB",
      grade: Number(e.target.innerText.slice(1)),
    });
  };

  const handleUpdateClimb = (e) => {
    e.preventDefault();

    dispatch({
      type: "UPDATE_CLIMB",
      climb: editingData,
    });

    setModalShow(false);
  };

  const handleDeleteClimb = (climbId) => {
    dispatch({
      type: "DELETE_CLIMB",
      id: climbId,
    });

    setModalShow(false);
  };

  // Stopwatch Functions
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsPaused(true);
    setSessionModalShow(true);
  };

  // Modal Function
  const [modalShow, setModalShow] = useState(false);
  const [sessionModalShow, setSessionModalShow] = useState(false);

  const handleOpenModal = (props) => {
    setEditingData({ ...props });
    setModalShow(true);
  };

  return (
    <Layout theme="light">
      {/* Stats */}
      <div className="bg-body-secondary mx-3 p-3">
        <Timer time={time} />
        <div className="d-flex justify-content-between fs-6">
          <span>{`Problems: ${problemCount}`}</span>
          <span>{`V Sum: ${vSum}`}</span>
          <span>{`Avg V: ${avgV}`}</span>
        </div>
      </div>

      {/* Session Log */}
      <div className="m-3 flex-grow-1 overflow-auto">
        <h2>Session Log:</h2>
        <ListGroup variant="flush">
          {climbs.length ? (
            climbs.map((loggedClimb) => (
              <LoggedClimbRow
                key={loggedClimb.id}
                details={loggedClimb}
                handleClick={() => handleOpenModal(loggedClimb)}
              />
            ))
          ) : (
            <p>Nothing recorded yet</p>
          )}
        </ListGroup>
        <EditClimbModal
          show={modalShow}
          data={editingData}
          setData={setEditingData}
          deleteClimb={handleDeleteClimb}
          handleSubmit={handleUpdateClimb}
          onHide={() => setModalShow(false)}
        />
      </div>

      {/* Log Button Grid */}
      <div className="log-btn-grid my-3">
        {BOULDERING_GRADES.map((grade, index) => (
          <LogButton key={index} grade={grade} handleClick={handleAddClimb} />
        ))}
      </div>

      {/* Play Controls */}
      <div className="d-flex justify-content-around my-3">
        <ControlButton
          name={isPaused ? "play" : "pause"}
          handleClick={togglePause}
        />
        <ControlButton name="stop" handleClick={handleStop} />
        <ControlButton
          name="undo"
          handleClick={() =>
            climbs.length ? handleDeleteClimb(climbs[0].id) : null
          }
        />
      </div>
      <SessionModal
        isShow={sessionModalShow}
        setShow={setSessionModalShow}
        climbs={climbs}
        togglePause={togglePause}
      />
    </Layout>
  );
};

export default NewSession;
