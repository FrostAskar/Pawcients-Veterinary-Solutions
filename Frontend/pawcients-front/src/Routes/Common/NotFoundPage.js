import React from "react";
import { Link } from "react-router-dom";
import "css/common/notfound.css";
import Logo from "media/logo.png";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <img src={Logo} alt="Logo" width="400px" margin="auto" />
      <h1>Sorry, page not found</h1>
      <p>
        The page you are looking for does not exist. Please check the URL or go
        back to the homepage.
      </p>
      <Link to="/" className="home-button">
        Go to homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
