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
        phone: "67690578",
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
                    <section className="modal">
                        <div className="modal-content">
                            <div className="vet-clients">
                                <h1>{ clients.length } Total Patients</h1>
                                <table className="clients-table">
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>LastName</td>
                                        <td>Phone</td>
                                        <td>Email</td>
                                    </tr>
                                    {clients.map((client, index) => (
                                        <tr key={index}>
                                            <th>{client.id}</th>
                                            <th>{client.name}</th>
                                            <th>{client.lastName}</th>
                                            <th>{client.phone}</th>
                                            <th>{client.email}</th>
                                        </tr>
                                    ))}
                                        
                                    
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}