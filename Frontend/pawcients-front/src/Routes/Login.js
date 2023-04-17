import React from "react";
import Logo from "../media/logo.png";

import "../css/login.css";

function Login() {
  return (
    <div className="page-container">
      <div className="brand-container">
        <img src={Logo} alt="Logo de la marca" width="400px" />
      </div>

      <div className="login-container">
        <form action="/login" method="post">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" id="email" required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" id="password" required />

          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
