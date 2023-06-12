import React, { useState, useEffect } from "react";
import "css/global/global.scss";
import "css/vet/dataManagement.scss";
import "css/vet/mascotInfoModal.css";
import { fetchMascotDataVet } from "fetches/Global/FetchMascotData";
import { fetchAddHistory } from "fetches/Worker/Mascots/FetchAddHistory";

export default function MascotInfoModal({ mascotID, type, onClose }) {
  const [mascotInfo, setMascotInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  // TODO - Add success message
  useEffect(() => {
    fetchMascot();

    async function fetchMascot() {
      try {
        const response = await fetchMascotDataVet(mascotID);
        if (response != null) {
          setMascotInfo(response);
        } else {
          setErrorMessage("Failed to fetch mascot information");
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("Error en la conexión con el servidor");
      }
    }
  }, [mascotID]);

  const closeModal = () => {
    onClose();
  };
  const saveInfo = () => {
    // Save to setHistory

    const desc = document.getElementById("desc").value;
    const date = new Date().toLocaleDateString();

    let history = {};

    if (type === "Vaccine") {
      history = {
        type_title: document.getElementById("vaccine").value,
        desc: desc,
        date: date,
      };
    } else if (type === "Checkup") {
      history = {
        type_title: document.getElementById("checkup").value,
        desc: desc,
        date: date,
      };
    } else if (type === "Surgery") {
      history = {
        type_title: document.getElementById("surgery").value,
        desc: desc,
        date: date,
      };
    }

    fetchAddHistory({ history, mascotID, type }).then((response) => {
      if (response.status === 200) {
      } else {
        setErrorMessage("Failed to add history");
      }
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Appointment</h1>
        {mascotInfo ? (
          <div className="mascot-info">
            <img src={mascotInfo.image} alt={mascotInfo.name} />
            <p>
              Owner name: {mascotInfo.ownerName} {mascotInfo.ownerSurname}
            </p>
            <p>Name: {mascotInfo.name}</p>
            <p>Specie: {mascotInfo.species}</p>
            <p>Breed: {mascotInfo.breed}</p>
            <p>Birth Date: {mascotInfo.birthDate}</p>
            <p>Weight: {mascotInfo.weight} kg</p>
            <p>Gender: {mascotInfo.gender}</p>
            {/* Add more mascot information here */}
            <p>Allergies: {mascotInfo.allergies}</p>
            <p>Notes: {mascotInfo.notes}</p>
            {type === "Vaccine" && (
              <div>
                <p>
                  Vaccine: <input type="text" id="vaccine" />
                </p>
                <p>
                  Desc: <textarea id="desc"></textarea>
                </p>
                <p id="dateformating">{new Date().toLocaleDateString()}</p>
              </div>
            )}
            {type === "Checkup" && (
              <div>
                <p>
                  Checkup: <input type="text" id="checkup" />
                </p>
                <p>
                  Desc: <textarea id="desc"></textarea>
                </p>
                <p id="dateformating">{new Date().toLocaleDateString()}</p>
              </div>
            )}
            {type === "Surgery" && (
              <div>
                <p>
                  Surgery: <input type="text" id="surgery" />
                </p>
                <p>
                  Desc: <textarea id="desc"></textarea>
                </p>
                <p id="dateformating">{new Date().toLocaleDateString()}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Loading mascot information...</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="clasic-button" onClick={closeModal}>
          Close
        </button>
        <button className="clasic-button" onClick={saveInfo}>
          Save
        </button>
      </div>
    </div>
  );
}
