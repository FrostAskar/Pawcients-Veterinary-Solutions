import React, { useState } from "react";
import PropTypes from "prop-types";

import { fetchPasswordReset } from "fetches/Global/FetchFrogotPassword";

function ChangePasswordModal({ onClose }) {
  const [email, setEmail] = useState(""); // Estado para almacenar el valor del correo electrónico

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPasswordReset(email);
  };

  return (
    <div className="modal management">
      <div className="modal-content">
        <h2 className="management-header">Forgot Password</h2>
        <form className="creation-section" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="small-button">
            Submit
          </button>
        </form>
        <button className="small-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

ChangePasswordModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
