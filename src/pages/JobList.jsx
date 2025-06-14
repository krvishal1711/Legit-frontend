import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://legit-backend-hjt5.onrender.com/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handler for Add Job button
  const handleAddJob = () => {
    const token = prompt("Enter admin token to access Add Job:");
    if (token === "Eq5j883Wr@1724") {
      navigate("/admin-xyz-secret");
    } else if (token !== null) {
      alert("Invalid token. Access denied.");
    }
  };

  return (
    <div>
      <header className="header">
        <h1>JobEase.</h1>
      </header>
      <div style={{ textAlign: "right", margin: "10px 20px" }}>
        <button onClick={handleAddJob} style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 22px",
          borderRadius: "6px",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer"
        }}>
          Add Job
        </button>
      </div>
      <h2>Latest Job Openings</h2>
      {jobs.map((job) => (
        <div key={job._id} className="job-list">
          <img src={job.companyLogo} alt="logo" width="50" />
          <h3>{job.companyName}</h3>
          <p><strong>Role:</strong> {job.role}</p>
          <p><strong>Stipend:</strong> {job.stipend}</p>
          <p><strong>CTC:</strong> {job.ctc}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <a href={`/jobs/${job._id}`} target="_blank" rel="noreferrer">
            <button>Details</button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobList;