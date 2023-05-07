import React from "react";
import "../css/aboutus.css";
import "../css/variables.css";
import pawcientsImage from "../media/logo.png";

const AboutUs = () => {
  return (
    <div className="about">
      <div className="left-column">
        <h1>About Us</h1>
        <p>
          Pawcients Veterinary Solutions was born as a Final Degree Project at
          Es Liceu School, located in Marratxi, Balearic Islands. Our passion
          for animals led us to create a solution that would improve their
          health and well-being.
        </p>
        <p>
          The project was created by Dámaso, Andrés and Maru, three dedicated
          animal lovers who wanted to make a difference in the lives of pets and
          animals. Their vision was to provide accessible and high-quality
          veterinary care to all animals, regardless of their owners' income or
          background.
        </p>
        <p>
          At Pawcients Veterinary Solutions, we believe that every animal
          deserves the best possible care. That's why we offer a range of
          services, including routine check-ups, vaccinations, surgeries, and
          more. Our experienced team of veterinarians and technicians are
          dedicated to providing compassionate care to every patient that comes
          through our doors.
        </p>
        <p>
          Thank you for choosing Pawcients Veterinary Solutions for your pet's
          healthcare needs. We look forward to serving you and your furry
          friend.
        </p>
        <div className="creators">
          <p>Created by:</p>
          <ul>
            <li>Dámaso</li>
            <li>Andrés</li>
            <li>Maru</li>
          </ul>
        </div>
      </div>
      <div className="right-column">
        <img src={pawcientsImage} alt="Pawcients Veterinary Solutions" />
      </div>
    </div>
  );
};

export default AboutUs;
