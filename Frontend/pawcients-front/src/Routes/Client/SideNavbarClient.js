import React from "react";
import Logo from "media/paw.png";
import Profile from "media/vet.png";
import { Link } from "react-router-dom";

// TODO: FETCH PROFILE DATA
const profileData = [
  {
    id: 1,
    name: "Andrés Pantoja",
    image: "/path/to/andres.png",
  },
];

const SideNavbarClient = () => {
  return (
    <div className="side-navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="user-profile">
        <img src={Profile} alt="Profile" className="profile-picture" />
        <span>{profileData[0].name}</span>
      </div>
      <ul className="nav-links">
        <li>
          <i className="material-icons">pets</i>
          <Link to="/mymascots" className="active">
            My Pets
          </Link>
        </li>
        <li>
          <i className="material-icons">calendar_month</i>
          <Link to="/calendar" className="active">
            Calendar
          </Link>
        </li>
        <li>
          <i className="material-icons"> settings </i>
          <Link to="/profilesettings" className="active">
            Settings
          </Link>
        </li>
        <li className="logout">
          <i className="material-icons">logout</i>
          <Link to="/logout" className="active">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbarClient;
