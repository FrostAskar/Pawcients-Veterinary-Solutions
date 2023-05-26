import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";

const staff = [
    {
        id: 1,
        name: "Maru",
        lastName: "Suarez",
        type: "Veterinary",
        email: "maru@gmail.com",
        phone: "674014708"
    },
    {
        id: 2,
        name: "Andres",
        lastName: "Pantoja",
        type: "Auxiliar",
        email: "andres@gmail.com",
        phone: "687961007"
    },
    {
        id: 3,
        name: "Dámaso",
        lastName: "Simal",
        type: "Auxiliar",
        email: "damaso@gmail.com",
        phone: "671059885"
    },
];
export default function StaffManagement() {
    return (
        <div className="dashboard">
            <SideNavbarWorker />
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <h1>Staff</h1>
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
                                <div className="management">
                                    <div className="management-header">
                                        <h1>{staff.length} Total Staff Members</h1>
                                        <button className="clasic-button">Add Staff</button>
                                    </div>
                                    <table className="management-table">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>LastName</th>
                                            <th>Job Title</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                        </tr>
                                        {staff.map((worker, index) => (
                                            <tr key={index}>
                                                <td>{worker.id}</td>
                                                <td>{worker.name}</td>
                                                <td>{worker.lastName}</td>
                                                <td>{worker.type}</td>
                                                <td>{worker.phone}</td>
                                                <td>{worker.email}</td>
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