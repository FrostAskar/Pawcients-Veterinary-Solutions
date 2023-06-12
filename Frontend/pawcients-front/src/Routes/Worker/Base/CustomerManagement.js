import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/vet/dataManagement.scss"
import "css/global/global.scss";
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import MascotCreation from "Routes/Worker/Base/MascotCreation";
import ClientCreation from "./ClientCreation";
import { getClients } from "fetches/Worker/Clients/FetchGetClients";
import { ConfirmationPopup } from "Routes/Common/PopUp";
//import { getMascotsByClient } from "fetches/Worker/Mascots/FetchGetMascotsByClient";

export default function CustomerManagement() {
    const [clientCreationMode, setClientCreationMode] = useState(false);
    const [mascotCreationMode, setMascotCreationMode] = useState(false);
    const [clientID, setClientID] = useState("");
    const [customers, setCustomers] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        obtainClients();
    }, [])

    const obtainClients = async () => {
        const clientsData = await getClients();
        setCustomers(clientsData);
    };

    // Client register

    const openClientModal = () => {
        setClientCreationMode(true);
    }

    const cancelClientCreation = () => {
        setClientCreationMode(false);
    }

    const acceptClientCreation = () => {
        setClientCreationMode(false);
        obtainClients();
    }

    //Mascot register 

    const openMascotModal = async (e, id) => {
        e.preventDefault();
        setMascotCreationMode(true);
        setClientID(id);
    }

    const closeMascotCreation = () => {
        setMascotCreationMode(false);
    }

    //Delete Pop up 
    
    const handleDeleteClick = () => {
        setIsPopupOpen(true);
      };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    const handleConfirm = () => {
        setIsPopupOpen(false);
    };


    return (
        <div className="dashboard">
            <SideNavbarWorker />
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <h1>Patients</h1>
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
                    <section className="row-dashboard">
                        <div className="section">
                            <div className="section-content">
                                <div className="management">
                                    <div className="management-header">
                                        <h1>{customers.length} Total Clients</h1>
                                        <button className="clasic-button" onClick={openClientModal}>Add Client</button>
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
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>

                                        {customers.map((item, index) => (
                                            <tbody>
                                                <tr key={index}>
                                                    <td>{item.client.name}</td>
                                                    <td>{item.client.surname}</td>
                                                    <td>{item.client.phone}</td>
                                                    <td>{item.client.email}</td>
                                                    <td>
                                                        {item.appointment !== null ? (
                                                            <p>{item.appointment.date}</p>
                                                        ) : (
                                                            <Link to="/vetcalendar" state={{
                                                                userID: item.client.id
                                                            }}>
                                                                <button className="small-button">Schedule</button>
                                                            </Link>

                                                        )}
                                                    </td>
                                                    <td><button className="small-button">View pets</button></td>
                                                    <td><button className="small-button" onClick={(e) => openMascotModal(e, item.client.id)}>Add</button></td>
                                                    <td><button className="small-button"><i className="material-icons">edit</i></button></td>
                                                    <td><button className="small-button"  onClick={handleDeleteClick}><i className="material-icons">delete</i></button></td>
                                                    {isPopupOpen && (
                                                        <div>
                                                            <ConfirmationPopup
                                                                onCancel={handleCancel}
                                                                onConfirm={handleConfirm}
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
                        <ClientCreation onClose={cancelClientCreation} onAccept={acceptClientCreation}/>
                    )}

                    {mascotCreationMode && (
                        <MascotCreation onClose={closeMascotCreation} clientID={clientID} onAccept={closeMascotCreation} />
                    )}

                </div>
            </div >
        </div >
    )
}