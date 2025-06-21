import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://legit-backend-hjt5.onrender.com/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
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
    <div className="joblist-container">
      <header className="joblist-header">
        <h1>JobEase</h1>
        <button className="joblist-add-btn" onClick={handleAddJob}>
          Add Job
        </button>
      </header>
      <h2 className="joblist-title">Latest Job Openings</h2>
      <div className="joblist-list">
        {jobs.map((job) => (
          <div key={job._id} className="joblist-card">
            <img src={job.companyLogo} alt="logo" className="joblist-logo" />
            <div className="joblist-info">
              <h3>{job.companyName}</h3>
              <p>
                <strong>Role:</strong> {job.role}
              </p>
              <p>
                <strong>Stipend:</strong> {job.stipend}
              </p>
              <p>
                <strong>CTC:</strong> {job.ctc}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
            </div>
            <a
              href={`https://legit-frontend-kdtr.onrender.com/jobs/${job._id}`}
              target="_blank"
              rel="noreferrer"
              className="joblist-details-link"
            >
              <button className="joblist-details-btn">Details</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
