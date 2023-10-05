import React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./components/About/About";
import Pricing from "./components/About/Pricing";
import Create from "./components/Create/Create";
import PaymentConfirmation from "./components/PaymentConfirmation";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Create />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route
            path="/thanks/:checkout_session_id"
            element={<PaymentConfirmation />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
