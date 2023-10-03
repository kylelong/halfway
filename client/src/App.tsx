import React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./components/About/About";
import Pricing from "./components/About/Pricing";
import Create from "./components/Create/Create";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Create />}></Route>
          {/* <Route path="/demo" element={<Demo />}></Route> */}

          <Route path="/about" element={<About />}></Route>

          {/* <Route path="/signup" element={<signup />}></Route> */}
          <Route path="/pricing" element={<Pricing />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
