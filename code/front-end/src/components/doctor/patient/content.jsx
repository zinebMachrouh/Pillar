const Content = ({ patient, checksCount, apptsCount }) => {
    return (  
        <div className="content">
            <div className="rem-right">
                <h2>{patient.user.name}</h2>
                <h4 className="email">{patient.user.email}</h4>
                <div className="rem-stats">
                    <div className="rem-stat">
                        <h4>{apptsCount}</h4>
                        <span>Appointments</span>
                    </div>
                    <div className="rem-stat">
                        <h4>{checksCount}</h4>
                        <span>Checkups</span>
                    </div>
                </div>
                <button type="button">Schedule Appointment</button>
            </div>
            <div className="rem-left">
                <div className="rem-top">
                    <div className="rem-mini">
                        <p>Gender</p>
                        <span>{patient.gender}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Birthday</p>
                        <span>{patient.birthday}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Adress</p>
                        <span>{(patient.adress) ? (patient.adress) : ('-')}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Last Visit</p>
                        <span>{patient.last_visit}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Emergency Contact</p>
                        <span>{patient.emergency_contact_name}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Emergency Number</p>
                        <span>{patient.emergency_contact_number}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Insurance Provider</p>
                        <span>{patient.insurance_provider}</span>
                    </div>
                    <div className="rem-mini">
                        <p>Insurance Number</p>
                        <span>{patient.insurance_policy_number}</span>
                    </div>
                    
                </div>
                <div className="rem-btm">
                    <span><strong>Medical History:</strong> {patient.medical_history}</span>
                    <span><strong>Allergies:</strong> {patient.allergies
                    }</span>
                </div>
            </div>
        </div>
    );
}
 
export default Content;