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

function App() {
  const [sessions, dispatch] = useReducer(sessionsReducer, []);

  return (
    <div className="vw-100 vh-100 bg-light">
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
