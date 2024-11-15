import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "css/common/navbar.css";
import "css/global/variables.css";
import Paw from "media/paw.webp";

export default function NavbarLanding() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Lógica para determinar si se muestra el navbar

    // Ejemplo: Mostrar el navbar en todas las rutas excepto en la página de inicio "/"
    const locationsWithoutNavbar = [
      "/client/" + location.pathname.split("/")[2] + "/mascots",
      "/login",
      "/signup",
      "/clientdashboard",
      "/vetdashboard",
      "/profilesettings",
      "/vet/clients",
      "/vet/staff",
      "/vet/mascots",
      "/client/" +
        location.pathname.split("/")[2] +
        "/mascot/" +
        location.pathname.split("/")[4],
      "/vet/mascot/" + location.pathname.split("/")[3],
      "/vetcalendar",
      "/clientcalendar",
      "/confirmationemail",
    ];

    setShowNavbar(!locationsWithoutNavbar.includes(location.pathname));
  }, [location]);

  return (
    <>
      {showNavbar && (
        <nav className="landing-navbar">
          <Link to="/" className="landing-logo">
            <img src={Paw} alt="Logo" width="60px" />
          </Link>
          <ul className="landing-nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutus">About us</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="landing-auth-buttons">
            <Link to="/login" className="landing-sign-in-button">
              Login
            </Link>
            <Link to="/signup" className="landing-register-button">
              Register
            </Link>
          </div>
        </nav>
      )}
      <Outlet />
    </>
  );
}
