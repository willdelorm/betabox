import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Splash from "./pages/Splash";
import NewSession from "./pages/sessions/New";

function App() {
  return (
    <div className="vw-100 vh-100 bg-light">
      <Routes>
        {/* <Route path="/" element={<Splash />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/" element={<NewSession />} />
      </Routes>
    </div>
  );
}

export default App;
