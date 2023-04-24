import React, { useState } from "react";
import Logo from "../media/logo.png";

import "../css/login.css";
import { fetchLogin } from "../fetches/FetchLogin";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Fetch para login de cliente
      const response = await fetchLogin(email, password);
      if (response.success) {
        // Lógica de redirección o mensaje de éxito para cliente
        console.log("Login de cliente exitoso");
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

      <div className="login-container">
        <div className="toggle-container">
          <div className="form-container">
            <form onSubmit={handleSubmit} method="post">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />

              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />
              {/* Captcha: */}

              <button type="submit">Login</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
