import React, { useState } from "react";
import Logo from "media/paw.png";
import Profile from "media/vet.png";
import { Link } from "react-router-dom";
import "css/profilesettings.css";
import "css/vet/dashboard.scss";

const ProfileSettings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handlePasswordChange = () => {
    // Lógica para cambiar la contraseña
    if (newPassword === confirmPassword) {
      // Realizar la actualización de la contraseña en el backend
      console.log("Contraseña cambiada con éxito");
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  const handleProfileImageChange = (event) => {
    // Lógica para cambiar la foto de perfil
    const imageFile = event.target.files[0];
    // Realizar la carga de la imagen al backend
    console.log("Foto de perfil cambiada con éxito");
    setProfileImage(URL.createObjectURL(imageFile));
  };

  return (
    <div className="dashboard">
      <div className="side-navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="user-profile">
          <img src={Profile} alt="Profile" className="profile-picture" />
          {/* <span>{profileData.user.name}</span> */}
        </div>
        <ul className="nav-links">
          <li>
            <i className="material-icons">home</i>
            <Link to="/vetdashboard" className="active">
              Home
            </Link>
          </li>
          <li>
            <i className="material-icons">calendar_month</i>
            <Link to="/calendar" className="active">
              Calendar
            </Link>
          </li>
          <h3>BASE</h3>
          <li>
            <i className="material-icons">local_hospital</i>
            <Link to="/veterinarians" className="active">
              Veterinarians
            </Link>
          </li>
          <li>
            <i className="material-icons">group</i>
            <Link to="/clients" className="active">
              Clients
            </Link>
          </li>
          <li>
            <i className="material-icons">pets</i>
            <Link to="/mascots" className="active">
              Mascots
            </Link>
          </li>
          <h3>ACCOUNT</h3>
          <li>
            <i className="material-icons">settings</i>
            <Link to="/logout" className="active">
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

      <div className="profile-settings-page">
        <h2>Configuración de perfil</h2>

        <h3>Cambiar contraseña</h3>
        <input
          type="password"
          placeholder="Contraseña actual"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="password-change-button"
          onClick={handlePasswordChange}
        >
          Cambiar contraseña
        </button>

        <h3>Cambiar foto de perfil</h3>
        <input
          className="profile-image-input"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
        />
        {profileImage && (
          <img
            className="profile-image"
            src={profileImage}
            alt="Foto de perfil"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
