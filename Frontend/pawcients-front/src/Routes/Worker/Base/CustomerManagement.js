import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/vet/dataManagement.scss"
import { fetchClientRegister } from "fetches/FetchClientRegister";
import React, { useState } from "react";

const clients = [
    {
        id: 1,
        name: "Maru",
        lastName: "Suarez",
        phone: "674014708",
        email: "maru@gmail.com",
        nextAppoint: "05/06/2023"
    },
    {
        id: 2,
        name: "Dámaso",
        lastName: "Simal",
        phone: "678965122",
        email: "damaso@gmail.com",
        nextAppoint: null

    },
    {
        id: 3,
        name: "Andrés",
        lastName: "Pantoja",
        phone: "676905781",
        email: "andres@gmail.com",
        nextAppoint: "30/05/2023"
    },
];
export default function CustomerManagement() {
    const [errorMessage, setErrorMessage] = useState("");
    const [creationMode, setCreationMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const lastName = e.target.lastname.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        try {
            // Fetch para login de cliente
            const response = await fetchClientRegister(name, lastName, email, phone);
            if (response.success) {

            } else {
                // Mensaje de error para cliente
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Error en la conexión con el servidor");
        }
    };


    const openModal =  () => {
        setCreationMode(true);
    }

    const cancelCreation = () => {
        setCreationMode(false);
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
                                        <button className="clasic-button" onClick={openModal}>Add Client</button>
                                    </div>
                                    <table className="management-table">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>LastName</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Pets</th>
                                            <th>Next Appointment</th>
                                        </tr>
                                        {clients.map((client, index) => (
                                            <tr key={index}>
                                                <td>{client.id}</td>
                                                <td>{client.name}</td>
                                                <td>{client.lastName}</td>
                                                <td>{client.phone}</td>
                                                <td>{client.email}</td>
                                                <td><button className="small-button-color1">View pets</button></td>
                                                <td>
                                                    {client.nextAppoint !== null ? (
                                                        <p>{client.nextAppoint}</p>
                                                    ) : (
                                                        <button className="small-button-color2">Schedule</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    {creationMode && (
                        <section className="creation-section">
                            <div className="modal">
                                <div className="modal-content">
                                    <h1>Sign up client</h1>
                                    <form className="clasic-form" onSubmit={handleSubmit} method="post">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" required />
                                        <label htmlFor="lastname">Lastname</label>
                                        <input type="text" name="lastname" id="lastname" required />
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" required />
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="phone" id="phone" required />
                                        {/* Captcha: */}

                                        <button className="clasic-button" type="submit">Sign up client</button>
                                        <button className="clasic-button" type="button" onClick={cancelCreation}>Cancel</button>
                                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    </form>
                                </div>
                            </div>
                        </section>
                    )}

                </div>
            </div >
        </div >
    )
}