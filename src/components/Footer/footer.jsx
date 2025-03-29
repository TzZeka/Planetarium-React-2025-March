import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "../../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
       
      {/* Социални мрежи */}
      <div className="footer-section social-links">
        <h3>Follow Me</h3>
        <div className="social-icons">
          <a href="https://github.com/TzZeka" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.instagram.com/tzzeka/" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com/in/tsvetomir-genov-b5146b2a5/" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.facebook.com/TsGenov" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>

        
      {/* Контакти */}
      <div className="footer-section contact-info">
        <h3>Contacts</h3>
        <p className="Name"><strong>Tsvetomir Genov</strong></p>
        <p>Email: <a href="mailto:tzekage@gmail.com">tzekage@gmail.com</a></p>
      </div>
    
      
      {/* Кредити или допълнителна информация */}
      <div className="footer-section credits">
        <p>&copy; 2025 Planetarium. All rights reserved. 
            <br/><strong>Tzekage</strong></p>
      </div>
      <div className="footer-section softuni-logo">
        <h3>Software University</h3>
        <a
          href="https://softuni.bg"
          target="_blank"
          rel="noopener noreferrer"
          className="softuni-link"
        >
          <img
            src="/images/LogoSoftwareUniversity.png"
            alt="SoftUni Logo"
            className="softuni-icon"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
