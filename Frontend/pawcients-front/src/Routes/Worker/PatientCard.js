import "css/vet/patientCard.scss";

export default function PatientCard(props) {
    return (
            <div class="patient-card-wrapper">
                <p className="patient-name">{props.patient.name}</p>
                <p className="patient-kind">{props.patient.kind}</p>
                <p className="patient-owner">{props.patient.owner}</p>
                <button className={`patient-status ${props.patient.active ? 'active-status' : 'completed-status'}`}>{ props.patient.active ? 'On work' : 'Completed'}</button>
            </div>
        
    )
}

