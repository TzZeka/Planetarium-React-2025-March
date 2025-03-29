import React from "react";
import "../../Styles/About.css";

const About = () => {
  return (
    <div className="about-container">
    
      <img
        src="/images/LogoSoftwareUniversity.png"
        alt="Software University Logo"
        className="university-logo"
      />

      
      <h1 className="about-title">About This Project</h1>

     
      <a href="/contacts" className="contact-button">
        Contact Us &rarr;
      </a>

     
      <div className="about-content">
        <article className="about-article">
          <h3>Welcome</h3>
          <p>
            Welcome to a galactic adventure built on React.
            This project, created as part of a student assignment at <strong>Software University</strong>,
            showcases the creative potential of web development.
          </p>
        </article>

        <article className="about-article">
          <h3>Crafted by Tsvetomir Genov</h3>
          <p>
            Designed with dedication and precision by <strong>Tsvetomir Genov</strong>, this platform aims to inspire,
            teach, and demonstrate the endless possibilities of modern web technologies.
          </p>
        </article>

        <article className="about-article">
          <h3>Mission Statement</h3>
          <p>
            Our mission is clear: merge creativity with technology to craft an experience that's out of this world!
          </p>
        </article>
      </div>
    </div>
  );
};

export default About;
