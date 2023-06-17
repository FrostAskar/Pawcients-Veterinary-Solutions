import React, { useEffect, useState } from "react";
import Logo from "media/paw.webp";
import { Link } from "react-router-dom";
import "css/global/global.scss";
import "css/global/variables.css";
import "css/vet/vetHome.scss";
import { fetchProfile } from "fetches/Global/getProfile";

const SideNavbarWorker = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const profileData = await fetchProfile();
      setProfileData(profileData);
    };
    getProfileData();
  }, []);

  useEffect(() => {
    const iat = parseInt(localStorage.getItem("IAT"), 10);
    if (iat && iat > Date.now()) {
      localStorage.removeItem("IAT");
      localStorage.removeItem("token");
      window.location.href = "/sessionexpired";
    }
    if (localStorage.getItem("token") == null) {
      window.location.href = "/login";
    }
  }, []);

  if (profileData && !profileData.verificationCodeEmailCheck) {
    window.location.href = "/confirmationemail";
  }

  return (
    <div className="side-navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="user-profile">
        <img
          src={profileData?.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <span>{profileData?.name + " " + profileData?.surname}</span>
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
          <Link to="/vetcalendar" className="active">
            Calendar
          </Link>
        </li>
        <h3>BASE</h3>
        <li>
          <i className="material-icons"> local_hospital </i>
          <Link to="/vet/staff" className="active">
            Veterinarians
          </Link>
        </li>
        <li>
          <i className="material-icons"> group </i>
          <Link to="/vet/clients" className="active">
            Clients
          </Link>
        </li>
        <li>
          <i className="material-icons"> pets </i>
          <Link to="/vet/mascots" className="active">
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
  );
};

export default SideNavbarWorker;
