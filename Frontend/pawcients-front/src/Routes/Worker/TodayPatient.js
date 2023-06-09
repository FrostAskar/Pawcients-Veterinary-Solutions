import "css/vet/patientCard.scss";

export default function TodayPatient(props) {
    function getAppointmentType () {
        if(props.patient.appointment.type === "Vaccine") {
            return "vaccines"
        } else if(props.patient.appointment.type === "Checkup") {
            return "medical_services"
        } else if(props.patient.appointment.type === "Surgery") {
            return "monitor_heart";
        } else if(props.patient.appointment.type === "Healing") {
            return "healing"
        }
    }

    function getDate () {
        const date = new Date(props.patient.appointment.date)
        return date.getHours() + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes()) ;
    }

    getDate();
    return (
            <div className="patient-card-wrapper">
                <i id="type-icon" className="material-icons"> { getAppointmentType() }</i>
                <div className="appoint">
                    <p className="patient-hour">{ getDate() }</p>
                    <p className="patient-type">{props.patient.appointment.type}</p>
                </div>
                <div className="patient">
                    <p className="patient-name">{props.patient.mascot.name}</p>
                    <p className="patient-owner">{props.patient.user.name}</p>
                </div>
                {/* <button id="status" className={`patient-status ${props.patient.active ? 'active-status' : 'completed-status'}`}>{ props.patient.active ? 'On work' : 'Completed'}</button> */}
            </div>
        
    )
}

