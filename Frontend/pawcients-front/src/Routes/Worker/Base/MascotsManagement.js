import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/global/global.scss";
import "css/vet/dataManagement.scss";
import React, { useState, useEffect } from "react";
import MascotCreation from "Routes/Worker/Base/MascotCreation";
import FilterComponent from "Routes/Common/FilterComponent";
import { getMascots } from "fetches/Worker/Mascots/FetchGetMascots";
import { Link } from "react-router-dom";

export default function MascotsManagement() {
  const [creationMode, setCreationMode] = useState(false);
  const [mascots, setMascots] = useState([]);
  const [visibleMascots, setVisibleMascots] = useState([]);

  useEffect(() => {
    obtainMascots();
  }, []);

  const obtainMascots = async () => {
    const mascotsData = await getMascots();
    setMascots(mascotsData.mascotData);
    setVisibleMascots(mascotsData.mascotData);
  };

  // const openModal = () => {
  //     setCreationMode(true);
  // };

  const handleClose = () => {
    setCreationMode(false);
  };

  const handleAcceptCreation = () => {
    setCreationMode(false);
    obtainMascots();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const searchText = e.target.value;
    let filtered = [];
    filtered = [...mascots].filter((mascot) =>
      mascot.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setVisibleMascots(filtered);
  };

  return (
    <div className="dashboard">
      <SideNavbarWorker />
      <div className="dashboard-page">
        <FilterComponent title="Mascots" onFilter={handleFilter} />
        <div className="dashboard-content">
          <section className="row-dashboard">
            <div className="section">
              <div className="section-content">
                <div className="management">
                  <div className="management-header">
                    <h1>{mascots.length} Total Mascots</h1>
                  </div>
                  <table className="management-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Gender</th>
                        <th>Birth Date</th>
                        <th>Owner</th>
                        <th>More details</th>
                      </tr>
                    </thead>

                    {visibleMascots.map((pet) => (
                      <tbody key={pet.id}>
                        <tr>
                          <td>{pet.name}</td>
                          <td>{pet.species}</td>
                          <td>{pet.gender}</td>
                          <td>{pet.birthDate}</td>
                          <td>
                            {pet.ownerName} {pet.ownerSurname}
                          </td>
                          <td>
                            <Link
                              className="small-button"
                              to={"/vet/mascot/" + pet.id}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </section>
          {creationMode && (
            <MascotCreation
              onClose={handleClose}
              onAccept={handleAcceptCreation}
            />
          )}
        </div>
      </div>
    </div>
  );
}
