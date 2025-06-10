import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://legit-backend-hjt5.onrender.com/api/jobs";
const ADMIN_TOKEN = "some_secret_token";

const Admin = () => {
  const [formData, setFormData] = useState({
    companyLogo: "",
    companyName: "",
    role: "",
    stipend: "",
    ctc: "",
    location: "",
    applyLink: "",
  });
  const [jobs, setJobs] = useState([]);

  // Fetch jobs for admin
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(API_URL);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${ADMIN_TOKEN}`,
        },
      });
      alert("✅ Job Posted!");
      setFormData({
        companyLogo: "",
        companyName: "",
        role: "",
        stipend: "",
        ctc: "",
        location: "",
        applyLink: "",
      });
      fetchJobs();
    } catch (error) {
      alert("❌ Failed to post job. Check console.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${ADMIN_TOKEN}`,
        },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      alert("❌ Failed to delete job. Check console.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin - Post a Job</h2>
      <form onSubmit={handleSubmit}>
        {["companyLogo", "companyName", "role", "stipend", "ctc", "location", "applyLink"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">Post Job</button>
      </form>
      <h2>All Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <img src={job.companyLogo} alt="logo" width="50" />
          <h3>{job.companyName}</h3>
          <p><strong>Role:</strong> {job.role}</p>
          <p><strong>Stipend:</strong> {job.stipend}</p>
          <p><strong>CTC:</strong> {job.ctc}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <a href={job.applyLink} target="_blank" rel="noreferrer">
            <button>Apply</button>
          </a>
          <button style={{ marginLeft: "10px", background: "red", color: "white" }} onClick={() => handleDelete(job._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admin;