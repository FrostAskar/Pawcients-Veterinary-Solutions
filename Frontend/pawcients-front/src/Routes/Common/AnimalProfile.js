import React, { useState, useEffect, useRef } from "react";
import "css/global/animalprofile.scss";
import SideNavbarClient from "Routes/Client/SideNavbarClient";
import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import {
  fetchMascotData,
  fetchMascotDataVet,
  fetchMascotDataVetHistory,
  fetchMascotDataChangeProfileInfo,
} from "fetches/Global/FetchMascotData";
import { fetchProfile } from "fetches/Global/getProfile";
import { parseISO, differenceInYears } from "date-fns";

const AnimalManagementPage = () => {
  const [fetchedAnimalData, setFetchedAnimalData] = useState(null);
  // Get url parameters
  const url = window.location.pathname;
  // If path is /client/:clientid/mascot/:mascotid, then:
  const clientidRef = useRef("");
  const mascotidRef = useRef("");

  const [profileData, setProfileData] = useState(null);
  const [visits, setVisits] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const profileData = await fetchProfile();
      setProfileData(profileData);
    };

    getProfileData();
  }, []);

  useEffect(() => {
    let isMounted = true; // Variable auxiliar para controlar el estado del componente

    if (url.includes("client")) {
      clientidRef.current = url.split("/")[2];
      mascotidRef.current = url.split("/")[4];

      const fetchData = async () => {
        try {
          const data = await fetchMascotData(
            clientidRef.current,
            mascotidRef.current
          );
          if (isMounted) {
            setFetchedAnimalData(data);
          }
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
          if (isMounted) {
            setFetchedAnimalData(data);
          }
        } catch (error) {
          console.error("Error fetching mascot data:", error);
        }
      };
      fetchData();
    }
    const fetchHistoryData = async () => {
      try {
        const historyData = await fetchMascotDataVetHistory(
          mascotidRef.current
        );
        if (isMounted) {
          setVisits(historyData?.history.visits || []); // Almacena el historial de visitas en el estado "visits"
        }
      } catch (error) {
        console.error("Error fetching mascot history:", error);
      }
    };
    fetchHistoryData();

    // Cleanup function to cancel fetch requests and prevent state updates on unmounted components
    return () => {
      isMounted = false;
    };
  }, [profileData?.type, url]);

  const animalData = {
    name: fetchedAnimalData?.name,
    image: fetchedAnimalData?.photo,
    species: fetchedAnimalData?.species,
    breed: fetchedAnimalData?.breed,
    birthDate: fetchedAnimalData?.birthDate,
    gender: fetchedAnimalData?.gender,
    weight: fetchedAnimalData?.weight,
    color: fetchedAnimalData?.color,
    identificationNumber: fetchedAnimalData?.identificationSerial,
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnimalData, setEditedAnimalData] = useState(animalData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setEditedAnimalData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    // Send only profile details of the animal to backend
    const editedAnimalDataToSend = {
      mascot: {
        ...fetchedAnimalData?.mascot,
        image: editedAnimalData?.image,
        species: editedAnimalData.species,
        breed: editedAnimalData.breed,
        birthDate: editedAnimalData.birthDate,
        gender: editedAnimalData.gender,
        weight: editedAnimalData.weight,
        color: editedAnimalData.color,
        identificationNumber: editedAnimalData.identificationNumber,
      },
    };

    fetchMascotDataChangeProfileInfo(
      mascotidRef.current,
      editedAnimalDataToSend.mascot
    );

    setIsEditing(false);
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "name" ||
      name === "species" ||
      name === "breed" ||
      name === "birthDate" ||
      name === "gender" ||
      name === "weight" ||
      name === "color" ||
      name === "identificationNumber"
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
    birthDate,
    gender,
    weight,
    color,
    identificationNumber,
  } = isEditing ? editedAnimalData : animalData;
  return (
    <div className="dashboard">
      {profileData?.type === "vet" ||
        profileData?.type === "aux" ||
        profileData?.type === "admin" ? (
        <SideNavbarWorker />
      ) : (
        <SideNavbarClient />
      )}
      <div className="dashboard-page">
          <div className="animal-management-page">
            <div className="animal-profile">
              <div className="profile-header">
                <img
                  src={
                    selectedImage !== null
                      ? selectedImage
                      : image === null
                        ? "https://img.freepik.com/vector-gratis/silueta-pastor-aleman-diseno-plano_23-2150283164.jpg"
                        : selectedImage || image
                  }
                  alt={name}
                  className="animal-image"
                />

                {isEditing && (
                  <div className="image-upload">
                    <input
                      className="animalprofile-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
                <div className="animal-details"></div>
              </div>
              <div className="profile-details">
                <h2 className="animal-name">
                  <strong>Name: {animalData.name}</strong>
                </h2>
                <div className="animal-details-species">
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
                      type="date"
                      name="birthDate"
                      onChange={handleChange}
                      value={birthDate}
                    />
                  ) : (
                    //geT bitrhdate and calculate

                    differenceInYears(new Date(), parseISO(birthDate))
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
                <p>
                  <strong>Identification Number:</strong>{" "}
                  {isEditing ? (
                    <input
                      className="animalprofile-input"
                      type="text"
                      name="identificationNumber"
                      value={identificationNumber}
                      onChange={handleChange}
                    />
                  ) : (
                    animalData.identificationNumber
                  )}
                </p>
                {isEditing ? (
                  <button onClick={handleSaveClick}>Save</button>
                ) : (
                  <button onClick={handleEditClick}>Edit</button>
                )}
              </div>
              {visits && visits.length > 0 ? (
                <div>
                  <h3 className="section-title">Visits History</h3>
                  <ul>
                    {visits.map((visit, index) => (
                      <li key={index}>
                        <p>Date: {visit.date}</p>
                        <p>Notes: {visit.notes}</p>
                        {visit.vaccine && (
                          <>
                            <p>Vaccine: {visit.vaccine.name}</p>
                            <p>Renewal: {visit.vaccine.renewalDate}</p>
                          </>
                        )}
                        {visit.surgery && (
                          <>
                            <p>Surgery: {visit.surgery.name}</p>
                          </>
                        )}

                        {visit.deworming && (
                          <>
                            <p>Deworming: {visit.deworming.name}</p>
                          </>
                        )}
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No visit history available.</p>
              )}
            </div>
          </div>
        </div>

    </div>
  );
};

export default AnimalManagementPage;
