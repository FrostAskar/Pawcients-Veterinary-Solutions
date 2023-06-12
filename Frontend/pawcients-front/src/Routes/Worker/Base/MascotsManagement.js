import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/global/global.scss"
import "css/vet/dataManagement.scss"
import React, { useState, useEffect } from "react";
import MascotCreation from "Routes/Worker/Base/MascotCreation";
import { getMascots } from "fetches/Worker/Mascots/FetchGetMascots";

export default function MascotsManagement() {
    const [creationMode, setCreationMode] = useState(false);
    const [mascots, setMascots] = useState([]);

    useEffect(() => {
        obtainMascots();
    }, [])

    const obtainMascots = async () => {
        const mascotsData = await getMascots();
        setMascots(mascotsData);
    };

    const openModal = () => {
        setCreationMode(true);
    }

    const handleClose = () => {
        setCreationMode(false);
    }

    const handleAcceptCreation= () => {
        setCreationMode(false);
        obtainMascots();
    }
    return (
        <div className="dashboard">
            <SideNavbarWorker />
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <h1>Mascots</h1>
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
                                        <h1>{mascots.length} Total Mascots</h1>
                                        <button className="clasic-button" onClick={openModal}>Add Mascot</button>
                                    </div>
                                    <table className="management-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Species</th>
                                                {/* <th>Gender</th> */}
                                                <th>Birth Date</th>
                                                <th>Owner</th>
                                                <th>More details</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>

                                        {mascots.map((pet) => (
                                            <tbody key={pet.id}>
                                                <tr>
                                                    <td>{pet.name}</td>
                                                    <td>{pet.species}</td>
                                                    {/* <td>{pet.gender}</td> */}
                                                    <td>{pet.birthDate}</td>
                                                    <td>{pet.ownerName} {pet.ownerSurname}</td>
                                                    <td><button className="small-button">View</button></td>
                                                    <td><button className="small-button"><i className="material-icons">edit</i></button></td>
                                                </tr>
                                            </tbody>

                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    {creationMode && (
                        <MascotCreation onClose={handleClose} onAccept={handleAcceptCreation} />
                    )}
                </div>
            </div>
        </div>
    )
}