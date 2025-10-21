import React from "react";
import "../Styles/Team.css";
import profileImage from '../Assets/HarshVardhan.jpg'

const teamMembers = [
  {
    name: "Harsh Vardhan",
    role: "Full Stack Developer",
    image: "image",
    linkedin: "https://www.linkedin.com/in/harsh-vardhan-b0072921b/",
    github: "https://github.com/harshkali2003",
  },
];

const Team = () => {
  return (
    <div className="team-container">
      <h1>Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={profileImage} alt={member.name} className="team-img" />
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <div className="social-links">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
