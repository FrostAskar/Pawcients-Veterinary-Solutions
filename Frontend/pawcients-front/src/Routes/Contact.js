import React from "react";
import "../css/contact.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="contact-info">
        <div className="contact-details">
          <h3>Contact Details</h3>
          <p>
            Address: 123 Main St
            <br />
            City, State Zip
            <br />
            Country
          </p>
          <p>Phone: 555-555-5555</p>
          <p>Email: info@company.com</p>
        </div>
      </div>

      <div className="social-media">
        <Link to="https://www.facebook.com">
          <FontAwesomeIcon icon="fab fa-facebook-f" />
        </Link>
        <Link to="https://www.twitter.com">
          <FontAwesomeIcon icon="fab fa-twitter" />
        </Link>
        <Link to="https://www.instagram.com">
          <FontAwesomeIcon icon="fab fa-instagram" />
        </Link>
        <Link to="https://www.youtube.com">
          <FontAwesomeIcon icon="fab fa-linkedin" />
        </Link>
      </div>
    </div>
  );
};

export default Contact;
library.add(fab, fas, far);
