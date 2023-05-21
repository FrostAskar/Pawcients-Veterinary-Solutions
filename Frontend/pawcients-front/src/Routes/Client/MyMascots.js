import React from "react";
import "css/clientdashboard.css";
import Logo from "media/paw.png";
import Profile from "media/vet.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const animalsData = [
  {
    id: 1,
    name: "Max",
    image:
      "https://fotografias.lasexta.com/clipping/cmsimages01/2022/08/09/3FFA8546-05CE-4608-9B69-6602D02A4C58/cachorro-pomsky_98.jpg",
  },
  {
    id: 2,
    name: "Bella",
    image:
      "https://s1.ppllstatics.com/lasprovincias/www/multimedia/202112/12/media/cortadas/gatos-kb2-U160232243326NVC-624x385@Las%20Provincias.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    image:
      "https://okdiario.com/img/2021/04/20/curiosidades-sobre-los-gatos-domesticos-635x358.jpg",
  },
];
const profileData = [
  {
    id: 1,
    name: "Andrés Pantoja",
    image: "/path/to/andres.png",
  },
];

const Goprofile = () => {
  const navigate = useNavigate();
  navigate("/profile");
};

const MyMascots = () => {
  // On click on user profile, redirect to profile page

  return (
    <div className="dashboard">
      <div className="side-navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="user-profile" onClick={Goprofile()}>
          <img src={Profile} alt="Profile" className="profile-picture" />
          <span>{profileData[0].name}</span>
        </div>
        <ul className="nav-links">
          <li>
            <i className="material-icons"> pets </i>
            <Link to="/mymascots" className="active">
              My Pets
            </Link>
          </li>
          <li>
            <i className="material-icons"> calendar_month </i>
            <Link to="/calendar" className="active">
              Calendar
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
      <div className="animal-list">
        {animalsData.map((animal) => (
          <div className="animal-card" key={animal.id}>
            <img
              src={animal.image}
              alt={animal.name}
              className="animal-picture"
            />
            <div className="animal-details">
              <span>{animal.name}</span>

              {/* Link to mymascots + animalid */}
              <Link to={`/mymascot/${animal.id}`} className="active">
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMascots;
