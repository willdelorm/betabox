import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ActivityGraph from "./ActivityGraph";
import ActivityDropdown from "./ActivityDropdown";
import {
  getStartOfMonth,
  getLast3Months,
  getLast6Months,
  getStartOfYear,
} from "../utils/filter.utils";

const TIME_OPTIONS = [
  "This month",
  "Latest 3 months",
  "Latest 6 months",
  "This year",
  "Last year",
];
const DATA_OPTIONS = ["Total sessions"];

const ActivityContainer = ({ sessions }) => {
  const [timeFilter, setTimeFilter] = useState(TIME_OPTIONS[0]);
  const [dataFilter, setDataFilter] = useState(DATA_OPTIONS[0]);

  const filteredDataByTime = sessions.filter((session) => {
    const sessionStartTime = new Date(session.startTime.seconds * 1000);

    switch (timeFilter) {
      case "This month":
        return sessionStartTime >= getStartOfMonth();
      case "Latest 3 months":
        return sessionStartTime >= getLast3Months();
      case "Latest 6 months":
        return sessionStartTime >= getLast6Months();
      case "This year":
        return sessionStartTime >= getStartOfYear();
      default:
        return true;
    }
  });
  console.log("filtered", filteredDataByTime);

  return (
    <div className="m-3 mb-0">
      <h2 className="fs-5 mb-3">Activity</h2>
      <Row className="mb-3">
        <Col>
          <ActivityDropdown
            filter={timeFilter}
            setFilter={setTimeFilter}
            filterOptions={TIME_OPTIONS}
          />
        </Col>
        <Col>
          <ActivityDropdown
            filter={dataFilter}
            setFilter={setDataFilter}
            filterOptions={DATA_OPTIONS}
          />
        </Col>
      </Row>
      <div className="graph-container">
        <ActivityGraph data={sessions} />
      </div>
    </div>
  );
};

export default ActivityContainer;
