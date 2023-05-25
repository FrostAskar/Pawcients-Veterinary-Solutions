import "css/vet/patientCard.scss";

export default function TodayPatient(props) {
    function getAppointmentType () {
        if(props.patient.type === "Vaccine") {
            return "vaccines"
        } else if(props.patient.type === "Checkup") {
            return "medical_services"
        } else if(props.patient.type === "Surgery") {
            return "monitor_heart";
        } else if(props.patient.type === "Healing") {
            return "healing"
        }
    }
    return (
            <div className="patient-card-wrapper">
                <i id="type-icon" className="material-icons"> { getAppointmentType() }</i>
                <div className="appoint">
                    <p className="patient-hour">{props.patient.hour}</p>
                    <p className="patient-type">{props.patient.type}</p>
                </div>
                <div className="patient">
                    <p className="patient-name">{props.patient.name}</p>
                    <p className="patient-owner">{props.patient.owner}</p>
                </div>
                <button id="status" className={`patient-status ${props.patient.active ? 'active-status' : 'completed-status'}`}>{ props.patient.active ? 'On work' : 'Completed'}</button>
            </div>
        
    )
}

