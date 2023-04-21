import React, { useState } from "react";
import Logo from "../media/logo.png";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "../css/login.css";
import { fetchLoginWorker, fetchLoginClient } from "../fetches/FetchLogin";

function Login() {
  const [isClient, setIsClient] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (isClient) {
        // Fetch para login de cliente
        const response = await fetchLoginClient(email, password);
        if (response.success) {
          // Lógica de redirección o mensaje de éxito para cliente
          console.log("Login de cliente exitoso");
        } else {
          // Mensaje de error para cliente
          setErrorMessage(response.message);
        }
      } else {
        // Fetch para login de trabajador
        const response = await fetchLoginWorker(email, password);
        if (response.message === "ok") {
          // Lógica de redirección o mensaje de éxito para trabajador
          console.log("Login de trabajador exitoso");
          // redirect to /vet
          window.location.href = "/vet";
        } else {
          // Mensaje de error para trabajador
          setErrorMessage(response.message);
        }
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
          <Toggle
            className="toggle-switch"
            checked={isClient}
            onChange={() => setIsClient(!isClient)}
            icons={false}
          />

          <span className="toggle-label">
            {isClient ? "Log in as Client" : "Log in as Worker"}
          </span>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />

            <button type="submit">
              {isClient ? "Log in as Client" : "Log in as Worker"}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
