import React, { useState, useEffect } from "react";
import "css/common/confirmationEmail.css";
import { fetchVerifyEmail } from "fetches/Global/FetchVerifyEmail";
import { fetchProfile } from "fetches/Global/getProfile";

const ConfirmationEmail = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const profileData = await fetchProfile();
      setProfileData(profileData);
    };

    getProfileData();
  }, []);

  if (profileData && profileData.verificationCodeEmailCheck) {
    if (profileData.type === "client") {
      window.location.href = "/profilesettings";
    }
    if (profileData.type === "vet" || profileData.type === "admin") {
      window.location.href = "/profilesettings";
    }
  }

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
    const response = fetchVerifyEmail(confirmationCode);
    response.then((data) => {
      console.log("Response:", data);
      //if (data.status === "ok") {
        if (response != null) {
        if (profileData.type === "client") {
          window.location.href = "/clientdashboard";
        }
        if (profileData.type === "vet") {
          window.location.href = "/vetdashboard";
        }
      } else {
        alert("Wrong code");
      }
    });
  };

  const handleClearCode = () => {
    setCode(Array(6).fill(""));
    document.getElementById(`code-input-0`).focus();
  };

  return (
    <div className="confirmation-code-container">
      <h2 class="confirmation-code-title">Please enter the 6-digit code we sent to your email:</h2>
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
