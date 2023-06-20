import React, { useState } from "react";
import Logo from "media/logo.webp";

import "css/global/forms.css";
import "css/global/global.scss";
import "css/global/variables.css";
import { fetchLogin } from "fetches/Global/FetchLogin";
import ChangePasswordModal from "Routes/LandingPage/Modals/ChangePasswordModal";
import { Link } from "react-router-dom";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const openModal = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Fetch para login de cliente
      await fetchLogin(email, password).then((response) => {
        localStorage.setItem("IAT", response.iat);
        if (response.status === 401) {
          setErrorMessage("Email or password incorrect");
        }
      });
    } catch (error) {
      setErrorMessage("Email or password incorrect");
    }
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-container">
      <div className="brand-container">
        <img src={Logo} alt="Logo de la marca" width="400px" />
      </div>

      <div className="main-container">
        <div className="toggle-container">
          <div className="form-container">
            <form className="clasic-form" onSubmit={handleSubmit} method="post">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />

              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />

              <button className="form-button" type="submit">
                Log in
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {/* Froget pass */}
              <br></br>
              <Link onClick={openModal} className="forgot-password-link" to="#">
                Forgot password?
              </Link>
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <ChangePasswordModal onClose={() => setShowModal(false)}>
          {/* Contenido del modal */}
        </ChangePasswordModal>
      )}
    </div>
  );
}

export default Login;
