import React, { useEffect, useState } from "react";
import "css/client/clientdashboard.css";
import { Link } from "react-router-dom";
import SideNavbarClient from "Routes/Client/SideNavbarClient";
import { fetchClientMascots } from "fetches/Worker/Clients/fetchClientMascots";
import { fetchProfile } from "fetches/Global/getProfile";
import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";

const MyMascots = () => {
  const pathname = window.location.pathname;
  const clientId = pathname.split("/")[2];

  const [mascots, setMascots] = useState([]);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const profileData = await fetchProfile();
      setProfileData(profileData);
    };

    getProfileData();
  }, []);

  useEffect(() => {
    fetchClientMascots(clientId).then((response) => {
      if (response != null) {
        setMascots(response.mascots || []); // Set mascots to response.mascots
      } else {
        console.log("Failed to fetch mascots");
      }
    });
  }, [clientId]);

  return (
    <div className="dashboard">
      {profileData?.type === "vet" ||
      profileData?.type === "aux" ||
      profileData?.type === "admin" ? (
        <SideNavbarWorker />
      ) : (
        <SideNavbarClient />
      )}

      <div className="animal-list">
        {mascots.map((mascot) => (
          <div className="animal-card" key={mascot.id}>
            <img
              src={
                mascot.photo === null
                  ? "https://img.freepik.com/vector-gratis/silueta-pastor-aleman-diseno-plano_23-2150283164.jpg"
                  : mascot.photo
              }
              alt={mascot.name}
              className="animal-picture"
            />
            <div className="animal-details">
              <span>{mascot.name}</span>

              {/* Link to client + animalid */}
              {!pathname.includes("client") ? (
                <Link to={`/client/${clientId}/mascot/${mascot.id}`}>
                  View Profile
                </Link>
              ) : (
                <Link to={`/vet/mascot/${mascot.id}`} className="active">
                  View Profile
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMascots;
