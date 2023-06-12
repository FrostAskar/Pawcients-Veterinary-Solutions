import React from "react";
import "css/client/clientdashboard.css";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import SideNavbarClient from "Routes/Client/SideNavbarClient";
import { fetchClientMascots } from "fetches/Worker/Clients/fetchClientMascots";
import { fetchMascotData } from "fetches/Global/FetchMascotData";

const animalsData = [
  {
    id: 1,
    name: "Luna",
    image:
      "https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/purina_7_formas_de_ayudar_a_tu_gato_a_vivir_mas_tiempo.jpg?itok=Z3Z3Z3Z3",
  },
];

const MyMascots = () => {
  const url = window.location.pathname;
  const clientId = url.split("/")[2];

  const [mascots, setMascots] = useState([]);

  useEffect(() => {
    fetchClientMascots(clientId).then((response) => {
      if (response != null) {
        setMascots(response);
      } else {
        console.log("Failed to fetch mascots");
      }
    });
  }, [clientId]);

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
