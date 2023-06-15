import React, { useState, useEffect, useRef } from "react";
import "css/global/global.scss";
import "css/vet/dataManagement.scss";
import "css/vet/mascotInfoModal.css";
import { fetchMascotDataVet } from "fetches/Global/FetchMascotData";
import {
  fetchAddHistoryVaccine,
  fetchAddHistorySurgery,
  fetchAddHistoryDeworming,
  fetchAddHistoryCheckup,
} from "fetches/Worker/Mascots/FetchAddHistory";
import { FetchPutAppoinment } from "fetches/Worker/Appointments/FetchPutAppointment";
import moment from "moment";

export default function MascotInfoModal({
  mascotID,
  type,
  onClose,
  appointmentID,
}) {
  const [mascotInfo, setMascotInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [checkupType, setCheckupType] = useState("1");
  // TODO - Add success message
  const checkupTypeRef = useRef(null);

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

  const handleCheckupTypeChange = (e) => {
    setCheckupType(e.target.value); // Actualizar el estado con el valor seleccionado
  };

  const saveInfo = () => {
    // Save to setHistory

    const desc = document.getElementById("desc").value;
    const date = new Date().toLocaleDateString();

    let history = {};

    if (type === "Vaccine") {
      let renewal = "";
      if (document.getElementById("renewal").value === "1") {
        renewal = moment(date).add(3, "months").format("YYYY-MM-DD");
      } else if (document.getElementById("renewal").value === "2") {
        renewal = moment(date).add(6, "months").format("YYYY-MM-DD");
      } else if (document.getElementById("renewal").value === "3") {
        renewal = moment(date).add(1, "year").format("YYYY-MM-DD");
      }

      history = {
        vaccineName: document.getElementById("vaccine").value,
        visitNotes: desc,
        vaccineRenewal: renewal,
      };
      if (history.vaccineName === "" || history.visitNotes === "") {
        setErrorMessage("Please fill all the fields");
        return;
      }

      fetchAddHistoryVaccine({ history, mascotID }).then((response) => {
        if (response.status === 200) {
          setSuccessMessage("History added successfully");
        } else {
          setErrorMessage("Failed to add history");
        }
      });
    } else if (type === "Checkup") {
      if (checkupType === "1") {
        history = {
          visitNotes: desc,
        };
        if (history.visitNotes === "") {
          setErrorMessage("Please fill all the fields");
          return;
        }

        fetchAddHistoryCheckup(history, mascotID).then((response) => {
          if (response.status === 200) {
            setSuccessMessage("History added successfully");
          }
        });
      } else if (checkupType === "2") {
        history = {
          dewormingName: document.getElementById("checkup").value,
          visitNotes: desc,
        };
        if (history.dewormingName === "" || history.visitNotes === "") {
          setErrorMessage("Please fill all the fields");
          return;
        }
        fetchAddHistoryDeworming(history, mascotID).then((response) => {
          if (response.status === 200) {
            setSuccessMessage("History added successfully");
          } else {
            setErrorMessage("Failed to add history");
          }
        });
      }
    } else if (type === "Surgery") {
      history = {
        surgeryName: document.getElementById("surgery").value,
        visitNotes: desc,
      };
      if (history.surgeryName === "" || history.visitNotes === "") {
        setErrorMessage("Please fill all the fields");
        return;
      }

      fetchAddHistorySurgery(history, mascotID).then((response) => {
        if (response.status === 200) {
          setSuccessMessage("History added successfully");
        } else {
          setErrorMessage("Failed to add history");
        }
      });
    }
    FetchPutAppoinment(appointmentID, true);
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Appointment</h1>
        <form>
          {mascotInfo ? (
            <div className="mascot-info">
              <img
                src={
                  mascotInfo.photo === null
                    ? "https://img.freepik.com/vector-gratis/silueta-pastor-aleman-diseno-plano_23-2150283164.jpg"
                    : mascotInfo.photo
                }
                alt={mascotInfo.name}
                width="200"
              />

              <p>Name: {mascotInfo.name}</p>
              <p>Specie: {mascotInfo.species}</p>
              <p>Breed: {mascotInfo.breed}</p>
              <p>Birth Date: {mascotInfo.birthDate}</p>
              <p>Weight: {mascotInfo.weight} kg</p>
              <p>Gender: {mascotInfo.gender}</p>

              {type === "Vaccine" && (
                <div>
                  <p>
                    Vaccine: <input type="text" id="vaccine" required />
                  </p>
                  <p>
                    Notes: <textarea id="desc" required></textarea>
                  </p>
                  <br></br>
                  <p>
                    Renewal:{" "}
                    <select id="renewal" required>
                      <option value="1">3 months</option>
                      <option value="2">6 months</option>
                      <option value="3">1 year</option>
                    </select>
                  </p>
                  <br></br>
                </div>
              )}
              {type === "Checkup" && (
                <>
                  <select
                    id="checkuptype"
                    ref={checkupTypeRef}
                    required
                    defaultValue={checkupType}
                    onChange={handleCheckupTypeChange}
                  >
                    <option value="1">Checkup</option>
                    <option value="2">Deworming</option>
                  </select>

                  {checkupType === "1" && (
                    <div>
                      <p>
                        Notes: <textarea id="desc" required></textarea>
                      </p>
                    </div>
                  )}
                  {checkupType === "2" && (
                    <div>
                      <p>
                        Deworming: <input type="text" id="checkup" required />
                      </p>
                      <p>
                        Notes: <textarea id="desc" required></textarea>
                      </p>
                    </div>
                  )}
                </>
              )}

              {type === "Surgery" && (
                <div>
                  <p>
                    Surgery: <input type="text" id="surgery" required />
                  </p>
                  <p>
                    Desc: <textarea id="desc" required></textarea>
                  </p>
                  <p id="dateformating">{new Date().toLocaleDateString()}</p>
                </div>
              )}
            </div>
          ) : (
            <p>Loading mascot information...</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <button className="clasic-button" onClick={closeModal}>
            Close
          </button>
          <button type="button" className="clasic-button" onClick={saveInfo}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
