import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/global/global.scss"
import "css/vet/dataManagement.scss"
import { fetchClientRegister } from "fetches/FetchClientRegister";
import React, { useState } from "react";

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
    const [errorMessage, setErrorMessage] = useState("");
    const [creationMode, setCreationMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const species = e.target.species.value;
        const gender = e.target.gender.value;
        const birthDate = e.target.birthDate.value;
        const owner = e.target.owner.value;
        try {
            // Fetch para login de cliente
            const response = await fetchClientRegister(name, species, gender, birthDate, owner);
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
                                                <td><button className="small-button-color1">View</button></td>
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
                                    <h1>Sign up mascot</h1>
                                    <form className="clasic-form" onSubmit={handleSubmit} method="post">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" required />
                                        <label htmlFor="species">Species</label>
                                        <input type="text" name="species" id="species" required />
                                        <label htmlFor="gender">Gender</label>
                                        <select name="gender">
                                            <option value="F">Female</option>
                                            <option value="F">Male</option>
                                        </select>  
                                        <label htmlFor="birthDate">Birth Date</label>
                                        <input type="date" name="birthDate" id="birthDate" required />
                                        <label htmlFor="owner">Owner</label>
                                        <input type="text" name="owner" id="owner" required />
                                        {/* Captcha: */}

                                        <button className="clasic-button" type="submit">Sign up mascot</button>
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