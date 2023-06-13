import "css/vet/dataManagement.scss"

export default function filterComponent({ title, onFilter }) {
    return (
        <div className="dashboard-header">
            <h1>{title}</h1>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    onChange={onFilter}
                ></input>
                <i className="material-icons">search</i>
            </div>
        </div>

    )
}