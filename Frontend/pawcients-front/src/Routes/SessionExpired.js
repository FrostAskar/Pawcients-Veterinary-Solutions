import React from "react";
import { Link } from "react-router-dom";
import animalImg from "../media/pet.png";

const SessionExpired = () => {
  return (
    <div>
      <div className="session-expired">
        <img src={animalImg} alt="Animal" />
        <h2>Your session has expired</h2>
        <p>Please log in again to continue using the application.</p>
        <Link to="/login" className="login-button">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SessionExpired;
