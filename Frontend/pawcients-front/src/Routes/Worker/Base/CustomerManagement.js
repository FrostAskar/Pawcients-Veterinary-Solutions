import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/vet/dataManagement.scss"
import React, { useState } from "react";
import MascotCreation from "Routes/Worker/Base/MascotCreation";
import ClientCreation from "./ClientCreation";
//import { getClients } from "fetches/Worker/FetchGetClients";

const clients = [
    {
        id: 1,
        name: "Maru",
        surname: "Suarez",
        phone: "674014708",
        email: "maru@gmail.com",
        nextAppoint: "05/06/2023"
    },
    {
        id: 2,
        name: "Dámaso",
        surname: "Simal",
        phone: "678965122",
        email: "damaso@gmail.com",
        nextAppoint: null

    },
    {
        id: 3,
        name: "Andrés",
        surname: "Pantoja",
        phone: "676905781",
        email: "andres@gmail.com",
        nextAppoint: "30/05/2023"
    },
];

export default function CustomerManagement() {
    const [clientCreationMode, setClientCreationMode] = useState(false);
    const [mascotCreationMode, setMascotCreationMode] = useState(false);
    const [clientID, setClientID] = useState("");
    //const [clients, setClients] = useState();


    const openClientModal = () => {
        setClientCreationMode(true);
    }

    const cancelClientCreation = () => {
        setClientCreationMode(false);
    }

    const openMascotModal = async (e, id) => {
        e.preventDefault();
        setMascotCreationMode(true);
        setClientID(id);
    }

    const closeMascotCreation = () => {
        setMascotCreationMode(false);
    }


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
                                        <h1>{clients.length} Total Clients</h1>
                                        <button className="clasic-button" onClick={openClientModal}>Add Client</button>
                                    </div>
                                    <table className="management-table">
                                        <thead>

                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>LastName</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Next Appointment</th>
                                                <th>Pets</th>
                                                <th>Add Pet</th>
                                            </tr>
                                        </thead>

                                        {clients.map((client, index) => (
                                            <tbody>
                                                <tr key={index}>
                                                    <td>{client.id}</td>
                                                    <td>{client.name}</td>
                                                    <td>{client.surname}</td>
                                                    <td>{client.phone}</td>
                                                    <td>{client.email}</td>
                                                    <td>
                                                        {client.nextAppoint !== null ? (
                                                            <p>{client.nextAppoint}</p>
                                                        ) : (
                                                            <button className="small-button">Schedule</button>
                                                        )}
                                                    </td>
                                                    <td><button className="small-button">View pets</button></td>
                                                    <td><button className="small-button" onClick={(e) => openMascotModal(e, client.id)}>Add</button></td>
                                                </tr>
                                            </tbody>

                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    {clientCreationMode && (
                        <ClientCreation onClose={cancelClientCreation} />
                    )}

                    {mascotCreationMode && (
                        <MascotCreation onClose={closeMascotCreation} clientID={clientID} />
                    )}

                </div>
            </div >
        </div >
    )
}