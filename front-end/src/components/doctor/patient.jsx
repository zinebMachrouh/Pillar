const Patient = ({patient}) => {
    return (  
        <div className="patient">
            {patient.gender === 'male' ? (
                <div className="card-top">
                    <i className="fa-solid fa-mars" style={{ color: "#3498DB" }} ></i>
                    <h4>{patient.user.name}</h4>
                </div>
            ) : (
                <div className="card-top">
                    <i className="fa-solid fa-venus" style={{ color: "#ec4ba9" }} ></i>
                    <h4>{patient.user.name}</h4>
                </div>
            )}
            <div className="card-body">
                <span style={{
                    color: '#748da7',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100px',
                }}>{patient.user.email}</span>
                <h4>Contact Information</h4>
                <ul>
                    <li><strong>Number:</strong> {patient.user.phone_number}</li>
                </ul>
                <h4>Emergency Contact</h4>
                <ul>
                    <li><strong>Name:</strong> {patient.emergency_contact_name}</li>
                    <li><strong>Number:</strong> {patient.emergency_contact_number}</li>
                </ul>
                <button type="button">View Details</button>
            </div>
        </div>
    );
}
 
export default Patient;