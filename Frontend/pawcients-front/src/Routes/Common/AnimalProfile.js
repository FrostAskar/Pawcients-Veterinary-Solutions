import React, { useState, useEffect } from "react";
import "css/global/animalprofile.scss";
import SideNavbarClient from "Routes/Client/SideNavbarClient";
import { fetchMascotData } from "fetches/Global/FetchMascotData";

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
  //Get url parameters
  const url = window.location.pathname;
  // If path is /client/:clientid/mascot/:mascotid, then:
  const clientid = url.split("/")[2];
  const mascotid = url.split("/")[4];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMascotData(clientid, mascotid);
        setEditedAnimalData(data);
      } catch (error) {
        console.error("Error fetching mascot data:", error);
      }
    };

    fetchData();
  }, [clientid, mascotid]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedAnimalData, setEditedAnimalData] = useState(animalData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Aquí puedes guardar los datos editados, por ejemplo, enviar una solicitud al servidor
    // usando editedAnimalData como los nuevos datos de la mascota
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAnimalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeVaccine = (index, value) => {
    setEditedAnimalData((prevData) => {
      const vaccines = [...prevData.vaccines];
      vaccines[index].name = value;
      return {
        ...prevData,
        vaccines,
      };
    });
  };

  const handleChangeVaccineDate = (index, value) => {
    setEditedAnimalData((prevData) => {
      const vaccines = [...prevData.vaccines];
      vaccines[index].date = value;
      return {
        ...prevData,
        vaccines,
      };
    });
  };

  const handleChangeDeworm = (index, value) => {
    setEditedAnimalData((prevData) => {
      const deworming = [...prevData.deworming];
      deworming[index].name = value;
      return {
        ...prevData,
        deworming,
      };
    });
  };

  const handleChangeDewormDate = (index, value) => {
    setEditedAnimalData((prevData) => {
      const deworming = [...prevData.deworming];
      deworming[index].date = value;
      return {
        ...prevData,
        deworming,
      };
    });
  };

  const handleSterilizationChange = (e) => {
    const { name, checked } = e.target;
    setEditedAnimalData((prevData) => ({
      ...prevData,
      sterilization: {
        ...prevData.sterilization,
        [name]: checked,
      },
    }));
  };

  const handleChangeSterilizationDate = (e) => {
    const { value } = e.target;
    setEditedAnimalData((prevData) => ({
      ...prevData,
      sterilization: {
        ...prevData.sterilization,
        date: value,
      },
    }));
  };

  const handleChangeSterilizationDetails = (e) => {
    const { value } = e.target;
    setEditedAnimalData((prevData) => ({
      ...prevData,
      sterilization: {
        ...prevData.sterilization,
        details: value,
      },
    }));
  };
  const handleChangeHistory = (index, value) => {
    setEditedAnimalData((prevData) => {
      const medicalHistory = [...prevData.medicalHistory];
      medicalHistory[index].description = value;
      return {
        ...prevData,
        medicalHistory,
      };
    });
  };

  const handleAddVaccine = () => {
    setEditedAnimalData((prevData) => {
      const vaccines = [...prevData.vaccines, { name: "", date: "" }];
      return {
        ...prevData,
        vaccines,
      };
    });
  };

  const handleAddDeworm = () => {
    setEditedAnimalData((prevData) => {
      const deworming = [...prevData.deworming, { name: "", date: "" }];
      return {
        ...prevData,
        deworming,
      };
    });
  };

  const handleAddHistory = () => {
    setEditedAnimalData((prevData) => {
      const medicalHistory = [
        ...prevData.medicalHistory,
        { date: "", description: "" },
      ];
      return {
        ...prevData,
        medicalHistory,
      };
    });
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
                <h2 className="animal-name">{name}</h2>
                <p>
                  <strong>Species:</strong> {species}
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
              <p>
                <strong>Identification Number:</strong> {identificationNumber}
              </p>
              <p>
                <strong>Medical History:</strong>{" "}
                {isEditing ? (
                  <ul>
                    {medicalHistory.map((history, index) => (
                      <li key={index}>
                        <span>
                          History:
                          <input
                            className="animalprofile-input"
                            type="text"
                            name={`history-${index}`}
                            value={history.description}
                            onChange={(e) =>
                              handleChangeHistory(index, e.target.value)
                            }
                          />
                        </span>{" "}
                        <span>
                          Date:{" "}
                          <input
                            className="animalprofile-input"
                            type="text"
                            name={`history-date-${index}`}
                            value={history.date}
                            onChange={(e) =>
                              handleChangeHistory(index, e.target.value)
                            }
                          />
                        </span>
                        <hr></hr>
                        <br></br>
                      </li>
                    ))}
                    <li>
                      <button
                        className="animalprofile-button"
                        onClick={handleAddHistory}
                      >
                        New
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    {medicalHistory.map((history, index) => (
                      <li key={index}>
                        {history.description} {history.date}
                      </li>
                    ))}
                  </ul>
                )}
              </p>
            </div>
            <div className="additional-info">
              <h3 className="section-title">Additional Information</h3>
              <div className="info-group">
                <div className="info-item">
                  <h4>Vaccines</h4>
                  {isEditing ? (
                    <ul>
                      {vaccines.map((vaccine, index) => (
                        <li key={index}>
                          <span>
                            Vaccine:
                            <input
                              className="animalprofile-input"
                              type="text"
                              name={`vaccine-${index}`}
                              value={vaccine.name}
                              onChange={(e) =>
                                handleChangeVaccine(index, e.target.value)
                              }
                            />
                          </span>{" "}
                          <span>
                            Date:
                            <input
                              className="animalprofile-input"
                              type="text"
                              name={`vaccine-date-${index}`}
                              value={vaccine.date}
                              onChange={(e) =>
                                handleChangeVaccineDate(index, e.target.value)
                              }
                            />
                          </span>
                          <hr></hr>
                          <br></br>
                        </li>
                      ))}
                      <li>
                        <button
                          className="animalprofile-button"
                          onClick={handleAddVaccine}
                        >
                          New
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      {vaccines.map((vaccine, index) => (
                        <li key={index}>
                          {vaccine.name} {vaccine.date}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="info-item">
                  <h4>Deworming</h4>
                  {isEditing ? (
                    <ul>
                      {deworming.map((deworm, index) => (
                        <li key={index}>
                          <span>
                            Deworm:{" "}
                            <input
                              className="animalprofile-input"
                              type="text"
                              name={`deworm-${index}`}
                              value={deworm.name}
                              onChange={(e) =>
                                handleChangeDeworm(index, e.target.value)
                              }
                            />
                          </span>{" "}
                          <span>
                            Date:{" "}
                            <input
                              className="animalprofile-input"
                              type="text"
                              name={`deworm-date-${index}`}
                              value={deworm.date}
                              onChange={(e) =>
                                handleChangeDewormDate(index, e.target.value)
                              }
                            />
                          </span>
                          <hr></hr>
                          <br></br>
                        </li>
                      ))}
                      <li>
                        <button
                          className="animalprofile-button"
                          onClick={handleAddDeworm}
                        >
                          New
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      {deworming.map((deworm, index) => (
                        <li key={index}>
                          {deworm.name} {deworm.date}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="info-item">
                  <h4>Sterilization</h4>
                  {isEditing ? (
                    <>
                      <input
                        type="checkbox"
                        name="isSterilized"
                        checked={sterilization.isSterilized}
                        onChange={handleSterilizationChange}
                      />{" "}
                      Sterilized
                      {sterilization.isSterilized && (
                        <>
                          <br />
                          <label>Date:</label>{" "}
                          <input
                            className="animalprofile-input"
                            type="text"
                            name="sterilization-date"
                            value={sterilization.date}
                            onChange={handleChangeSterilizationDate}
                          />
                          <br />
                          <label>Details:</label>{" "}
                          <input
                            className="animalprofile-input"
                            type="text"
                            name="sterilization-details"
                            value={sterilization.details}
                            onChange={handleChangeSterilizationDetails}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <p>
                      {sterilization.isSterilized
                        ? `Sterilized (${sterilization.date}): ${sterilization.details}`
                        : "Not sterilized"}
                    </p>
                  )}
                  <br />
                  <hr></hr>
                </div>
                <div className="info-item">
                  <h4>Allergies</h4>
                  {isEditing ? (
                    <input
                      className="animalprofile-input"
                      type="text"
                      name="allergies"
                      value={allergies}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{allergies}</p>
                  )}
                </div>
              </div>

              <div className="special-notes">
                <h4>Special Notes</h4>
                {isEditing ? (
                  <textarea
                    className="animalprofile-input"
                    name="specialNotes"
                    value={specialNotes}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{specialNotes}</p>
                )}
              </div>
            </div>
          </div>
          <div className="button-container">
            {isEditing ? (
              <button className="btn-save" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="btn-edit" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalManagementPage;
