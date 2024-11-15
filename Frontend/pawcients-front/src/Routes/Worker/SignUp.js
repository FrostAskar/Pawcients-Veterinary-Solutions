import React, { useState } from "react";
import Logo from "media/logo.webp";

import { fetchSignup } from "fetches/Worker/FetchSignUp";
import "css/global/global.scss";
import "css/global/variables.css";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.vetName.value;
    const surname = e.target.lastname.value;
    const email = e.target.email.value;
    const phone = e.target.vetPhone.value;
    const license = e.target.licenseNumber.value;
    const password = e.target.password.value;
    const confimartionPassword = e.target.confirmPassword.value;

    const clinicName = e.target.clinicName.value;
    const streetAddress = e.target.streetAddress.value;
    const streetNumber = e.target.streetNumber.value;
    const clinicZipCode = e.target.zipCode.value;
    const clinicPhoneNumber = e.target.clinicPhone.value;

    const clinicAddress = streetAddress + " " + streetNumber;

    if (!password === confimartionPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      try {
        const response = await fetchSignup(
          name,
          surname,
          email,
          phone,
          license,
          password,
          clinicName,
          clinicAddress,
          clinicZipCode,
          clinicPhoneNumber
        );
        if (response.status === 200) {
          // Redirección a Home o Login
          window.location.href = "/login";
        } else if (response.status === 409){
          // Mensaje de error para cliente
          const data = await response.json()
          setErrorMessage(data.error);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("Error connecting to server");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="brand-container">
        <img src={Logo} alt="Pawcients logo" width="400px" />
      </div>

      <div className="main-container">
        <div className="toggle-container">
          <div className="form-container">
            <form className="clasic-form" onSubmit={handleSubmit} method="post">
              <div className="signup-details">
                <div className="vet-details">
                  <h2 className="details-title"> Veterinary details </h2>

                  <label htmlFor="vetName">Name</label>
                  <input type="text" name="vetName" id="vetName" required />

                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" name="lastname" id="lastname" required />

                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" required />

                  <label htmlFor="vetPhone">Phone</label>
                  <input type="text" name="vetPhone" id="vetPhone" required />

                  <label htmlFor="licenseNumber">License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    id="licenseNumber"
                    required
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                  />

                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                  />
                </div>
                <div className="clinic-details">
                  <h2 className="details-title">Clinic details</h2>

                  <label htmlFor="clinicName">Clinic Name</label>
                  <input
                    type="text"
                    name="clinicName"
                    id="clinicName"
                    required
                  />

                  <label htmlFor="clinicPhone">Clinic Phone</label>
                  <input
                    type="country"
                    name="clinicPhone"
                    id="clinicPhone"
                    required
                  />

                  <label htmlFor="streetAddress">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    required
                  />

                  <label htmlFor="streetNumber">Street Number</label>
                  <input
                    type="number"
                    name="streetNumber"
                    id="streetNumber"
                    required
                  />

                  <label htmlFor="zipCode">Zip Code</label>
                  <input type="text" name="zipCode" id="zipCode" required />
                </div>
              </div>
              {/* Captcha: */}

              <button className="form-button" type="submit">
                Sign up
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
