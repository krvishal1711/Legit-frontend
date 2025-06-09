import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import JobList from "./pages/JobList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/admin-xyz-secret" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
