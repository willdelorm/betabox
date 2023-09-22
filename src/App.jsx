import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Splash from "./pages/Splash";
import NewSession from "./pages/New";
import History from "./pages/History";

function App() {
  return (
    <div className="w-100 vh-100 bg-light">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/new" element={<NewSession />} />
      </Routes>
    </div>
  );
}

export default App;
