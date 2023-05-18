import "../css/clientdashboard.css";
import Logo from "../media/paw.png";
import Profile from "../media/vet.png";
import { Link } from "react-router-dom";
import NotificationLogo from "../media/notificacion.png";
import ConfiguracionLogo from "../media/configuraciones.png";
import Grafico from "../media/grafico.png";
import Euro from "../media/euro.png";

//TODO FETCH PROFILE DATA
const profileData = [
  {
    id: 1,
    name: "Andrés Pantoja",
    image: "/path/to/andres.png",
  },
];

export default function ClientDashboard() {
  return (
    <div className="dashboard">
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
            <Link to="/mymascots" className="active">
              My Pets
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="active">
              Calendar
            </Link>
          </li>
          <li className="logout">
            <Link to="/logout" className="active">
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="showbuttons">
        <h1 className="titledash">Welcome, {profileData[0].name}</h1>
        <div class="dashboard-container">
          <Link to="/notifications" className="dashboard-button">
            <h2>Notifications Section</h2>
            <img src={NotificationLogo} alt="Imagen 1"></img>
          </Link>
          <Link to="/settings" className="dashboard-button">
            <h2>Profile Settings</h2>
            <img src={ConfiguracionLogo} alt="Imagen 2"></img>
          </Link>
          <Link to="/stadistics" className="dashboard-button">
            <h2>Statistics</h2>
            <img src={Grafico} alt="Imagen 3"></img>
          </Link>
          <Link to="/pricing" className="dashboard-button">
            <h2>Pricing</h2>
            <img src={Euro} alt="Imagen 4"></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
