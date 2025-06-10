import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`https://legit-backend-hjt5.onrender.com/api/jobs`)
      .then(res => {
        const foundJob = res.data.find(j => j._id === id);
        setJob(foundJob);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <img src={job.companyLogo} alt="logo" width="50" />
      <h3>{job.companyName}</h3>
      <p><strong>Role:</strong> {job.role}</p>
      <p><strong>Stipend:</strong> {job.stipend}</p>
      <p><strong>CTC:</strong> {job.ctc}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description || "No description provided."}</p>
      <a href={job.applyLink} target="_blank" rel="noreferrer">
        <button>Apply</button>
      </a>
    </div>
  );
};

export default JobDetails;