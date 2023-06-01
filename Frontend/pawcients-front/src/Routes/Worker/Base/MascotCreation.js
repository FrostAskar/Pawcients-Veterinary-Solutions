import "css/global/global.scss"
import "css/vet/dataManagement.scss"
import { fetchClientRegister } from "fetches/Worker/FetchClientRegister";
import React, { useState } from "react";

export default function MascotCreation({ onCancel }) {
    const [errorMessage, setErrorMessage] = useState("");

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

    const cancelCreation = () => {
        onCancel();
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
                        <label htmlFor="gender">Gender</label>
                        <select name="gender">
                            <option value="F">Female</option>
                            <option value="F">Male</option>
                        </select>
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