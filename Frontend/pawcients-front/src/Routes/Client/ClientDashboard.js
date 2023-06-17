import "css/client/clientdashboard.css";
import "css/global/global.scss";

import { Link } from "react-router-dom";
import NotificationLogo from "media/notificacion.webp";
import ConfiguracionLogo from "media/configuraciones.webp";
import Grafico from "media/grafico.webp";
import Euro from "media/euro.webp";
import SideNavbarClient from "./SideNavbarClient";

//TODO FETCH PROFILE DATA

export default function ClientDashboard() {
  return (
    <div className="dashboard">
      <SideNavbarClient />
      <div className="showbuttons">
        <h1 className="titledash">Client Dashboard</h1>
        <div className="dashboard-container">
          <Link to="/notifications" className="dashboard-button">
            <h2 className="client-dash-card">Notifications Section</h2>
            <img src={NotificationLogo} alt="Imagen 1"></img>
          </Link>
          <Link to="/settings" className="dashboard-button">
            <h2 className="client-dash-card">Profile Settings</h2>
            <img src={ConfiguracionLogo} alt="Imagen 2"></img>
          </Link>
          <Link to="/stadistics" className="dashboard-button">
            <h2 className="client-dash-card">Statistics</h2>
            <img src={Grafico} alt="Imagen 3"></img>
          </Link>
          <Link to="/pricing" className="dashboard-button">
            <h2 className="client-dash-card">Pricing</h2>
            <img src={Euro} alt="Imagen 4"></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
