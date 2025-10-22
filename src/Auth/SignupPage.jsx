import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignupImg from "../Assets/Login.jpg"; // you can replace with another image if you want
import "../Styles/Auth.css";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone_no", formData.phone_no);
    if (formData.file) data.append("file", formData.file);

    try {
      const res = await fetch("https://miniyt-backend.onrender.com/user/sign", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.message === "success") {
        toast.success("Account has been created");
        navigate("/log");
      } else {
        toast.error(result.message || "Failed to create account");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="containerAuth">
        <div className="boxAuth1">
          <p>Join Us</p>
          <h2>Create Your Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone_no"
            placeholder="Your Phone Number"
            value={formData.phone_no}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Sign Up</button>
          <p id="sign">
            Already have an account? <Link to="/log">Log in</Link>
          </p>
        </div>

        <div className="boxAuth2">
          <img src={SignupImg} alt="signup" />
        </div>
      </div>
    </>
  );
}

export default SignupPage;
