import React from "react";
import "../css/PresentationPage.css";
import "../css/variables.css";
import pawcientsLogo from "../media/paw.png";
import clinicImage from "../media/clinic.png";
import veterinarianImage from "../media/vet.png";
import patientImage from "../media/pet.png";

const PresentationPage = () => {
  return (
    <div className="presentation-page">
      <div className="presentation-header">
        <img src={pawcientsLogo} alt="Pawcients Logo" className="logo-image" />
        <h1>Pawcients: The Ultimate Veterinary Clinic Management Software</h1>
      </div>
      <div className="presentation-content">
        <div className="presentation-section">
          <div className="presentation-text">
            <h2>Manage your clinic with ease</h2>
            <p>
              Pawcients makes it easy to manage your veterinary clinic. With our
              software, you can manage appointments, patients, prescriptions,
              and more all in one place.
            </p>
          </div>
          <img
            src={clinicImage}
            alt="Clinic"
            className="presentation-image left"
          />
        </div>
        <div className="presentation-section">
          <img
            src={patientImage}
            alt="Patient"
            className="presentation-image right"
          />
          <div className="presentation-text">
            <h2>Connect with your patients</h2>
            <p>
              Pawcients helps you connect with your patients like never before.
              With our software, you can easily communicate with pet owners,
              track patient history, and provide personalized care.
            </p>
          </div>
        </div>
        <div className="presentation-section">
          <div className="presentation-text">
            <h2>Streamline your workflow</h2>
            <p>
              Pawcients streamlines your workflow so you can focus on what
              matters most: providing the best possible care to your patients.
              With our software, you can automate tasks, create custom reports,
              and more.
            </p>
          </div>
          <img
            src={veterinarianImage}
            alt="Veterinarian"
            className="presentation-image left"
          />
        </div>
      </div>
    </div>
  );
};

export default PresentationPage;
