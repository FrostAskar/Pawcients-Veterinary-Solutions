import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/vet/dataManagement.scss";
import "css/global/global.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MascotCreation from "Routes/Worker/Base/MascotCreation";
import ClientCreation from "./ClientCreation";
import FilterComponent from "Routes/Common/FilterComponent";
import { getClients } from "fetches/Worker/Clients/FetchGetClients";
import { ConfirmationPopup } from "Routes/Common/PopUp";
import { deleteUser } from "fetches/Worker/FetchDeleteUser";
//import { getMascotsByClient } from "fetches/Worker/Mascots/FetchGetMascotsByClient";

export default function CustomerManagement() {
  const [clientCreationMode, setClientCreationMode] = useState(false);
  const [mascotCreationMode, setMascotCreationMode] = useState(false);
  const [clientID, setClientID] = useState("");
  const [customers, setCustomers] = useState([]);
  const [visibleCustomers, setVisibleCustomers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState({});

  useEffect(() => {
    obtainClients();
  }, []);

  const obtainClients = async () => {
    const clientsData = await getClients();
    setCustomers(clientsData);
    setVisibleCustomers(clientsData);
  };

  // Client register

  const openClientModal = () => {
    setClientCreationMode(true);
  };

  const cancelClientCreation = () => {
    setClientCreationMode(false);
  };

  const acceptClientCreation = () => {
    setClientCreationMode(false);
    obtainClients();
  };

  //Mascot register

  const openMascotModal = async (e, id) => {
    e.preventDefault();
    setMascotCreationMode(true);
    setClientID(id);
  };

  const closeMascotCreation = () => {
    setMascotCreationMode(false);
  };

  //Delete Pop up

  const handleDeleteClick = (e, userId) => {
    e.preventDefault();
    setIsPopupOpen((prevState) => ({
      ...prevState,
      [userId]: true,
    }));
  };

  const handleCancel = (e, userId) => {
    e.preventDefault();
    setIsPopupOpen((prevState) => ({
      ...prevState,
      [userId]: false,
    }));
  };

  const handleConfirm = async (e, userId) => {
    e.preventDefault();
    try {
      // Fetch para login de cliente
      const response = await deleteUser(userId);
      if (response !== null) {
        setIsPopupOpen((prevState) => ({
          ...prevState,
          [userId]: false,
        }));
        obtainClients();
      } else {
      }
    } catch (error) {}
    setIsPopupOpen(false);
  };

  const setDate = (startDate) => {
    const date = new Date(startDate);
    return date.toDateString();
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const searchText = e.target.value;
    let filtered = [];
    filtered = [...customers].filter((customer) =>
      customer.client.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setVisibleCustomers(filtered);
  };
  const redirectbutton = (id) => (e) => {
    e.preventDefault();
    window.location.href = `/client/${id}/mascots`;
  };

  return (
    <div className="dashboard">
      <SideNavbarWorker />
      <div className="dashboard-page">
        <FilterComponent title="Clients" onFilter={handleFilter} />
        <div className="dashboard-content">
          <section className="row-dashboard">
            <div className="section">
              <div className="section-content">
                <div className="management">
                  <div className="management-header">
                    <h1>{customers.length} Total Clients</h1>
                    <button className="clasic-button" onClick={openClientModal}>
                      Add Client
                    </button>
                  </div>
                  <table className="management-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>LastName</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Next Appointment</th>
                        <th>Pets</th>
                        <th>Add Pet</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    {visibleCustomers.map((item) => (
                      <tbody key={item.client.id}>
                        <tr>
                          <td>{item.client.name}</td>
                          <td>{item.client.surname}</td>
                          <td>{item.client.phone}</td>
                          <td>{item.client.email}</td>
                          <td>
                            {item.appointment !== null ? (
                              <p>{setDate(item.appointment.startDate)}</p>
                            ) : (
                              <Link
                                to="/vetcalendar"
                                state={{
                                  userID: item.client.id,
                                }}
                              >
                                <button className="small-button">
                                  Schedule
                                </button>
                              </Link>
                            )}
                          </td>
                          <td>
                            {" "}
                            <button
                              className="small-button"
                              onClick={redirectbutton(item.client.id)}
                            >
                              View pets
                            </button>
                          </td>
                          <td>
                            <button
                              className="small-button"
                              onClick={(e) =>
                                openMascotModal(e, item.client.id)
                              }
                            >
                              Add
                            </button>
                          </td>
                          <td>
                            <button
                              className="small-button"
                              onClick={(e) =>
                                handleDeleteClick(e, item.client.id)
                              }
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </td>
                          {isPopupOpen[item.client.id] && (
                            <div>
                              <ConfirmationPopup
                                onCancel={(e) =>
                                  handleCancel(e, item.client.id)
                                }
                                onConfirm={(e) =>
                                  handleConfirm(e, item.client.id)
                                }
                              />
                            </div>
                          )}
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </section>
          {clientCreationMode && (
            <ClientCreation
              onClose={cancelClientCreation}
              onAccept={acceptClientCreation}
            />
          )}

          {mascotCreationMode && (
            <MascotCreation
              onClose={closeMascotCreation}
              clientID={clientID}
              onAccept={closeMascotCreation}
            />
          )}
        </div>
      </div>
    </div>
  );
}
