import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {toast} from 'react-toastify'
import "../Styles/Footer.css";

function Footer() {
  const[email , setEmail] = useState([])
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let data = await fetch(`https://miniyt-backend.onrender.com/subscribe/new` , {
      method : "POST",
      body : JSON.stringify({email}),
      headers : {'Content-Type' : 'application/json'}
    })
    data = await data.json()
    if(data.message === "success"){
      toast.success("subscribed successfully")
      setEmail(null)
    }else{
      toast.error("something went wrong")
    }
  }
  return (
    <>
      <footer className="containerFoot">
        <div className="boxFoot1">
          <div id="foot1">
            <h3>miniYT</h3>
            <div id="icons">
              <p>
                <FaFacebook />
              </p>
              <p>
                <FaTwitter />
              </p>
              <p>
                <FaWhatsapp />
              </p>
            </div>
          </div>
          <div id="foot2">
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div id="foot3">
            <p>
              <input type="text" placeholder="subscribe us" value={email} onChange={(e)=> setEmail(e.target.value)}/>{" "}
              <button onClick={handleSubmit}>get</button>
            </p>
          </div>
        </div>
        <div className="boxFoot2">
          <p>2025@all right reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
