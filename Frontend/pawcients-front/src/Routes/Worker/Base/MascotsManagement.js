import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/global/global.scss"
import "css/vet/dataManagement.scss"
import React, { useState } from "react";
import MascotCreation from "Routes/Worker/Base/MascotCreation";

const mascots = [
    {
        id: 1,
        name: "Laika",
        species: "Dog",
        gender: "Female",
        age: "13",
        owner: "Maru Suarez"
    },
    {
        id: 2,
        name: "Luna",
        species: "Dog",
        gender: "Female",
        age: "14",
        owner: "Dámaso Simal"

    },
    {
        id: 3,
        name: "Ander",
        species: "Cat",
        gender: "Male",
        age: "5",
        owner: "Andrés Pantoja"
    },
];
export default function MascotsManagement() {
    const [creationMode, setCreationMode] = useState(false);

    const openModal =  () => {
        setCreationMode(true);
    }

    const handleCancel = () => {
        setCreationMode(false);
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
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Species</th>
                                            <th>Gender</th>
                                            <th>Age</th>
                                            <th>Owner</th>
                                            <th>More details</th>
                                        </tr>
                                        {mascots.map((pet, index) => (
                                            <tr key={index}>
                                                <td>{pet.id}</td>
                                                <td>{pet.name}</td>
                                                <td>{pet.species}</td>
                                                <td>{pet.gender}</td>
                                                <td>{pet.age}</td>
                                                <td>{pet.owner}</td>
                                                <td><button className="small-button">View</button></td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    {creationMode && (
                        <MascotCreation onCancel={handleCancel} />
                    )}
                </div>
            </div>
        </div>
    )
}