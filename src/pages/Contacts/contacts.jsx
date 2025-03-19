import React from "react";
import "./Contacts.css";

const Contacts = () => {
  return (
    <div className="contacts-container">
      <div className="contact-info">
        <h2 className="title">Contact Us</h2>
        <p className="description">
          I'm here to help! If you have any questions or feedback do not hesitate to reach out with me .
        </p>
        <div className="contact-details">
          <div className="detail">
            <strong>Email:</strong> <a href="mailto:tsgenov@abv.bg">tsgenov@abv.bg</a>
          </div>
          <div className="detail">
            <strong>Phone:</strong> <a href="tel:+123456789">+359123456789</a>
          </div>
          <div className="detail">
            <strong>Address:</strong> Sofia, Bulgaria
          </div>
          <div className="map">
        <iframe
          title="Map of Sofia"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.482768150881!2d23.32217841529644!3d42.69553777916512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85c3cbb8cf1d%3A0x65cb567492053ef!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2sbg!4v1681234567890!5m2!1sen!2sbg"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
        </div>
      </div>
      <div className="contact-form">
        <h3 className="form-title">Send me a message</h3>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Write your message here..." required></textarea>
          </div>
          <button type="submit" className="submit-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
