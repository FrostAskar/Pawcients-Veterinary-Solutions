import React, { useState } from "react";
import Logo from "media/logo.png";

import "css/global/forms.css";
import "css/global/global.scss";
import "css/global/variables.css";
import { fetchLogin } from "fetches/Global/FetchLogin";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Fetch para login de cliente
      const response = await fetchLogin(email, password);
      if (response.status === 401) {
        // Contraseña incorrecta
      }
    } catch (error) {
      setErrorMessage("Email o contraseña incorrectos");
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
            <form className="clasic-form" onSubmit={handleSubmit} method="post">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />

              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />

              <button className="form-button" type="submit">
                Log in
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
