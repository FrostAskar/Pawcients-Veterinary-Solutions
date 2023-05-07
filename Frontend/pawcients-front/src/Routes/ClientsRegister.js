import React, { useState } from "react";
import Logo from "../media/logo.png";

import "../css/forms.css";
import "../css/global.css";
import "../css/variables.css";
import { fetchLogin } from "../fetches/FetchLogin";
import { fetchClientRegister } from "../fetches/FetchClientRegister";

function ClientRegister() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Fetch para login de cliente
      const response = await fetchClientRegister(email, password);
      if (response.success) {

      } else {
        // Mensaje de error para cliente
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="page-container">
      <div className="brand-container">
        <img src={Logo} alt="Logo de la marca" width="400px" />
      </div>

      <div className="main-container">
        <div className="toggle-container">
          <div className="form-container">
            <form onSubmit={handleSubmit} method="post">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />

              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />
              {/* Captcha: */}

              <button type="submit">Sign up client</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientRegister;