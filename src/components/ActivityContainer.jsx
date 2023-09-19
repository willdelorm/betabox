import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ActivityGraph from "./ActivityGraph";
import ActivityDropdown from "./ActivityDropdown";
import { getBarData } from "../utils/filter.utils";

const TIME_OPTIONS = ["This month", "Latest 3 months", "Latest 6 months"];
const DATA_OPTIONS = ["Total sessions"];

const ActivityContainer = ({ sessions }) => {
  const [timeFilter, setTimeFilter] = useState(TIME_OPTIONS[0]);
  const [dataFilter, setDataFilter] = useState(DATA_OPTIONS[0]);

  const barData = getBarData(sessions, timeFilter, dataFilter);

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
        <ActivityGraph data={barData} />
      </div>
    </div>
  );
};

export default ActivityContainer;
