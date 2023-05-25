import React from "react";
import Logo from "media/paw.png";
import Profile from "media/vet.png";
import { Link } from "react-router-dom";
import "css/global/global.scss";
import "css/global/variables.css";
import "css/vet/dashboard.scss";

const SideNavbarWorker = () => {
  //TODO Fetch Today patitents

  return (
    <div className="dashboard">
      <div className="side-navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="user-profile">
          <img src={Profile} alt="Profile" className="profile-picture" />
          <span>Andrés Pantoja</span>
        </div>
        <ul className="nav-links">
          <li>
            <i className="material-icons"> home </i>
            <Link to="/vetdashboard" className="active">
              Home
            </Link>
          </li>
          <li>
            <i className="material-icons"> calendar_month </i>
            <Link to="/calendar" className="active">
              Calendar
            </Link>
          </li>
          <h3>BASE</h3>
          <li>
            <i className="material-icons"> local_hospital </i>
            <Link to="/veterinarians" className="active">
              Veterinarians
            </Link>
          </li>
          <li>
            <i className="material-icons"> group </i>
            <Link to="/clients" className="active">
              Clients
            </Link>
          </li>
          <li>
            <i className="material-icons"> pets </i>
            <Link to="/mascots" className="active">
              Mascots
            </Link>
          </li>
          <h3>ACCOUNT</h3>
          <li>
            <i className="material-icons"> settings </i>
            <Link to="/profilesettings" className="active">
              Settings
            </Link>
          </li>
          <li className="logout">
            <i className="material-icons"> logout </i>
            <Link to="/logout" className="active">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbarWorker;
