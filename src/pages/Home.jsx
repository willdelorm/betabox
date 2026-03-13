import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSessionsFromAuth } from "../utils/firebase.utils";
import { loadModal } from "../utils/modal.utils";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Layout from "../components/Layout";
import SessionsListItem from "../components/SessionsListItem";
import ViewSessionModal from "../components/ViewSessionModal";

const Home = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getUserSessionsFromAuth().then((arr) => {
      setSessions(arr);
    });
  }, []);

  const chartData = [...sessions]
    .sort((a, b) => a.startTime.seconds - b.startTime.seconds)
    .map((session) => ({
      date: new Date(session.startTime.seconds * 1000).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      ),
      climbs: session.climbs.length,
    }));

  const emptySessionsList = <p>No sessions recorded.</p>;

  const sessionsListView = sessions.length
    ? sessions.map((session) => (
        <SessionsListItem
          key={session.id}
          session={session}
          handleClick={() => loadModal(session, setModalData, setModalShow)}
        />
      ))
    : emptySessionsList;

  return (
    <Layout theme="warning">
      <div className="m-3 mt-0 flex-grow-1 overflow-auto">
        {chartData.length > 0 && (
          <div className="my-4">
            <h2 className="fs-6 mb-2">Climbs Over Time</h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12 }}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="climbs" fill="#ffc107" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <h2 className="fs-6 mb-3">Recent Sessions</h2>

        <ListGroup variant="flush">
          {sessionsListView}
          <ListGroup.Item className="d-flex justify-content-between align-items-center bg-light px-0 py-1">
            <p
              className="fs-7 fw-bold my-2"
              onClick={() => navigate("/history")}
            >
              View All
            </p>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <Button
        variant="dark"
        size="lg"
        className="w-100 rounded-0"
        onClick={() => navigate("/new")}
      >
        Start a session
      </Button>
      {modalShow && (
        <ViewSessionModal
          show={modalShow}
          data={modalData}
          handleHide={() => setModalShow(false)}
        />
      )}
    </Layout>
  );
};

export default Home;
