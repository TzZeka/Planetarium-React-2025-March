import React from "react";
import { Link } from "react-router";
import "../../Styles/NotFound.css";
const NotFound404 = () => {
  return (
    <div className="not-found-container">
      <div className="background-overlay"></div> 
      <h1 className="error-code">404</h1>
      <h2 className="error-msg">Lost in Space</h2>
      <p className="error-desc">
        The page you're seeking has traveled to another galaxy.<br/>Engage warp drive or teleport back home!
      </p>
      <Link to="/" className="home-link">
       Return to Base  
      </Link>
    </div>
  );
};

export default NotFound404;
