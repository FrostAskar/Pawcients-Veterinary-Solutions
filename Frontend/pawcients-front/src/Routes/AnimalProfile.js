import React from "react";
import "css/animalprofile.css";
import SideNavbarClient from "Routes/Client/SideNavbarClient";

const animalData = {
  name: "Max",
  image: "https://placedog.net/500/280?id=5",
  species: "Dog",
  breed: "Labrador Retriever",
  age: "3 years",
  gender: "Male",
  weight: "25 kg",
  color: "Golden",
  identificationNumber: "ABC123",
  medicalHistory: "none",

  vaccines: [
    { name: "Rabies", date: "2022-12-15" },
    { name: "Distemper", date: "2022-08-20" },
  ],
  deworming: [
    { name: "Roundworm", date: "2023-01-10" },
    { name: "Fleas and Ticks", date: "2023-02-28" },
  ],
  sterilization: {
    isSterilized: true,
    date: "2022-06-05",
    details: "Max has been neutered.",
  },
  allergies: "None",
  specialNotes: "Max is afraid of thunderstorms.",
};

const AnimalManagementPage = () => {
  const {
    name,
    image,
    species,
    breed,
    age,
    gender,
    weight,
    color,
    identificationNumber,
    medicalHistory,
    vaccines,
    deworming,
    sterilization,
    allergies,
    specialNotes,
  } = animalData;

  return (
    <div className="dashboard">
      <SideNavbarClient />
      <div className="showbuttons">
        <div className="animal-management-page">
          <div className="animal-profile">
            <div className="profile-header">
              <img src={image} alt={name} className="animal-image" />
              <div className="animal-details">
                <h2 className="animal-name">{name}</h2>
                <p>
                  <strong>Species:</strong> {species}
                </p>
              </div>
            </div>
            <div className="profile-details">
              <h3 className="section-title">Profile Details</h3>
              <p>
                <strong>Breed:</strong> {breed}
              </p>
              <p>
                <strong>Age:</strong> {age}
              </p>
              <p>
                <strong>Gender:</strong> {gender}
              </p>
              <p>
                <strong>Weight:</strong> {weight}
              </p>
              <p>
                <strong>Color:</strong> {color}
              </p>
              <p>
                <strong>Identification Number:</strong> {identificationNumber}
              </p>
              <p>
                <strong>Medical History:</strong> {medicalHistory}
              </p>
            </div>
            <div className="additional-info">
              <h3 className="section-title">Additional Information</h3>
              <div className="info-group">
                <div className="info-item">
                  <h4>Vaccines</h4>
                  <ul>
                    {vaccines.map((vaccine, index) => (
                      <li key={index}>
                        {vaccine.name} - {vaccine.date}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="info-item">
                  <h4>Deworming</h4>
                  <ul>
                    {deworming.map((deworm, index) => (
                      <li key={index}>
                        {deworm.name} - {deworm.date}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="info-item">
                  <h4>Sterilization</h4>
                  {sterilization.isSterilized ? (
                    <p>
                      Date: {sterilization.date} - {sterilization.details}
                    </p>
                  ) : (
                    <p>Not sterilized.</p>
                  )}
                </div>
                <div className="info-item">
                  <h4>Allergies</h4>
                  <p>{allergies}</p>
                </div>
              </div>
              <div className="special-notes">
                <h4>Special Notes</h4>
                <p>{specialNotes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalManagementPage;
