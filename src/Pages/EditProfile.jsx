import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SignupImg from "../Assets/Login.jpg";
import "../Styles/Auth.css";

function EditPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("phone_no", formData.phone);

    if (formData.image instanceof File) {
      formDataToSend.append("file", formData.image);
    }

    try {
      const res = await fetch(
        `https://miniyt-backend.onrender.com/user/edit/${id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataToSend,
        }
      );

      const result = await res.json();

      if (result.message === "success") {
        toast.success("Profile edited successfully");
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/profile");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Internal server error");
    }
  };
  useEffect(() => {
    const getDetails = async () => {
      let data = await fetch(
        `https://miniyt-backend.onrender.com/user/user/${id}`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      data = await data.json();
      console.log(id);
      setFormData({
        name: data.data.name || "",
        email: data.data.email || "",
        password: "",
        phone: data.data.phone_no || "",
        image: data.data.filename || null,
      });
    };

    getDetails();
  }, [id]);

  return (
    <>
      <div className="containerAuth">
        <div className="boxAuth1">
          <p>simply edit details</p>
          <h2>Edit Your Account</h2>
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
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Apply Changes</button>
        </div>

        <div className="boxAuth2">
          <img src={SignupImg} alt="signup" />
        </div>
      </div>
    </>
  );
}

export default EditPage;
