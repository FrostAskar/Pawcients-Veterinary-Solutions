import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/vet/dataManagement.scss"
import { fetchWorker } from "fetches/Worker/FetchWorkers";
import React, { useState, useEffect } from "react";

const staff = [
    {
        id: 1,
        name: "Maru",
        lastName: "Suarez",
        type: "Veterinary",
        email: "maru@gmail.com",
        phone: "674014708"
    },
    {
        id: 2,
        name: "Andres",
        lastName: "Pantoja",
        type: "Auxiliar",
        email: "andres@gmail.com",
        phone: "687961007"
    },
    {
        id: 3,
        name: "Dámaso",
        lastName: "Simal",
        type: "Auxiliar",
        email: "damaso@gmail.com",
        phone: "671059885"
    },
];
export default function StaffManagement() {
    //const [errorMessage, setErrorMessage] = useState("");
    const [workers, setWorkers] = useState([]);
    const [creationMode, setCreationMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const name = e.target.name.value;
        // const lastName = e.target.lastname.value;
        // const email = e.target.email.value;
        // const phone = e.target.phone.value;
        // const license = e.target.license.value;

    };

    useEffect(() => {
        const getWorkers = async () => {
            const workersData = await fetchWorker();
            setWorkers(workersData)
        };

        getWorkers();
    }, [])


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
                                        <h1>{staff.length} Total Staff Members</h1>
                                        <button className="clasic-button" onClick={openModal}>Add Staff</button>
                                    </div>
                                    <table className="management-table">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>LastName</th>
                                            <th>Job Title</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                        </tr>
                                        {workers.map((worker, index) => (
                                            <tr key={index}>
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
                                        {/* Captcha: */}

                                        <button className="clasic-button" type="submit">Sign up worker</button>
                                        <button className="clasic-button" type="button" onClick={cancelCreation}>Cancel</button>
                                        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
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