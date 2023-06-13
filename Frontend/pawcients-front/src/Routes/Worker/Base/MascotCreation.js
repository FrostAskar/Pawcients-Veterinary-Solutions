import "css/global/global.scss"
import "css/vet/dataManagement.scss"
import { addMascot } from "fetches/Worker/Mascots/FetchAddMascot";
import React, { useState } from "react";

export default function MascotCreation({ onClose, clientID, onAccept }) {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const species = e.target.species.value;
        const gender = e.target.gender.value;
        const race = e.target.race.value;
        const birthDate = e.target.birthDate.value;
        try {
            const response = await addMascot(name, species, race, birthDate, gender, clientID );
            //const data = await response.json();
            if (response != null) {
                onAccept();
            } else {
                // Mensaje de error para cliente
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Error en la conexión con el servidor");
        }
    };

    const cancelCreation = () => {
        onClose();
    }

    return (
        <section className="creation-section">
            <div className="modal">
                <div className="modal-content">
                    <h1>Sign up mascot</h1>
                    <form className="clasic-form" onSubmit={handleSubmit} method="post">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" required />
                        <label htmlFor="species">Species</label>
                        <select name="species">
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Others">Others</option>
                        </select>
                        <label htmlFor="race">Breed</label>
                        <input type="text" name="race" id="race" required />
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender">
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                        <label htmlFor="birthDate">Birth Date</label>
                        <input type="date" name="birthDate" id="birthDate" required />

                        <button className="clasic-button" type="submit">Sign up mascot</button>
                        <button className="clasic-button" type="button" onClick={cancelCreation}>Cancel</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}