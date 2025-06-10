import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Add this import

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("https://legit-backend-hjt5.onrender.com/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <header className="header">
        <h1>JobEase.</h1>
      </header>
      <h2>Latest Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id} className="job-list" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" ,display: "flex", alignItems: "center" , flexDirection: "column"}}>
          <img src={job.companyLogo} alt="logo" width="50" />
          <h3>{job.companyName}</h3>
          <p><strong>Role:</strong> {job.role}</p>
          <p><strong>Stipend:</strong> {job.stipend}</p>
          <p><strong>CTC:</strong> {job.ctc}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <Link to={`/jobs/${job._id}`}>
            <button>Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;