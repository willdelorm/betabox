import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { nanoid } from "nanoid";

import Navigation from "../../components/Navigation";
import Timer from "../../components/Timer";
import LogButton from "../../components/LogButton";
import LoggedClimbRow from "../../components/LoggedClimbRow";
import ControlButton from "../../components/ControlButton";
import EditClimbModal from "../../components/EditClimbModal";

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

const DEFAULT_LOGGED_CLIMB = {
  id: "",
  grade: 0,
  name: "",
  note: "",
  effort: 0,
  style: "Flash",
  attempts: 1,
  isEdited: false,
};

const INITIAL_STATS = {
  count: 0,
  vSum: 0,
  avgV: 0,
};

const NewSession = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loggedClimbs, setLoggedClimbs] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

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

  // Stopwatch Functions
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    const response = confirm("Are you ready to finish your session?");

    if (response) {
      setTime(0);
    }
  };

  const handleUndo = () => {
    const updatedList = [...loggedClimbs];

    if (updatedList.length) {
      updatedList.shift();
      setLoggedClimbs(updatedList);
    }
  };

  // Stat Functions
  const updateStats = (newLog) => {
    const newCount = newLog.length;

    const newVSum = newLog.reduce((acc, climb) => (acc += climb.grade), 0);

    const newAvgV = newLog.length
      ? Math.floor(
          newLog.reduce((acc, climb) => (acc += climb.grade), 0) / newLog.length
        )
      : 0;

    setStats({
      count: newCount,
      vSum: newVSum,
      avgV: newAvgV,
    });
  };

  // Climb Log Functions
  const handleLogClimb = (e) => {
    const newClimb = {
      ...DEFAULT_LOGGED_CLIMB,
      id: nanoid(),
      grade: Number(e.target.innerText.slice(1)),
    };

    const updatedLoggedClimbs = [newClimb, ...loggedClimbs];
    setLoggedClimbs(updatedLoggedClimbs);
    updateStats(updatedLoggedClimbs);
  };

  const handleEditClimb = (props) => {
    setModalData({ ...props });
    setModalShow(true);
  };

  const handleUpdateClimb = (e) => {
    e.preventDefault();
    const updatedLog = [];

    loggedClimbs.map((climb) => {
      if (climb.id === modalData.id) {
        const editedClimb = {
          ...modalData,
          isEdited: true,
        };
        updatedLog.push(editedClimb);
      } else {
        updatedLog.push(climb);
      }
    });

    setLoggedClimbs(updatedLog);
    updateStats(updatedLog);
    setModalShow(false);
  };

  const deleteClimb = (climbToDelete) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this climb?"
    );

    if (confirmDelete) {
      const updatedLog = [];

      loggedClimbs.map((climb) => {
        if (climb.id !== climbToDelete.id) {
          updatedLog.push(climb);
        }
      });
      setLoggedClimbs(updatedLog);
      setModalShow(false);
    }
  };

  return (
    <div className="h-100 d-flex flex-column overflow-hidden">
      <Navigation theme="light" />

      {/* Stats */}
      <div className="bg-body-secondary mx-3 p-3">
        <Timer time={time} />
        <div className="d-flex justify-content-between fs-6">
          <span>{`Problems: ${stats.count}`}</span>
          <span>{`V Sum: ${stats.vSum}`}</span>
          <span>{`Avg V: ${stats.avgV}`}</span>
        </div>
      </div>

      {/* Session Log */}
      <div className="m-3 flex-grow-1 overflow-auto">
        <h2>Session Log:</h2>
        <ListGroup variant="flush">
          {loggedClimbs.length ? (
            loggedClimbs.map((loggedClimb) => (
              <LoggedClimbRow
                key={loggedClimb.id}
                details={loggedClimb}
                handleClick={() => handleEditClimb(loggedClimb)}
              />
            ))
          ) : (
            <p>Nothing recorded yet</p>
          )}
        </ListGroup>
        <EditClimbModal
          show={modalShow}
          data={modalData}
          setData={setModalData}
          deleteClimb={deleteClimb}
          handleSubmit={handleUpdateClimb}
          onHide={() => setModalShow(false)}
        />
      </div>

      {/* Log Button Grid */}
      <div className="log-btn-grid my-3">
        {BOULDERING_GRADES.map((grade, index) => (
          <LogButton key={index} grade={grade} handleClick={handleLogClimb} />
        ))}
      </div>

      {/* Play Controls */}
      <div className="d-flex justify-content-around my-3">
        <ControlButton name="pause" handleClick={togglePause} />
        <ControlButton name="stop" handleClick={handleStop} />
        <ControlButton name="undo" handleClick={handleUndo} />
      </div>
    </div>
  );
};

export default NewSession;
