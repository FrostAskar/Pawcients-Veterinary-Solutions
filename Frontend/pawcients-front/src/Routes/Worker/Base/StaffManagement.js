import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/vet/dataManagement.scss"
import { getWorkers } from "fetches/Worker/Staff/FetchGetWorkers";
import { fetchWorkerRegister } from "fetches/Worker/Staff/FetchWorkerRegister";
import React, { useState, useEffect } from "react";

export default function StaffManagement() {
    const [errorMessage, setErrorMessage] = useState("");
    const [workers, setWorkers] = useState([]);
    const [creationMode, setCreationMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const surname = e.target.lastname.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const license = e.target.license.value;
        const type = e.target.type.value;

        try {
            const response = await fetchWorkerRegister(name, surname, email, phone, license, type);
            if (response !== null) {
                setCreationMode(false);
            } else {
                // Mensaje de error para cliente
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Error en la conexión con el servidor");
        }

    };

    useEffect(() => {
        const obtainWorkers = async () => {
            const workersData = await getWorkers();
            setWorkers(workersData);
        };

        obtainWorkers();
    }, [workers])


    const openModal = () => {
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
                    <h1>Staff</h1>
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
                                        <h1>{workers.length} Total Staff Members</h1>
                                        <button className="clasic-button" onClick={openModal}>Add Staff</button>
                                    </div>
                                    <table className="management-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>LastName</th>
                                                <th>Job Title</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Calendar</th>
                                            </tr>
                                        </thead>

                                        {workers.map((worker) => (
                                            <tbody>
                                                <tr key={worker.id}>
                                                    <td>{worker.id}</td>
                                                    <td>{worker.name}</td>
                                                    <td>{worker.surname}</td>
                                                    <td>
                                                        {worker.type === "vet"
                                                            ? "Veterinary"
                                                            : worker.type === "aux"
                                                                ? "Auxiliar"
                                                                : worker.type === "admin"
                                                                    ? "Administrator"
                                                                    : ""}
                                                    </td>
                                                    <td>{worker.phone}</td>
                                                    <td>{worker.email}</td>
                                                    <td><button className="small-button">View</button></td>
                                                </tr>
                                            </tbody>

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
                                    <h1>Sign up worker</h1>
                                    <form className="clasic-form" onSubmit={handleSubmit} method="post">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" required />
                                        <label htmlFor="lastname">Lastname</label>
                                        <input type="text" name="lastname" id="lastname" required />
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" required />
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="phone" id="phone" required />
                                        <label htmlFor="license">License number</label>
                                        <input type="text" name="license" id="license" required />
                                        <label htmlFor="type">Type</label>
                                        <select name="type">
                                            <option value="vet">Veterinary</option>
                                            <option value="aux">Auxiliar</option>
                                        </select>

                                        <button className="clasic-button" type="submit">Sign up worker</button>
                                        <button className="clasic-button" type="button" onClick={cancelCreation}>Cancel</button>
                                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    </form>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}