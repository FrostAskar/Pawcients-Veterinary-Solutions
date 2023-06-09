import "css/global/global.scss";
import "css/global/variables.css";
import "css/vet/vetHome.scss";
import TodayPatient from "Routes/Worker/TodayPatient";
import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import Paw from "../../media/paw.png";
import ClientCreation from "Routes/Worker/Base/ClientCreation";
import React, { useState, useEffect } from "react";
import { fetchProfile } from "fetches/Global/getProfile";
import { getTodayAppointments } from "fetches/Worker/FetchGetTodayAppointments";
//import { getClients } from "fetches/Worker/Clients/FetchGetClients";

export default function VetDashboard() {
  const [profileData, setProfileData] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);
  //const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getProfileData = async () => {
      const profileData = await fetchProfile();
      setProfileData(profileData);
    };

    const obtainTodayAppointments = async () => {
      const todayAppointmentsData = await getTodayAppointments();
      setTodayAppointments(todayAppointmentsData.appointments);
    };

    getProfileData();
    obtainTodayAppointments();
  }, []);
  
  const [creationMode, setCreationMode] = useState(false);

  const openModal = () => {
    setCreationMode(true);
  }

  const cancelCreation = () => {
    setCreationMode(false);
  }


  return (
    <div className="dashboard">
      <SideNavbarWorker />
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>Welcome, {profileData?.name} </h1>
          <div className="input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
            ></input>
            <i className="material-icons">search</i>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="add-patient">
            <button className="add-patient-button" onClick={openModal}>Add patient</button>
          </div>
          <section className="row-dashboard">
            <div className="section">
              <div className="section-content">
                <div className="total-patients">
                  <div className="total-patients-row">
                    <img src={Paw} alt="paw" height="50px" width="auto" />
                    <div className="total-patients-text">
                      <p>Total patients: </p>
                      <p className="total-patients-number">214</p>
                    </div>
                  </div>
                  <p>
                    Today: <span className="today-patients-number"> {todayAppointments.length}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="section-content">
                <div className="patients-type">
                  <h3>Patients by type</h3>
                  <div className="patients-type-class">
                    <div className="blue-circle"> </div>
                    <p>Dog</p>
                  </div>
                  <div className="patients-type-class">
                    <div className="red-circle"></div>
                    <p>Cat</p>
                  </div>
                  <div className="patients-type-class">
                    <div className="yellow-circle"></div>
                    <p>Others</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="row-dashboard">
            <div className="section">
              <div className="section-content">
                <div className="today-patients">
                  <div className="today-patients-header">
                    <h2> Today Patients </h2>
                    <select>
                      <option value="All Vets"> All vets </option>
                    </select>
                  </div>
                  <div className="today-patients-body">
                    {todayAppointments.map((patient, index) => (
                      <TodayPatient key={index} patient={patient} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="row-dashboard">
            <div className="section">
              <div className="section-content">
                <div className="clinic-revenue">
                  <h2>Clinic Revenue</h2>
                  <h3>Gráfico to guapo</h3>
                </div>
              </div>
            </div>
          </section>
          {creationMode && (
            <ClientCreation onClose={cancelCreation} />
          )}
        </div>
      </div>
    </div>
  );
}
