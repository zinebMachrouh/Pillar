import { Link, useLocation } from "react-router-dom";

const Details = () => {
    const formatDate = () => {
        const date = new Date(appointment.date);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return `${dayOfWeek} ${month} ${dayOfMonth} - ${time}`;
    };
    const location = useLocation();
    const { appointment, patient, checkup } = location.state;
    return (
        <div className="details-body">
            <Link to={`/${sessionStorage.getItem('redirect') }`} className="back">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div className="details-container">
                <h1>Appointment Details</h1>
                <h2>Patient: {patient.user.name}</h2>
                <h4>Appointment Details:</h4>
                <ul>
                    <li><i class="fa-regular fa-clock"></i>{formatDate()}</li>
                    {
                        (appointment.notes) ? (
                            <li>{appointment.notes}</li>
                        ):('')
                    }
                    
                </ul>
                <h4>Checkup Details:</h4>
                <ul>
                    <li><strong>Symptoms:</strong> {checkup.symptoms}</li>
                    <li><strong>Diagnosis:</strong> {checkup.diagnosis}</li>
                    <li><strong>Treatment Plan:</strong> {checkup.treatment_plan}</li>
                    <li><strong>Notes:</strong> {checkup.notes}</li>
                </ul>
                <h4>Patient Details</h4>
                <ul>
                    <li><strong>Medical History:</strong> {patient.medical_history}</li>
                    <li><strong>Allergies:</strong> {patient.allergies}</li>
                </ul>
            </div>
        </div>
    );
}

export default Details;