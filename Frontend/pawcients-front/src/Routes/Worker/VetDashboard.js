import "css/global/global.scss";
import "css/global/variables.css";
import "css/vet/vetHome.scss";
import TodayPatient from "Routes/Worker/TodayPatient";
import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import FilterComponent from "Routes/Common/FilterComponent";
import Paw from "../../media/paw.png";
import ClientCreation from "Routes/Worker/Base/ClientCreation";
import React, { useState, useEffect } from "react";
import { fetchProfile } from "fetches/Global/getProfile";
import { getTodayAppointments } from "fetches/Worker/Appointments/FetchGetTodayAppointments";
import { getClients } from "fetches/Worker/Clients/FetchGetClients";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";
import { fetchNext7Days } from "fetches/Worker/Appointments/FetchNext7Days";

const animals = [
  { date: "Dogs", citas: 30 },
  { date: "Cats", citas: 45 },
  { date: "Others", citas: 25 },
];

export default function VetDashboard() {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [visibleTodayAppointments, setVisibleTodayAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [title, setTitle] = useState("");
  const [next7days, setNext7days] = useState([]);

  useEffect(() => {
    const getGraphData = async () => {
      const next7daysData = await fetchNext7Days();
      setNext7days(next7daysData);
    };
    getGraphData();
  }, []);

  useEffect(() => {
    const getProfileData = async () => {
      const profileData = await fetchProfile();
      setTitle("Welcome, " + profileData?.name);
    };

    const obtainTodayAppointments = async () => {
      const todayAppointmentsData = await getTodayAppointments();
      setTodayAppointments(todayAppointmentsData.appointments);
      setVisibleTodayAppointments(todayAppointmentsData.appointments);
    };

    getProfileData();
    obtainTodayAppointments();
    obtainClients();
  }, []);

  const obtainClients = async () => {
    const clientsData = await getClients();
    setCustomers(clientsData);
  };

  const [creationMode, setCreationMode] = useState(false);

  const openModal = () => {
    setCreationMode(true);
  };

  const cancelCreation = () => {
    setCreationMode(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const searchText = e.target.value;
    let filtered = [];
    filtered = [...todayAppointments].filter(
      (todayAppointment) =>
        todayAppointment.mascot.name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        todayAppointment.user.name
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
    setVisibleTodayAppointments(filtered);
  };

  return (
    <div className="dashboard">
      <SideNavbarWorker />
      <div className="dashboard-page">
        <FilterComponent title={title} onFilter={handleFilter} />
        <div className="dashboard-content">
          <div className="add-patient">
            <button className="add-patient-button" onClick={openModal}>
              Add patient
            </button>
          </div>
          <section className="row-dashboard">
            <div className="section">
              <div className="section-content">
                <div className="total-patients">
                  <div className="total-patients-row">
                    <img src={Paw} alt="paw" height="50px" width="auto" />
                    <div className="total-patients-text">
                      <p>Total patients: </p>
                      <p className="total-patients-number">
                        {customers.length}
                      </p>
                    </div>
                  </div>
                  <p>
                    Today:{" "}
                    <span className="today-patients-number">
                      {" "}
                      {todayAppointments.length} appointments
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="section-content">
                <div className="patients-type">
                  <h3>Patients by type</h3>
                  <BarChart width={500} height={300} data={animals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
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
                  </div>
                  <div className="today-patients-body">
                    {visibleTodayAppointments.map((patient, index) => (
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
                <div className="appointments-graphic">
                  <h2>Citas</h2>
                  <BarChart width={700} height={200} data={next7days}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="appointments" fill="#8884d8" />
                  </BarChart>
                </div>
              </div>
            </div>
          </section>
          {creationMode && <ClientCreation onClose={cancelCreation} />}
        </div>
      </div>
    </div>
  );
}
