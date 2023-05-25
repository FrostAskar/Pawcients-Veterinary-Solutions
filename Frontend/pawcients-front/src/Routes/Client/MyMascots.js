import React from "react";
import "css/client/clientdashboard.css";

import { Link } from "react-router-dom";
import SideNavbarClient from "Routes/Client/SideNavbarClient";

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

const MyMascots = () => {
  // On click on user profile, redirect to profile page

  return (
    <div className="dashboard">
      <SideNavbarClient />
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
