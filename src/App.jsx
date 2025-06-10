import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/admin-xyz-secret" element={<Admin />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
