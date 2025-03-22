import React from "react";
import "../../Styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="title">About this Project</h2>
        <p className="description">
          This project was developed as part of a student assignment at Software University SoftUni. The goal of the project is to demonstrate the practical application of web development skills, focusing on React.
        </p>
        <p className="description">
          Created with dedication and a love for coding by <strong>Tsvetomir Genov</strong>.
        </p>
        <img
            src="/images/LogoSoftwareUniversity.png"
            alt="University Logo"
            className="university-logo"
        />
        <div className="links">
          <a href="/contacts" className="link">
            Go to Contacts &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
