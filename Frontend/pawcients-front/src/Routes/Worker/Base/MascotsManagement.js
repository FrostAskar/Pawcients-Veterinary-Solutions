import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";

export default function MascotsManagement() {
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
                        </div>
                    </section>
                </div>

            </div>
        </div>
    )
}