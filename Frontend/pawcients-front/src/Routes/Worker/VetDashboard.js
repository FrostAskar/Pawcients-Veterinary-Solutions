import "css/global/global.scss";
import "css/global/variables.css";
import "css/vet/dashboard.scss";
import PatientCard from "Routes/Worker/PatientCard";
import { fetchProfile } from "fetches/getProfile";
import SideNavbarWorker from "./SideNavbarWorker";

function getProfileData() {
  const token = localStorage.getItem("token");
  return fetchProfile(token).json;
}

//fetch data to display on web
console.log(getProfileData());
const todayPatients = [
  {
    id: 1,
    name: "Laika",
    kind: "Dog",
    owner: "Maru Suarez",
    active: true,
  },
  {
    id: 2,
    name: "Luna",
    kind: "Dog",
    owner: "Dámaso Simal",
    active: true,
  },
  {
    id: 3,
    name: "Ander",
    kind: "Cat",
    owner: "Andrés Pantoja",
    active: false,
  },
];

export default function VetDashboard() {
  return (
    <div className="dashboard">
      <SideNavbarWorker />
      <div className="dashboard-page">
        <div className="dashboard-header">
          {/* <h1>Welcome, {profileData.user.name} </h1> */}
          <h1>Welcome, Andrés Pantoja</h1>
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
          <div className="today-patients">
            <div className="today-patients-header">
              <h2> Today Patients </h2>
            </div>
            <div className="today-patients-body">
              <div class="card-info">
                <p className="patient-name">Pet name</p>
                <p className="patient-kind">Kind</p>
                <p className="patient-owner">Owner</p>
                <p className="patient-status">Status</p>
              </div>
              {todayPatients.map((patient, index) => (
                <PatientCard key={index} patient={patient} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
