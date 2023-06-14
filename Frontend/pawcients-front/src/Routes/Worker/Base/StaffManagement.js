import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/vet/dataManagement.scss"
import "css/global/global.scss";
import { getWorkers } from "fetches/Worker/Staff/FetchGetWorkers";
import FilterComponent from "Routes/Common/FilterComponent"
import { fetchWorkerRegister } from "fetches/Worker/Staff/FetchWorkerRegister";
import React, { useState, useEffect } from "react";
import { deleteUser } from "fetches/Worker/FetchDeleteUser";
import { ConfirmationPopup } from "Routes/Common/PopUp";
import { Link } from 'react-router-dom'

export default function StaffManagement() {
    const [errorMessage, setErrorMessage] = useState("");
    const [workers, setWorkers] = useState([]);
    const [visibleWorkers, setVisibleWorkers] = useState([]);
    const [creationMode, setCreationMode] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState({});

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
                obtainWorkers();
            } else {
                // Mensaje de error para cliente
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Error en la conexión con el servidor");
        }

    };

    useEffect(() => {
        obtainWorkers();
    }, [])

    const obtainWorkers = async () => {
        const workersData = await getWorkers();
        setWorkers(workersData);
        setVisibleWorkers(workersData);
    };


    const openModal = () => {
        setCreationMode(true);
    }

    const cancelCreation = () => {
        setCreationMode(false);
    }

    const handleFilter = (e) => {
        e.preventDefault();
        const searchText = e.target.value;
        let filtered = [];
        filtered = [...workers].filter(worker => worker.name.toLowerCase().includes(searchText.toLowerCase()));
        setVisibleWorkers(filtered);
    }

    //Delete Pop up 

    const handleDeleteClick = (e, userId) => {
        e.preventDefault();
        setIsPopupOpen((prevState) => ({
            ...prevState,
            [userId]: true,
        }));
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
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
                obtainWorkers();
            } else {
            }
        } catch (error) {
        }
        setIsPopupOpen(false);
    };


    
    return (
        <div className="dashboard">
            <SideNavbarWorker />
            <div className="dashboard-page">
            <FilterComponent title="Staff" onFilter={handleFilter} />
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
                                                <th>Name</th>
                                                <th>LastName</th>
                                                <th>Job Title</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Calendar</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>

                                        {visibleWorkers.map((worker) => (
                                            <tbody key={worker.id}>
                                                <tr>
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
                                                    <td>
                                                        <Link to="/vetcalendar" state={{
                                                            workerID: worker.id,
                                                            workerName: worker.name
                                                        }}>
                                                            <button className="small-button">View</button>
                                                        </Link>

                                                    </td>
                                                    <td><button className="small-button" onClick={(e) => handleDeleteClick(e, worker.id)}><i className="material-icons">delete</i></button></td>
                                                    {isPopupOpen[worker.id] && (
                                                        <div>
                                                            <ConfirmationPopup
                                                                onCancel={handleCancel}
                                                                onConfirm={(e) => handleConfirm(e, worker.id)}
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