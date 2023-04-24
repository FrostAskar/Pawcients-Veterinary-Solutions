import React, { useState } from "react";
import "../css/confirmationEmail.css";

const ConfirmationEmail = () => {
  const [code, setCode] = useState(Array(6).fill(""));

  const handleChange = (event, index) => {
    const { value } = event.target;
    setCode([
      ...code.slice(0, index),
      value,
      ...code.slice(index + 1, code.length),
    ]);
    if (value !== "" && index < code.length - 1) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleSendCode = () => {
    const confirmationCode = code.join("");
    // Send confirmationCode to backend
    console.log("Sending confirmation code:", confirmationCode);
  };

  const handleClearCode = () => {
    setCode(Array(6).fill(""));
    document.getElementById(`code-input-0`).focus();
  };

  return (
    <div className="confirmation-code-container">
      <p>Please enter the 6-digit code we sent to your email:</p>
      <div className="code-inputs-container">
        {code.map((value, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength="1"
            value={value}
            className="code-input"
            onChange={(event) => handleChange(event, index)}
          />
        ))}
        <button className="clear-code-button" onClick={handleClearCode}>
          X
        </button>
      </div>

      <div className="button-container">
        <button className="send-code-button" onClick={handleSendCode}>
          Send Code
        </button>
      </div>
    </div>
  );
};

export default ConfirmationEmail;
