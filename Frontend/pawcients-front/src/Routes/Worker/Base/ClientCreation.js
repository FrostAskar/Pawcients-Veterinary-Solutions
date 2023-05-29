import React, { useState } from "react";
import { fetchClientRegister } from "fetches/FetchClientRegister";

export default function ClientCreation({ onCancel }) {
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
    )
}