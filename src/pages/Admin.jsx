import React, { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://legit-backend-hjt5.onrender.com/api/jobs", formData, {
        headers: {
          Authorization: "Bearer some_secret_token"
        }
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
    } catch (error) {
      alert("❌ Failed to post job. Check console.");
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
    </div>
  );
};

export default Admin;
