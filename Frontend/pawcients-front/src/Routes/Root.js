import { Link, Outlet } from "react-router-dom";
import "../css/navbar.css";
import Paw from "../media/paw.png";

export default function Root() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={Paw} alt="Logo" width="60px" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/acerca-de">About us</Link>
          </li>
          <li>
            <Link to="/servicios">Services</Link>
          </li>
          <li>
            <Link to="/contacto">Contact</Link>
          </li>
        </ul>
        <div className="auth-buttons">
          <Link to="/login" className="sign-in-button">
            Login
          </Link>
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
