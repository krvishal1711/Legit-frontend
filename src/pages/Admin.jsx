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
    description: "",
  });
  const [jobs, setJobs] = useState([]);

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
        description: "",
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
    <div className="admin-container">
      <section className="admin-section">
        <h2 className="admin-title">Admin – Post a Job</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          {["companyLogo", "companyName", "role", "stipend", "ctc", "location", "applyLink"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          ))}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
          <button type="submit" className="admin-btn admin-btn-primary">Post Job</button>
        </form>
      </section>
      <section className="admin-section">
        <h2 className="admin-title">All Jobs</h2>
        <div className="admin-job-list">
          {jobs.map((job) => (
            <div className="admin-job-card" key={job._id}>
              <div className="admin-job-header">
                <img src={job.companyLogo} alt="logo" />
                <div>
                  <h3>{job.companyName}</h3>
                  <span className="admin-job-role">{job.role}</span>
                </div>
              </div>
              <div className="admin-job-details">
                <p><strong>Stipend:</strong> {job.stipend}</p>
                <p><strong>CTC:</strong> {job.ctc}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Description:</strong> {job.description}</p>
              </div>
              <div className="admin-actions">
                <a href={job.applyLink} target="_blank" rel="noreferrer">
                  <button className="admin-btn admin-btn-success">Apply</button>
                </a>
                <button
                  className="admin-btn admin-btn-danger"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;