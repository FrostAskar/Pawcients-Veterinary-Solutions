import "css/global/global.scss"
import "css/vet/dataManagement.scss"
import { addMascot } from "fetches/Worker/FetchAddMascot";
import React, { useState } from "react";

export default function MascotCreation({ onClose, clientID }) {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const species = e.target.species.value;
        //const gender = e.target.gender.value;
        const race = e.target.race.value;
        const birthDate = e.target.birthDate.value;
        debugger;
        try {
            // Fetch para login de cliente
            const response = await addMascot(name, species, race, birthDate, clientID);
            //const data = await response.json();
            if (response.success) {
                onClose();
            } else {
                // Mensaje de error para cliente
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.log(error);
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
                        <input type="text" name="species" id="species" required />
                        <label htmlFor="race">Race</label>
                        <input type="text" name="race" id="race" required />
                        {/* <label htmlFor="gender">Gender</label>
                        <select name="gender">
                            <option value="F">Female</option>
                            <option value="F">Male</option>
                        </select> */}
                        <label htmlFor="birthDate">Birth Date</label>
                        <input type="date" name="birthDate" id="birthDate" required />
                        {/* Captcha: */}

                        <button className="clasic-button" type="submit">Sign up mascot</button>
                        <button className="clasic-button" type="button" onClick={cancelCreation}>Cancel</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}