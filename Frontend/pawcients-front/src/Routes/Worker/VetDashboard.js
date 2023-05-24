import "css/global/global.scss";
import "css/global/variables.css";
import "css/vet/dashboard.scss";
import Logo from "media/paw.png";
import Profile from "media/vet.png";
import PatientCard from "Routes/Worker/PatientCard";
import { Link } from "react-router-dom";
import { fetchProfile } from "fetches/getProfile";

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
      <div className="side-navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="user-profile">
          <img src={Profile} alt="Profile" className="profile-picture" />
          {/* <span>{profileData.user.name}</span> */}
          Andrés Pantoja
        </div>
        <ul className="nav-links">
          <li>
            <i className="material-icons"> home </i>
            <Link to="/vetdashboard" className="active">
              Home
            </Link>
          </li>
          <li>
            <i className="material-icons"> calendar_month </i>
            <Link to="/calendar" className="active">
              Calendar
            </Link>
          </li>
          <h3>BASE</h3>
          <li>
            <i className="material-icons"> local_hospital </i>
            <Link to="/veterinarians" className="active">
              Veterinarians
            </Link>
          </li>
          <li>
            <i className="material-icons"> group </i>
            <Link to="/clients" className="active">
              Clients
            </Link>
          </li>
          <li>
            <i className="material-icons"> pets </i>
            <Link to="/mascots" className="active">
              Mascots
            </Link>
          </li>
          <h3>ACCOUNT</h3>
          <li>
            <i className="material-icons"> settings </i>
            <Link to="/logout" className="active">
              Settings
            </Link>
          </li>
          <li className="logout">
            <i className="material-icons"> logout </i>
            <Link to="/logout" className="active">
              Logout
            </Link>
          </li>
        </ul>
      </div>
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
