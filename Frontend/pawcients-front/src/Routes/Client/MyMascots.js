import React, { useEffect, useState } from "react";
import "css/client/clientdashboard.css";
import { Link } from "react-router-dom";
import SideNavbarClient from "Routes/Client/SideNavbarClient";
import { fetchClientMascots } from "fetches/Worker/Clients/fetchClientMascots";

const MyMascots = () => {
  const url = window.location.pathname;
  const clientId = url.split("/")[2];

  const [mascots, setMascots] = useState([]);

  useEffect(() => {
    fetchClientMascots(clientId).then((response) => {
      if (response != null) {
        setMascots(response.mascots);
      } else {
        console.log("Failed to fetch mascots");
      }
    });
  }, [clientId]);

  return (
    <div className="dashboard">
      <SideNavbarClient />
      <div className="animal-list">
        {mascots.map((mascot) => (
          <div className="animal-card" key={mascot.id}>
            <img
              src={mascot.photo}
              alt={mascot.name}
              className="animal-picture"
            />
            <div className="animal-details">
              <span>{mascot.name}</span>

              {/* Link to client + animalid */}
              <Link
                to={`/client/${clientId}/mascot/${mascot.id}`}
                className="active"
              >
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
