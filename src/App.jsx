import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Splash from "./pages/Splash";
import NewSession from "./pages/sessions/New";

import sessionsReducer from "./reducers/sessionsReducer";
import {
  SessionsContext,
  SessionsDispatchContext,
} from "./contexts/SessionsContext.js";

const SESSIONS_DATA = [
  {
    id: "KwtO8SJbhxe_u99-KcgSf",
    title: "Tester",
    notes: "",
    location: "",
    date: new Date(2023, 8, 25),
    climbs: [
      {
        id: "Ap_e82zad6-MDrQwZNoH2",
        grade: 9,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "p-v1yLDGr08m67hwXWx_r",
        grade: 8,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "AUzKY-qx_QhUGre-S-E1d",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Project",
        attempts: 1,
        isEdited: false,
      },
    ],
  },
  {
    id: "dO3eVMO6xIlulKHEHto3Q",
    title: "test 3",
    notes: "do i nav?",
    location: "office",
    date: new Date(2023, 8, 23),
    climbs: [
      {
        id: "VfE4OHvT8n5saZMBeTFLD",
        grade: 10,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "FuzrIpfEnyHuutcglwh_L",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "JIlZaY8vUTGg3o6ZNPuDm",
        grade: 8,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "qQr8wu98cXqnTu9adV4PU",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "61spPlE6nGgcHrHE627kH",
        grade: 3,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
    ],
  },
  {
    id: "iwM_IxVgcpAWBKYBmw4-w",
    title: "ghj",
    notes: "bnm",
    location: "tyu",
    date: new Date(2023, 8, 20),
    climbs: [
      {
        id: "FuzrIpfEnyHuutcglwh_L",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "JIlZaY8vUTGg3o6ZNPuDm",
        grade: 8,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "qQr8wu98cXqnTu9adV4PU",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Project",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "61spPlE6nGgcHrHE627kH",
        grade: 3,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
    ],
  },
  {
    id: "N9Lb7VdtSz7oTlWN2qNuK",
    title: "ghj",
    notes: "bnm",
    location: "tyu",
    date: new Date(2023, 8, 19),
    climbs: [
      {
        id: "FuzrIpfEnyHuutcglwh_L",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "JIlZaY8vUTGg3o6ZNPuDm",
        grade: 8,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "qQr8wu98cXqnTu9adV4PU",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "61spPlE6nGgcHrHE627kH",
        grade: 3,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
    ],
  },
  {
    id: "wZjpdOyIru4hQPnfr97bT",
    title: "ghj",
    notes: "bnm",
    location: "tyu",
    date: new Date(2023, 8, 15),
    climbs: [
      {
        id: "FuzrIpfEnyHuutcglwh_L",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "JIlZaY8vUTGg3o6ZNPuDm",
        grade: 8,
        name: "",
        note: "",
        effort: 0,
        style: "Flash",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "qQr8wu98cXqnTu9adV4PU",
        grade: 2,
        name: "",
        note: "",
        effort: 0,
        style: "Project",
        attempts: 1,
        isEdited: false,
      },
      {
        id: "61spPlE6nGgcHrHE627kH",
        grade: 3,
        name: "",
        note: "",
        effort: 0,
        style: "Project",
        attempts: 1,
        isEdited: false,
      },
    ],
  },
];

function App() {
  const [sessions, dispatch] = useReducer(sessionsReducer, SESSIONS_DATA);

  return (
    <div className="w-100 vh-100 bg-light">
      <SessionsContext.Provider value={sessions}>
        <SessionsDispatchContext.Provider value={dispatch}>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sessions/new" element={<NewSession />} />
          </Routes>
        </SessionsDispatchContext.Provider>
      </SessionsContext.Provider>
    </div>
  );
}

export default App;
