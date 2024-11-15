import React, { useState } from "react";
import { fetchClientRegister } from "fetches/Worker/Clients/FetchClientRegister";

export default function ClientCreation({ onClose, onAccept }) {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const surname = e.target.surname.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        try {
            // Fetch para login de cliente
            const response = await fetchClientRegister(name, surname, email, phone);
            if (response.status === 200) {
                onClose();
                onAccept();
            } else if (response.status === 409) {
                // Mensaje de error para cliente
                const data = await response.json();
                setErrorMessage(data.error);
            } 
        } catch (error) {
            setErrorMessage(error);
        }
    };

    const cancelCreation = () => {
        onClose();
    }
    return (
        <section className="creation-section">
            <div className="modal">
                <div className="modal-content">
                    <h1>Sign up client</h1>
                    <form className="clasic-form" onSubmit={handleSubmit} method="post">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" required />
                        <label htmlFor="surname">Lastname</label>
                        <input type="text" name="surname" id="surname" required />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone" required />

                        <button className="clasic-button" type="submit">Sign up client</button>
                        <button className="clasic-button" type="button" onClick={cancelCreation}>Cancel</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}