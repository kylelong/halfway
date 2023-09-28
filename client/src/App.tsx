import React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
