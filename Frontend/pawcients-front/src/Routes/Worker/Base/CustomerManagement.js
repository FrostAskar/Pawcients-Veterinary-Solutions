import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import "css/vet/managementPages.scss"

const clients = [
    {
        id: 1,
        name: "Maru",
        lastName: "Suarez",
        phone: "674014708",
        email: "maru@gmail.com"
    },
    {
        id: 2,
        name: "Dámaso",
        lastName: "Simal",
        phone: "678965122",
        email: "damaso@gmail.com"
    },
    {
        id: 3,
        name: "Andrés",
        lastName: "Pantoja",
        phone: "676905781",
        email: "andres@gmail.com"
    },
];
export default function CustomerManagement() {
    return (
        <div className="dashboard">
            <SideNavbarWorker />
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <h1>Patients</h1>
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
                        <div className="modal">
                            <div className="modal-content">
                                <div className="vet-clients">
                                    <div className="vet-clients-header">
                                        <h1>{clients.length} Total Patients</h1>
                                        <button className="clasic-button">Add Patient</button>
                                    </div>
                                    <table className="clients-table">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>LastName</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Pets</th>
                                        </tr>
                                        {clients.map((client, index) => (
                                            <tr key={index}>
                                                <td>{client.id}</td>
                                                <td>{client.name}</td>
                                                <td>{client.lastName}</td>
                                                <td>{client.phone}</td>
                                                <td>{client.email}</td>
                                                <td><button className="clasic-button">View pets</button></td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}