import React, { useState, useEffect, useRef } from "react";
import "css/global/animalprofile.scss";
import SideNavbarClient from "Routes/Client/SideNavbarClient";
import {
  fetchMascotData,
  fetchMascotDataVet,
} from "fetches/Global/FetchMascotData";
import { fetchProfile } from "fetches/Global/getProfile";

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
  medicalHistory: [
    { date: "2021-12-15", description: "Max has a broken leg." },
    { date: "2021-08-20", description: "Max has a broken tail." },
  ],
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
  // Get url parameters
  const url = window.location.pathname;
  // If path is /client/:clientid/mascot/:mascotid, then:
  const clientidRef = useRef("");
  const mascotidRef = useRef("");

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const profileData = await fetchProfile();
      setProfileData(profileData);
    };

    getProfileData();
  }, []);

  useEffect(() => {
    if (url.includes("client")) {
      clientidRef.current = url.split("/")[2];
      mascotidRef.current = url.split("/")[4];

      const fetchData = async () => {
        try {
          const data = await fetchMascotData(
            clientidRef.current,
            mascotidRef.current
          );
        } catch (error) {
          console.error("Error fetching mascot data:", error);
        }
      };
      fetchData();
    }
    if (url.includes("vet")) {
      mascotidRef.current = url.split("/")[3];
      const fetchData = async () => {
        try {
          const data = await fetchMascotDataVet(mascotidRef.current);
        } catch (error) {
          console.error("Error fetching mascot data:", error);
        }
      };
      fetchData();
    }
  }, [profileData?.type, url]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedAnimalData, setEditedAnimalData] = useState(animalData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Send only profile details of the animal to backend
    const editedAnimalDataToSend = {
      name: editedAnimalData.name,
      image: editedAnimalData.image,
      species: editedAnimalData.species,
      breed: editedAnimalData.breed,
      age: editedAnimalData.age,
      gender: editedAnimalData.gender,
      weight: editedAnimalData.weight,
      color: editedAnimalData.color,
    };
    console.log("Sending edited animal data:", editedAnimalDataToSend);

    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "name" ||
      name === "species" ||
      name === "breed" ||
      name === "age" ||
      name === "gender" ||
      name === "weight" ||
      name === "color"
    ) {
      setEditedAnimalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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
  } = isEditing ? editedAnimalData : animalData;

  return (
    <div className="dashboard">
      <SideNavbarClient />
      <div className="showbuttons">
        <div className="animal-management-page">
          <div className="animal-profile">
            <div className="profile-header">
              <img src={image} alt={name} className="animal-image" />
              <div className="animal-details">
                <h2 className="animal-name">
                  {isEditing ? (
                    <input
                      className="animalprofile-input"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  ) : (
                    name
                  )}
                </h2>
                <p>
                  <strong>Species:</strong>{" "}
                  {isEditing ? (
                    <input
                      className="animalprofile-input"
                      type="text"
                      name="species"
                      value={species}
                      onChange={handleChange}
                    />
                  ) : (
                    species
                  )}
                </p>
              </div>
            </div>
            <div className="profile-details">
              <h3 className="section-title">Profile Details</h3>
              <p>
                <strong>Breed:</strong>{" "}
                {isEditing ? (
                  <input
                    className="animalprofile-input"
                    type="text"
                    name="breed"
                    value={breed}
                    onChange={handleChange}
                  />
                ) : (
                  breed
                )}
              </p>
              <p>
                <strong>Age:</strong>{" "}
                {isEditing ? (
                  <input
                    className="animalprofile-input"
                    type="text"
                    name="age"
                    value={age}
                    onChange={handleChange}
                  />
                ) : (
                  age
                )}
              </p>
              <p>
                <strong>Gender:</strong>{" "}
                {isEditing ? (
                  <input
                    className="animalprofile-input"
                    type="text"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                  />
                ) : (
                  gender
                )}
              </p>
              <p>
                <strong>Weight:</strong>{" "}
                {isEditing ? (
                  <input
                    className="animalprofile-input"
                    type="text"
                    name="weight"
                    value={weight}
                    onChange={handleChange}
                  />
                ) : (
                  weight
                )}
              </p>
              <p>
                <strong>Color:</strong>{" "}
                {isEditing ? (
                  <input
                    className="animalprofile-input"
                    type="text"
                    name="color"
                    value={color}
                    onChange={handleChange}
                  />
                ) : (
                  color
                )}
              </p>
              {isEditing ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={handleEditClick}>Edit</button>
              )}
              <p>
                <strong>Identification Number:</strong> {identificationNumber}
              </p>
            </div>
            <div className="medical-history">
              <h3 className="section-title">Medical History</h3>
              {medicalHistory.map((record, index) => (
                <div key={index} className="record">
                  <p>
                    <strong>Date:</strong> {record.date}
                  </p>
                  <p>
                    <strong>Description:</strong> {record.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="vaccines">
              <h3 className="section-title">Vaccines</h3>
              {vaccines.map((vaccine, index) => (
                <div key={index} className="vaccine">
                  <p>
                    <strong>Name:</strong> {vaccine.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {vaccine.date}
                  </p>
                </div>
              ))}
            </div>

            <div className="deworming">
              <h3 className="section-title">Deworming</h3>
              {deworming.map((deworm, index) => (
                <div key={index} className="deworm">
                  <p>
                    <strong>Name:</strong> {deworm.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {deworm.date}
                  </p>
                </div>
              ))}
            </div>

            <div className="sterilization">
              <h3 className="section-title">Sterilization</h3>
              <p>
                <strong>Status:</strong>{" "}
                {sterilization.isSterilized ? "Sterilized" : "Not sterilized"}
              </p>
              <p>
                <strong>Date:</strong> {sterilization.date}
              </p>
              <p>
                <strong>Details:</strong> {sterilization.details}
              </p>
            </div>

            <div className="allergies">
              <h3 className="section-title">Allergies</h3>
              <p>{allergies}</p>
            </div>

            <div className="special-notes">
              <h3 className="section-title">Special Notes</h3>
              <p>{specialNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalManagementPage;
